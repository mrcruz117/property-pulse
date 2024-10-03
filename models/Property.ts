import { Schema, model, models } from 'mongoose';

const PropertySchema = new Schema(
  {
    // id: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },

    location: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    beds: { type: Number, required: true },
    baths: { type: Number, required: true },
    square_feet: { type: Number, required: true },
    amenities: [String],
    rate: { nightly: Number, weekly: Number, monthly: Number },
    seller_info: {
      name: String,
      email: String,
      phone: String,
    },
    images: [String],
    is_featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Property = models.Property || model('Property', PropertySchema);

export interface IProperty {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rate: {
    nightly: number;
    weekly: number;
    monthly: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
  rates: {
    nightly: number;
    weekly: number;
    monthly: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default Property;
