import * as mongoose from 'mongoose';

export const PylintFindingSchema = new mongoose.Schema({
  id: Number,
  reportId: Number,
  filename: String,
  line: Number,
  rule: String,
  message: String,
  category: {
    type: String,
    enum: [
      'fatal',
      'error',
      'warning',
      'convention',
      'refactor',
      'information',
    ],
  },
});
