import { ICreditBatchDocument } from '../models/CreditBatch.model';

export interface IUserCreditBatches {
  usableCredits: number;
  totalCredits: number;
  creditBatches: ICreditBatchDocument[];
}
