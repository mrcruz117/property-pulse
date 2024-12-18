import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: { type: String, required: true },
    image: { type: String },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
  },
  { timestamps: true }
);

const User = models.User || model('User', UserSchema);

// user type
export interface IUser {
  email: string;
  username: string;
  image: string;
  bookmarks: string[];
}

export default User;

