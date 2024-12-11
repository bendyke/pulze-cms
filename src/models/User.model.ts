import mongoose, { Document, Schema } from 'mongoose';

import { BaseDocument } from '../interfaces/common.interfaces';

export interface IUser extends BaseDocument {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IUserDocument>('User', UserSchema);
