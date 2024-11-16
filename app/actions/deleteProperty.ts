'use server';

import connectDb from '@/config/database';
import cloudinary from '@/config/cloudinary';
import Property from '@/models/Property';
import { revalidatePath } from 'next/cache';
import { getSessionUser } from '@/utils/getSessionUser';

export const deleteProperty = async (propertyId: string) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You must be logged in to delete a property');
  }
  const { userId } = sessionUser;

  await connectDb();

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error('Property not found');
  }

  if (property.owner.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  // Delete images from Cloudinary
  const publicIds = property.images.map((image: string) => {
    const parts = image.split('/');
    return parts[parts.length - 1].split('.')[0];
  });

  if (publicIds.length > 0) {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy(`propertypulse/${publicId}`);
    }
  }

  await property.deleteOne();
  revalidatePath('/profile');
};
