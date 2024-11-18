'use server';

import Property, { IProperty } from '@/models/Property';
import connectDb from '@/config/database';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const updateProperty = async (
  propertyId: string,
  formData: FormData
) => {
  await connectDb();
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    throw new Error('Unauthorized');
  }
  const { userId } = sessionUser;
  const existingProperty = await Property.findById(propertyId);
  if (!existingProperty) {
    throw new Error('Property not found');
  }
  // verify ownership
  if (existingProperty.owner.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  // update property
  const amenities = formData.getAll('amenities');
  const propertyData = {
    owner: userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    // images: [] as string[],
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );
  revalidatePath('/', 'layout');
  redirect(`/properties/${updatedProperty?._id}`);
};
