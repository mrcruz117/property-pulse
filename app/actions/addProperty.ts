'use server';

import connectDb from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type Image = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
};

export async function addProperty(formData: FormData) {
  await connectDb();
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    throw new Error('User not authenticated');
  }

  const { user } = sessionUser;
  const userId = user.id;
  const amenities = formData.getAll('amenities');
  const images = formData
    .getAll('images')
    .filter((img: FormDataEntryValue) => {
      return img instanceof File && img.name !== '';
    })
    .map((img: FormDataEntryValue) => {
      if (img instanceof File) {
        return img.name;
      }
      return '';
    });
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
    images,
  };

  const newProperty = new Property(propertyData);
  await newProperty.save();
  console.log('newProperty: ', newProperty);
  console.log('rates: ', newProperty.rates);
  revalidatePath('/', 'layout');
  redirect(`/properties/${newProperty._id}`);
}
