'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

export const getUnreadMessageCount = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return { count: 0 };
  }

  const userId = sessionUser.user.id;

  const count = await Message.countDocuments({
    recipient: userId,
    viewed: false,
  });

  return { count };
};
