import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import connectDb from '@/config/database';
import Property, { type IProperty } from '@/models/Property';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
const PropertyPage = async ({ params }: { params: { id: string } }) => {
  await connectDb();
  const property: IProperty = (await Property.findById(
    params.id
  ).lean()) as IProperty;

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>
      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            {'property info'}
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
