'use client';

import { IProperty } from '@/models/Property';
import { FaBookmark } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { bookmarkProperty } from '@/app/actions/bookmarkProperty';

const BookmarkButton = ({ property }: { property: IProperty }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const handleClick = async () => {
    if (!userId) {
      toast.error('You must be logged in to bookmark a property');
      return;
    }
    await bookmarkProperty(property._id)
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error('Error bookmarking property');
        console.log(err);
      });
  };
  return (
    <button
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
      onClick={handleClick}
    >
      <FaBookmark className='mr-2'></FaBookmark> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
