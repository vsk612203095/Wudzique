import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  id: Number, // Numeric ID from JSON
  date: Date,
  amount: Number,
  category: String,
  status: String,
  user_id: String, // User identifier from JSON
  user_profile: String, // Profile image URL
});

export default mongoose.model('Transaction', transactionSchema); 