'use client';
import { Property } from '@/types/property';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ProfileProperties = ({
  properties: initialProperties,
}: {
  properties: Property[];
}) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  return properties.map((property) => (
    <div className='mb-10' key={property._id}>
      <Link href={`/properties/${property._id}`}>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={property.images[0]}
          alt='Property 1'
          width={200}
          height={200}
        />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{property.name}</p>
        <p className='text-gray-600'>
          {property.location.street}, {property.location.city}{' '}
          {property.location.state} {property.location.zipcode}
        </p>
      </div>
      <div className='mt-2'>
        <Link
          href={`/properties/${property._id}/edit`}
          className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
        >
          Edit
        </Link>
        <button
          className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
          type='button'
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
