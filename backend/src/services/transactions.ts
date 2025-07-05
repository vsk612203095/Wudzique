import { Request, Response } from 'express';
import Transaction from '../Database/transactionModel';
// import { UserModel } from '../Database/userModel'; // Not used, so removed
import { Parser } from 'json2csv';

interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

// Dashboard summary: balance, revenue, expenses, savings
export const getTransactionSummary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const transactions = await Transaction.find({ userId });
    let balance = 0, revenue = 0, expenses = 0;
    transactions.forEach(tx => {
      const amt = tx.amount ?? 0;
      if (amt > 0) revenue += amt;
      else expenses += amt;
      balance += amt;
    });
    const savings = revenue + expenses; // expenses are negative
    res.json({ balance, revenue, expenses: Math.abs(expenses), savings });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
};

// List transactions with filters, pagination, search
export const getTransactions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const { page = 1, limit = 10, search = '', category, status, sort = '-date' } = req.query;
    const query: any = { userId };
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { status: { $regex: search, $options: 'i' } },
      ];
    }
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .sort(sort as string)
      .skip(skip)
      .limit(Number(limit));
    res.json({ total, page: Number(page), limit: Number(limit), transactions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// Add a new transaction
export const addTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const { name, amount, date, category, status } = req.body;
    const transaction = new Transaction({ userId, name, amount, date, category, status });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add transaction' });
  }
};

// Export transactions as CSV
export const exportTransactionsCSV = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const transactions = await Transaction.find({ userId });
    const fields = ['name', 'amount', 'date', 'category', 'status'];
    const parser = new Parser({ fields });
    const csv = parser.parse(transactions.map(tx => tx.toObject()));
    res.header('Content-Type', 'text/csv');
    res.attachment('transactions.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Failed to export CSV' });
  }
}; 