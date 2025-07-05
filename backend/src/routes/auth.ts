import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser } from '../services/users';
import { UserModel } from '../Database/userModel';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-very-strong-secret-key'; // Use env variable in production

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { 
      username, 
      email, 
      password, 
      firstName, 
      lastName, 
      phone, 
      address 
    } = req.body;
    
    if (!username || !email || !password || !firstName || !lastName) {
      res.status(400).json({ message: 'Username, email, password, firstName, and lastName are required' });
      return;
    }
    
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    await createUser({ 
      username, 
      email, 
      firstName, 
      lastName, 
      phone, 
      address,
      authentication: { password: hashedPassword, salt } 
    });
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }
    
    const user = await UserModel.findOne({ email }).select('+authentication.password +authentication.salt');
    if (!user || !user.authentication || !user.authentication.password) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    
    const isMatch = await bcrypt.compare(password, user.authentication.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    
    const userDoc = user.toObject();
    const token = jwt.sign({ 
      id: user._id, 
      email: user.email, 
      role: userDoc.role 
    }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      token,
      user: {
        id: user._id,
        username: userDoc.username,
        email: userDoc.email,
        firstName: userDoc.firstName,
        lastName: userDoc.lastName,
        role: userDoc.role,
        phone: userDoc.phone,
        address: userDoc.address
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout (client should just delete token, but endpoint for completeness)
router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logged out' });
});

// Protected profile route
router.get('/profile', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const userProfile = await UserModel.findById(user.id).select('-authentication');
    
    if (!userProfile) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.json({ user: userProfile });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile
router.put('/profile', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { firstName, lastName, phone, address } = req.body;
    
    const updatedUser = await UserModel.findByIdAndUpdate(
      user.id,
      { firstName, lastName, phone, address },
      { new: true }
    ).select('-authentication');
    
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.json({ user: updatedUser });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 