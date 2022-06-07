import * as mongoose from 'mongoose';

export const ReportSchema = new mongoose.Schema({
  id: Number,
  userId: Number,
  projectId: Number,
  dateTime: { type: Date, default: Date.now() },
});
