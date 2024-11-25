'use server';

import connectDb from '@/config/database';
import Message from '@/models/Message';
import { revalidatePath } from 'next/cache';
import { getSessionUser } from '@/utils/getSessionUser';

export const deleteMessage = async (messageId: string) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You must be logged in to delete a property');
  }
  const { userId } = sessionUser;

  await connectDb();

  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error('Message not found');
  }

  if (message.recipient.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  await message.deleteOne();
  revalidatePath('/messages', 'page');
};
