import express from 'express';
import {
  getTransactionSummary,
  getTransactions,
  addTransaction,
  exportTransactionsCSV,
} from '../services/transactions';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/summary', authenticateJWT, getTransactionSummary); // For Dashboard Cards
router.get('/', authenticateJWT, getTransactions);              // For Table
router.post('/', authenticateJWT, addTransaction);              // Add new transaction
router.post('/export', authenticateJWT, exportTransactionsCSV); // Export CSV

export default router; 