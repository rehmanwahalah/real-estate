import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { USERS } from 'src/constants';

export interface IUserDocument extends Document {
  name?: string;
  username?: string;
  email?: string;
  avatar?: string;
  isActive?: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  roles?: Array<string>;
  password?: string;
  session_id?: number;
  login_location?: string;
  preferred_location?: string;
  preferred_listing_type?: string;
  property_id?: string;
  page_visit_duration?: number;
  carousel_button_click_result_page?: number;
  next_image_clicks_listing_page?: number;
  read_more_click_result_page?: number;
  read_more_click_listing_page?: number;
  clicked_more_pictures?: number;
  click_rate?: number;
  bounce?: number;
  title?: string;
  price?: string;
  bedrooms_?: string;
  bathrooms?: string;
  living_space_sqm?: string;
  pool_?: number;
}

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    name: { type: String },
    username: { type: String },
    email: { type: String, unique: true },
    avatar: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    roles: [{ type: String, required: true, default: 'user' }],
    password: { type: String, required: false },
    // New fields added from IUserDocument
    session_id: { type: Number },
    login_location: { type: String },
    preferred_location: { type: String },
    preferred_listing_type: { type: String },
    property_id: { type: String },
    page_visit_duration: { type: Number, default: 0 },
    carousel_button_click_result_page: { type: Number, default: 0 },
    next_image_clicks_listing_page: { type: Number, default: 0 },
    read_more_click_result_page: { type: Number, default: 0 },
    read_more_click_listing_page: { type: Number, default: 0 },
    clicked_more_pictures: { type: Number, default: 0 },
    click_rate: { type: Number, default: 0 },
    bounce: { type: Number, default: 0 },
    title: { type: String },
    price: { type: String },
    bedrooms_: { type: String },
    bathrooms: { type: String },
    living_space_sqm: { type: String },
    pool_: { type: Number },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date },
  },
  {
    toJSON: { versionKey: false },
  },
);

export { UserSchema };
