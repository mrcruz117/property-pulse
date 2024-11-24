'use client';

import { IProperty } from '@/models/Property';
import { useSession } from 'next-auth/react';
import { FaPaperPlane } from 'react-icons/fa';
import { useFormState, useFormStatus } from 'react-dom';
import { addMessage } from '@/app/actions/addMessage';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const PropertyContactForm = ({ property }: { property: IProperty }) => {
  const { data: session } = useSession();

  const [state, formAction] = useFormState(
    (state: { success: boolean }, formData: FormData) => addMessage(formData),
    { success: false }
  );

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) toast.success('Message sent successfully!');
  }, [state]);

  if (state.success) {
    return <p className='text-green-500 mb-4'>Message sent successfully!</p>;
  }

  if (!session) return null;
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
      <form action={formAction}>
        <input
          type='hidden'
          id='property'
          name='property'
          value={property._id}
        />
        <input
          type='hidden'
          id='recipient'
          name='recipient'
          value={property.owner}
        />
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Name:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            name='name'
            type='text'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='phone'
          >
            Phone:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='phone'
            name='phone'
            type='text'
            placeholder='Enter your phone number'
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='body'
          >
            Message:
          </label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
            id='body'
            name='body'
            placeholder='Enter your message'
          ></textarea>
        </div>
        <div>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
            type='submit'
          >
            <FaPaperPlane className='mr-2'></FaPaperPlane> Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyContactForm;
