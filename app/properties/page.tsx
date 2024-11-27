import PropertyCard from '@/components/PropertyCard';
import connectDb from '@/config/database';
import Property, { type IProperty } from '@/models/Property';

const PropertiesPage = async ({
  searchParams: { page = 1, pageSize = 3 },
}: {
  searchParams: { page: number; pageSize: number };
}) => {
  await connectDb();
  // lean method is used to convert the mongoose document to a plain JavaScript object
  // works well for read-only operations
  const skip = (page - 1) * pageSize;
  const totalPages = await Property.countDocuments({});

  const properties: IProperty[] = (await Property.find({})
    .skip(skip)
    .limit(pageSize)
    .lean()) as IProperty[];

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
