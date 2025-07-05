import express from 'express';
import transactionRoutes from './transactionRoutes';

const router = express.Router();

router.use('/transactions', transactionRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'Protected API route' });
});

export default router; 