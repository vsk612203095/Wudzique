import dotenv from 'dotenv';
dotenv.config();
// import express package
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/orders';
import { authenticateJWT } from './middleware/authMiddleware';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('🚀 Wudzique Backend Server running on http://localhost:8080/');
    console.log('📦 E-commerce API for Wooden Art Products');
});

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://mysticrealm7103:IESOeJbCI8tuWRXu@cluster0.1kpovki.mongodb.net/wudzique?retryWrites=true&w=majority&appName=Cluster0';
mongoose.Promise = Promise;

mongoose.connect(MONGO_URL);

const db = mongoose.connection;

// Show success message
db.on('connected', () => {
  console.log('✅ Connected to MongoDB successfully!');
});

// Show error message
db.on('error', (error: Error) => {
  console.error('❌ MongoDB connection error:', error);
});

// Optional: when disconnected
db.on('disconnected', () => {
  console.log('🔌 MongoDB disconnected');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Wudzique Backend is running',
    timestamp: new Date().toISOString(),
    database: db.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// API Routes
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', authenticateJWT, cartRoutes);
app.use('/api/orders', authenticateJWT, orderRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Wudzique API',
    version: '1.0.0',
    description: 'E-commerce Backend for Wooden Art Products',
    endpoints: {
      auth: '/auth',
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders',
      health: '/health'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});
