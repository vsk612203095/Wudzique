import express, { Request, Response } from 'express';
import { OrderModel } from '../Database/orderModel';
import { CartModel } from '../Database/cartModel';
import { ProductModel } from '../Database/productModel';
import { authenticateJWT } from '../middleware/authMiddleware';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Get user's orders
router.get('/', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { page = 1, limit = 10 } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const orders = await OrderModel.find({ user: user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('items.product', 'name images mainImage');

    const total = await OrderModel.countDocuments({ user: user.id });

    res.json({
      orders,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalOrders: total
      }
    });
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single order
router.get('/:id', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const order = await OrderModel.findOne({ _id: id, user: user.id })
      .populate('items.product', 'name description images mainImage material dimensions')
      .populate('user', 'firstName lastName email phone');

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.json({ order });
  } catch (err) {
    console.error('Get order error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create order from cart
router.post('/create', authenticateJWT, [
  body('paymentMethod').notEmpty().withMessage('Payment method is required'),
  body('shippingAddress').isObject().withMessage('Shipping address is required'),
  body('shippingAddress.firstName').notEmpty().withMessage('First name is required'),
  body('shippingAddress.lastName').notEmpty().withMessage('Last name is required'),
  body('shippingAddress.phone').notEmpty().withMessage('Phone is required'),
  body('shippingAddress.street').notEmpty().withMessage('Street address is required'),
  body('shippingAddress.city').notEmpty().withMessage('City is required'),
  body('shippingAddress.state').notEmpty().withMessage('State is required'),
  body('shippingAddress.zipCode').notEmpty().withMessage('Zip code is required')
], async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { paymentMethod, shippingAddress, notes } = req.body;

    // Get user's cart
    const cart = await CartModel.findOne({ user: user.id })
      .populate('items.product', 'name price stock isActive');

    if (!cart || cart.items.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
      return;
    }

    // Validate stock and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.product as any;
      
      if (!product || !product.isActive) {
        res.status(400).json({ message: `Product ${item.name} is no longer available` });
        return;
      }

      if (product.stock < item.quantity) {
        res.status(400).json({ message: `Insufficient stock for ${item.name}` });
        return;
      }

      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: item.image
      });
    }

    // Calculate tax and shipping (simplified)
    const tax = subtotal * 0.18; // 18% GST
    const shipping = subtotal > 1000 ? 0 : 100; // Free shipping above ₹1000
    const total = subtotal + tax + shipping;

    // Create order
    const order = new OrderModel({
      user: user.id,
      items: orderItems,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod,
      shippingAddress,
      notes
    });

    await order.save();

    // Update product stock
    for (const item of cart.items) {
      await ProductModel.findByIdAndUpdate(
        item.product._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear cart
    (cart as any).items = [];
    await cart.save();

    await order.populate('items.product', 'name images mainImage');

    res.status(201).json({ 
      order, 
      message: 'Order created successfully' 
    });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (admin only)
router.put('/:id/status', authenticateJWT, [
  body('status').isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid status'),
  body('trackingNumber').optional().isString().withMessage('Tracking number must be a string'),
  body('estimatedDelivery').optional().isISO8601().withMessage('Invalid date format')
], async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { status, trackingNumber, estimatedDelivery } = req.body;
    const errors = validationResult(req);
    
    if (user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied. Admin only.' });
      return;
    }
    
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const updateData: any = { status };
    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    if (estimatedDelivery) updateData.estimatedDelivery = estimatedDelivery;

    const order = await OrderModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('items.product', 'name images mainImage')
     .populate('user', 'firstName lastName email phone');

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.json({ order, message: 'Order status updated' });
  } catch (err) {
    console.error('Update order status error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders (admin only)
router.get('/admin/all', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { page = 1, limit = 20, status } = req.query;
    
    if (user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied. Admin only.' });
      return;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const filter: any = {};
    
    if (status) filter.status = status;
    
    const orders = await OrderModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('user', 'firstName lastName email')
      .populate('items.product', 'name mainImage');

    const total = await OrderModel.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalOrders: total
      }
    });
  } catch (err) {
    console.error('Get all orders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 