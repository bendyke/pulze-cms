import mongoose, { Document, Schema } from 'mongoose';

import { BaseDocument } from '../interfaces/common.interfaces';
import { EGrantEventTypes } from '../utils/shared.types';
import { IUserDocument } from './User.model';

export interface ICreditBatch extends BaseDocument {
  userId: IUserDocument['_id']; // Reference to User
  totalCredits: number;
  remainingCredits: number;
  expirationDate: Date;
  grant_event_type: EGrantEventTypes;
}

export interface ICreditBatchDocument extends ICreditBatch, Document {}

const CreditBatchSchema = new Schema<ICreditBatchDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalCredits: { type: Number, required: true },
    remainingCredits: {
      type: Number,
      default: function () {
        return this.totalCredits;
      },
    },
    expirationDate: { type: Date, required: true },
    grant_event_type: {
      type: String,
      enum: Object.values(EGrantEventTypes),
      required: true,
    },
  },
  { timestamps: true, collection: 'credit_batches' }
);

export default mongoose.model<ICreditBatchDocument>(
  'CreditBatch',
  CreditBatchSchema
);
