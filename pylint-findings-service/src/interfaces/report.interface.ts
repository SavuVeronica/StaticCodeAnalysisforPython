import { Document } from 'mongoose';

export interface IReport extends Document {
  id: number;
  userId: number;
  projectId: number;
  dateTime: Date;
}
