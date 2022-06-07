import * as mongoose from 'mongoose';

export const SonarFindingSchema = new mongoose.Schema({
  id: Number,
  reportId: Number,
  filename: String,
  line: Number,
  rule: String,
  message: String,
  category: {
    type: String,
    enum: ['BLOCKER', 'CRITICAL', 'MAJOR', 'MINOR', 'INFO'],
  },
  effortToSolve: String,
  Type: {
    type: String,
    enum: ['BUG', 'VULNERABILITY', 'CODE_SMELL'],
  },
});
