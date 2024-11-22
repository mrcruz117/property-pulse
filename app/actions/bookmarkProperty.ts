'use server';

import connectDb from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

export async function bookmarkProperty(propertyId: string) {
  await connectDb();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User not authenticated');
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);
  let isBookmarked = user?.bookmarks.includes(propertyId);
  if (!user) {
    throw new Error('User not found');
  }

  let message;

  if (isBookmarked) {
    // remove if bookmarked
    user.bookmarks.pull(propertyId);
    message = 'Bookmark removed!';
    isBookmarked = false;
  } else {
    // if not then add
    user.bookmarks.push(propertyId);
    message = 'Property bookmarked!';
    isBookmarked = true;
  }

  await user.save();
  revalidatePath('/properties/saved', 'page');
  return { message, isBookmarked, };
}
