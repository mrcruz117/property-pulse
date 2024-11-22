'use server';

import connectDb from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export async function checkBookmarkStatus(propertyId: string) {
  await connectDb();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User not authenticated');
  }
  const { userId } = sessionUser;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  let isBookmarked = user.bookmarks.includes(propertyId);
  return { isBookmarked };
}
