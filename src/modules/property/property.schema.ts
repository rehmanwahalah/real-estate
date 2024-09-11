import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IPropertyDocument extends Document {
  title?: string;
  price?: string;
  id?: string;
  imgs?: Array<[]>;
  desc?: string;
  features?: object;
  thumbnail_summary?: string;
  listing_url?: string;
  views?: number; // Track the number of views
  total_time_spent?: number; // Track total time spent on the property in seconds
  createdAt?: Date;
  updatedAt?: Date;
}

const PropertySchema = new mongoose.Schema<IPropertyDocument>(
  {
    title: { type: String },
    price: { type: String },
    id: { type: String },
    desc: { type: String, unique: true },
    features: { type: Object },
    listing_url: { type: String },
    imgs: [],
    views: { type: Number, default: 0 }, // New field to store the number of views
    total_time_spent: { type: Number, default: 0 }, // New field to store total time spent in seconds
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { versionKey: false },
  },
);

export { PropertySchema };
