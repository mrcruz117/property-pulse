'use server';

import connectDb from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export async function addMessage(formData: FormData) {
  await connectDb();
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    return { success: false, error: 'User not authenticated' };
  }

  const { user } = sessionUser;
  const userId = user?.id;

  const recipient = formData.get('recipient');

  if (userId === recipient) {
    return { success: false, error: 'You cannot send a message to yourself' };
  }
  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('body'),
  });

  await newMessage.save();

  return { success: true };
}
