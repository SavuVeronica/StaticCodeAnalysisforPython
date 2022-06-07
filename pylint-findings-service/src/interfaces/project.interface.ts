import { Document } from 'mongoose';

export interface IProject extends Document {
  id: number;
  userId: number;
  name: string;
  localpath: string;
}
