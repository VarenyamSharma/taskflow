import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['auth', 'refresh'],
    required: true
  },
  expires: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '7d' // Automatically delete tokens after 7 days
  }
});

// Index for faster queries and to ensure token uniqueness
tokenSchema.index({ token: 1 }, { unique: true });
tokenSchema.index({ userId: 1, type: 1 });

const Token = mongoose.model('Token', token);
export default Token;
