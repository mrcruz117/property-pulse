'use server';

import connectDb from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import cloudinary from '@/config/cloudinary.js';

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
  const images = formData.getAll('images').filter((img: FormDataEntryValue) => {
    return img instanceof File && img.name !== '';
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
    images: [] as string[],
  };

  const imageUrls = [];

  for (const imageFile of images as File[]) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // convert image to base64
    const imageBase64 = imageData.toString('base64');

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: 'propertypulse',
      }
    );
    imageUrls.push(result.secure_url);
  }
  propertyData.images = imageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();
  // console.log('newProperty: ', newProperty);
  revalidatePath('/', 'layout');
  redirect(`/properties/${newProperty._id}`);
}
