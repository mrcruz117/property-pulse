import MessageCard from '@/components/MessageCard';
import connectDb from '@/config/database';
import Message from '@/models/Message';
import { convertToObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';
import { redirect } from 'next/navigation';

import '@/models/Property';

const MessagesPage = async () => {
  await connectDb();
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    return redirect('/');
  }

  const { user } = sessionUser;
  const userId = user?.id;

  const viewedMessages = await Message.find({
    recipient: userId,
    viewed: true,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const unviewedMessages = await Message.find({
    recipient: userId,
    viewed: false,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const messages = [...unviewedMessages, ...viewedMessages].map((msgDoc) => {
    const msg = convertToObject(msgDoc);
    msg.sender = convertToObject(msg.sender);
    msg.property = convertToObject(msg.property);
    return msg;
  });

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Messages</h1>
          <div className='space-y-4'>
            {messages.length > 0 ? (
              messages.map((msg) => <MessageCard key={msg._id} msg={msg} />)
            ) : (
              <p>No messages found</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
