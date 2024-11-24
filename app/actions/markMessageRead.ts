'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

export async function markMessageRead(messageId: string) {
  await connectDB();
  const session = await getSessionUser();
  if (!session) {
    throw new Error('User not found');
  }

  const userId = session.user.id;

  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error('Message not found');
  }

  if (message.recipient.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  message.viewed = !message.viewed;
  await message.save();

  revalidatePath('/messages', 'page');

  return message.viewed;
}
