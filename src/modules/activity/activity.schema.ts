import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { IUserDocument } from '../user/user.schema';
import { IPropertyDocument } from '../property/property.schema';

export interface IUserActivityDocument extends Document {
  userId: IUserDocument;
  propertyId: IPropertyDocument;
  action: string; // E.g., 'click', 'view', 'time_spent'
  sessionId: string;
  id: string;
  timestamp: Date;
  duration?: number; // Store time spent in seconds for 'time_spent' action
  searchQuery?: string;
}

const UserActivitySchema = new mongoose.Schema<IUserActivityDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'propertie',
      // required: true,
    },
    action: { type: String, required: true }, // 'click', 'view', 'time_spent'
    sessionId: { type: String, required: true },
    id: { type: String },
    searchQuery: { type: String },
    timestamp: { type: Date, default: Date.now },
    duration: { type: Number }, // Only applicable for 'time_spent'
  },
  {
    toJSON: { versionKey: false },
  },
);

export { UserActivitySchema };
