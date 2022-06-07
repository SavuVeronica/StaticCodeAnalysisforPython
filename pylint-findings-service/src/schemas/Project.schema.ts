import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
  id: Number,
  userId: Number,
  name: String,
  localpath: String,
});
