import connectDb from '@/config/database';
import Property from '@/models/Property';

const FeaturedProperties = async () => {
  await connectDb();
  const properties = (await Property.find({
    is_featured: true,
  }).lean()) as Array<{
    _id: string;
    name: string;
  }>;
  return properties.length > 0 ? (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-center mb-6 text-blue-500'>
          Featured Properties
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {properties.map((property) => (
            <h3 key={property._id}>{property.name}</h3>
          ))}
        </div>
      </div>
    </section>
  ) : null;
};
export default FeaturedProperties;
