import express, { Request, Response } from 'express';
import { CartModel } from '../Database/cartModel';
import { ProductModel } from '../Database/productModel';
import { authenticateJWT } from '../middleware/authMiddleware';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Get user's cart
router.get('/', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    
    let cart = await CartModel.findOne({ user: user.id })
      .populate('items.product', 'name price images mainImage stock isActive');

    if (!cart) {
      cart = new CartModel({ user: user.id, items: [] });
      await cart.save();
    }

    // Filter out inactive products and update cart
    const validItems = cart.items.filter((item: any) => 
      item.product && item.product.isActive && item.product.stock > 0
    );

    if (validItems.length !== cart.items.length) {
      (cart as any).items = validItems;
      await cart.save();
    }

    res.json({ cart });
  } catch (err) {
    console.error('Get cart error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add item to cart
router.post('/add', authenticateJWT, [
  body('productId').isMongoId().withMessage('Valid product ID is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { productId, quantity } = req.body;

    // Check if product exists and is active
    const product = await ProductModel.findById(productId);
    if (!product || !product.isActive) {
      res.status(404).json({ message: 'Product not found or unavailable' });
      return;
    }

    // Check stock
    if (product.stock < quantity) {
      res.status(400).json({ message: 'Insufficient stock' });
      return;
    }

    let cart = await CartModel.findOne({ user: user.id });
    if (!cart) {
      cart = new CartModel({ user: user.id, items: [] });
    }

    // Check if product already in cart
    const existingItem = cart.items.find((item: any) => 
      item.product.toString() === productId
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        res.status(400).json({ message: 'Insufficient stock for requested quantity' });
        return;
      }
      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        name: product.name,
        image: product.mainImage
      });
    }

    await cart.save();
    await cart.populate('items.product', 'name price images mainImage stock isActive');

    res.json({ cart, message: 'Item added to cart' });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update cart item quantity
router.put('/update/:productId', authenticateJWT, [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { productId } = req.params;
    const { quantity } = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // Check product stock
    const product = await ProductModel.findById(productId);
    if (!product || !product.isActive) {
      res.status(404).json({ message: 'Product not found or unavailable' });
      return;
    }

    if (product.stock < quantity) {
      res.status(400).json({ message: 'Insufficient stock' });
      return;
    }

    const cart = await CartModel.findOne({ user: user.id });
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    const item = cart.items.find((item: any) => 
      item.product.toString() === productId
    );

    if (!item) {
      res.status(404).json({ message: 'Item not found in cart' });
      return;
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product', 'name price images mainImage stock isActive');

    res.json({ cart, message: 'Cart updated' });
  } catch (err) {
    console.error('Update cart error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from cart
router.delete('/remove/:productId', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { productId } = req.params;

    const cart = await CartModel.findOne({ user: user.id });
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    (cart as any).items = cart.items.filter((item: any) => 
      item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate('items.product', 'name price images mainImage stock isActive');

    res.json({ cart, message: 'Item removed from cart' });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear cart
router.delete('/clear', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const cart = await CartModel.findOne({ user: user.id });
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    (cart as any).items = [];
    await cart.save();

    res.json({ cart, message: 'Cart cleared' });
  } catch (err) {
    console.error('Clear cart error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 