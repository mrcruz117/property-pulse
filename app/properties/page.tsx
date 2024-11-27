import Pagination from '@/components/Pagination';
import PropertyCard from '@/components/PropertyCard';
import connectDb from '@/config/database';
import Property, { type IProperty } from '@/models/Property';

const PropertiesPage = async ({
  searchParams: { page = '1', pageSize = '6' },
}: {
  searchParams: { page: string; pageSize: string };
}) => {
  await connectDb();
  // lean method is used to convert the mongoose document to a plain JavaScript object
  // works well for read-only operations
  const skip = (parseInt(page) - 1) * parseInt(pageSize);
  const totalItems = await Property.countDocuments({});

  const showPagination = totalItems > parseInt(pageSize);

  const properties: IProperty[] = (await Property.find({})
    .skip(skip)
    .limit(parseInt(pageSize))
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
        {showPagination && (
          <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={totalItems}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
