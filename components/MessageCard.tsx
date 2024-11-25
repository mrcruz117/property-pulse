'use client';

import { deleteMessage } from '@/app/actions/deleteMessage';
import { markMessageRead } from '@/app/actions/markMessageRead';
import { IMessage } from '@/models/Message';
import { useMsgStore } from '@/providers/msg-store-provider';
import { useState } from 'react';
import { toast } from 'react-toastify';

const MessageCard = ({ msg }: { msg: IMessage }) => {
  const [viewed, setViewed] = useState(msg.viewed);
  const [isDeleted, setIsDeleted] = useState(false);

  const { unreadCount, setUnreadCount } = useMsgStore((state) => state);

  const handleMarkAsRead = async () => {
    try {
      const newViewed = await markMessageRead(msg._id);
      setViewed(newViewed);
      toast.success(newViewed ? 'Marked as unread' : 'Marked as read');
      if (newViewed) {
        setUnreadCount(unreadCount - 1);
      } else {
        setUnreadCount(unreadCount + 1);
      }
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this message?'
    );
    if (!confirm) return;
    try {
      await deleteMessage(msg._id);
      toast.success('Message deleted');
      setIsDeleted(true);
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };
  if (isDeleted) return <p>Message deleted</p>;
  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      {!viewed && (
        <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
          New
        </div>
      )}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry</span> {msg.property.name}
      </h2>
      <p className='text-gray-700'>{msg.body}</p>

      <ul className='mt-4'>
        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${msg.email}`} className='text-blue-500'>
            {msg.email}
          </a>
        </li>
        {msg.phone && (
          <li>
            <strong>Received: </strong>
            {new Date(msg.createdAt).toLocaleString()}
          </li>
        )}
        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${msg.email}`} className='text-blue-500'>
            {msg.email}
          </a>
        </li>
      </ul>
      <button
        className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'
        onClick={handleMarkAsRead}
      >
        {viewed ? 'Mark as unread' : 'Mark as read'}
      </button>
      <button
        className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
