'use client';

import { useState, useEffect } from 'react';
import { IProperty } from '@/models/Property';
import { FaBookmark } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { bookmarkProperty } from '@/app/actions/bookmarkProperty';
import { checkBookmarkStatus } from '@/app/actions/checkBookmarkStatus';

const BookmarkButton = ({ property }: { property: IProperty }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    checkBookmarkStatus(property._id)
      .then((res) => {
        if (res.isBookmarked) {
          setIsBookmarked(res.isBookmarked);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error checking bookmark status');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error('You must be logged in to bookmark a property');
      return;
    }
    await bookmarkProperty(property._id)
      .then((res) => {
        toast.success(res.message);
        setIsBookmarked(res.isBookmarked);
      })
      .catch((err) => {
        toast.error('Error bookmarking property');

        console.log(err);
      });
  };

  if (loading)
    return (
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
        onClick={handleClick}
      >
        <FaBookmark className='mr-2'></FaBookmark> Loading...
      </button>
    );

  return isBookmarked ? (
    <button
      className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
      onClick={handleClick}
    >
      <FaBookmark className='mr-2'></FaBookmark> Remove Bookmark
    </button>
  ) : (
    <button
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
      onClick={handleClick}
    >
      <FaBookmark className='mr-2'></FaBookmark> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
