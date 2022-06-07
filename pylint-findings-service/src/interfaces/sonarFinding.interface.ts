import { Document } from 'mongoose';

export interface ISonarFinding extends Document {
  id: number;
  reportId: number;
  filename: string;
  line: number;
  rule: string;
  message: string;
  category: string;
  effortToSolve: string;
  Type: string;
}
