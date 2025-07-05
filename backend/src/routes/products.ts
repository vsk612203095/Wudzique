import express, { Request, Response } from 'express';
import { ProductModel } from '../Database/productModel';
import { authenticateJWT } from '../middleware/authMiddleware';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Validation middleware
const validateProduct = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Product description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').isIn(['wall-art', 'furniture', 'decorative', 'kitchen', 'garden', 'religious', 'other']).withMessage('Invalid category'),
  body('material').notEmpty().withMessage('Material is required'),
  body('stock').isNumeric().withMessage('Stock must be a number')
];

// Get all products (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { 
      category, 
      search, 
      minPrice, 
      maxPrice, 
      sort = 'createdAt', 
      order = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    const filter: any = { isActive: true };
    
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { material: { $regex: search, $options: 'i' } }
      ];
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const skip = (Number(page) - 1) * Number(limit);

    const products = await ProductModel.find(filter)
      .sort({ [sort as string]: sortOrder })
      .skip(skip)
      .limit(Number(limit))
      .populate('createdBy', 'username');

    const total = await ProductModel.countDocuments(filter);

    res.json({
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalProducts: total,
        hasNext: skip + products.length < total,
        hasPrev: Number(page) > 1
      }
    });
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured products
router.get('/featured', async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({ isActive: true, isFeatured: true })
      .limit(8)
      .populate('createdBy', 'username');
    
    res.json({ products });
  } catch (err) {
    console.error('Get featured products error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single product (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id)
      .populate('createdBy', 'username')
      .populate('ratings.user', 'username firstName lastName');

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ product });
  } catch (err) {
    console.error('Get product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product (admin only)
router.post('/', authenticateJWT, validateProduct, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    
    if (user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied. Admin only.' });
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const productData = {
      ...req.body,
      createdBy: user.id
    };

    const product = new ProductModel(productData);
    await product.save();

    res.status(201).json({ product });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product (admin only)
router.put('/:id', authenticateJWT, validateProduct, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    
    if (user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied. Admin only.' });
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ product });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product (admin only)
router.delete('/:id', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    
    if (user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied. Admin only.' });
      return;
    }

    const product = await ProductModel.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add product rating/review
router.post('/:id/ratings', authenticateJWT, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').optional().isString().withMessage('Review must be a string')
], async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Check if user already rated this product
    const existingRating = product.ratings.find(rating => 
      rating.user && rating.user.toString() === user.id
    );

    if (existingRating) {
      res.status(400).json({ message: 'You have already rated this product' });
      return;
    }

    product.ratings.push({
      user: user.id,
      rating: req.body.rating,
      review: req.body.review || ''
    });

    await product.save();
    res.json({ message: 'Rating added successfully' });
  } catch (err) {
    console.error('Add rating error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 