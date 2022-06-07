import { Document } from 'mongoose';

export interface IPylintFinding extends Document {
  id: number;
  reportId: number;
  filename: string;
  line: number;
  rule: string;
  message: string;
  category: string;
}
