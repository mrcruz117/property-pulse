import connectDb from '@/config/database';
import Property, { IProperty } from '@/models/Property';
import { convertToObject } from '@/utils/convertToObject';
import { FilterQuery } from 'mongoose';

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}: {
  searchParams: { location: string; propertyType: string };
}) => {
  await connectDb();
  const locationPattern = new RegExp(location, 'i');
  let query: FilterQuery<IProperty> = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zip': locationPattern },
    ],
  };
  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i');
    query.type = typePattern;
  }
  const propertiesQueryRes = await Property.find(query).lean();
  const properties = propertiesQueryRes.map((doc) => convertToObject(doc));

  console.log(properties);
  return <div>SearchResultsPage</div>;
};

export default SearchResultsPage;
