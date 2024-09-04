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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { versionKey: false },
  },
);

export { PropertySchema };
