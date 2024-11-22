'use client';

import { IProperty } from '@/models/Property';
import { FaShare } from 'react-icons/fa';
import {
  FacebookShareButton,
  EmailShareButton,
  TwitterShareButton,

  // icons
  FacebookIcon,
  XIcon,
  EmailIcon,
} from 'react-share';

const ShareButtons = ({ property }: { property: IProperty }) => {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className='text-xl text-center pt-2'>Share this Property:</h3>
      <div className='flex gap-3 justify-center pb-5'>
        <FacebookShareButton
          url={url}
          hashtag={`#${property.type.trim()}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          title={property.name}
          hashtags={['#rent', '#realestate']}
        >
          <XIcon size={40} round={true} />
        </TwitterShareButton>
        <EmailShareButton
          url={url}
          subject={property.name}
          body={`Check out this property: ${property.name} - ${url}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
