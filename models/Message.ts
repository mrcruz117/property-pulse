import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    body: { type: String },
    viewed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message = models.Message || model('Message', MessageSchema);

export interface IMessage {
  sender: string;
  recipient: string;
  property: string;
  name: string;
  email: string;
  phone: string;
  body: string;
  viewed: boolean;
}

export default Message;
