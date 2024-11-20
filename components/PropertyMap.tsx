'use client';
import { setDefaults, fromAddress, type OutputFormat } from 'react-geocode';
import { useState, useEffect } from 'react';

import { IProperty } from '@/models/Property';
import { toast } from 'react-toastify';

const PropertyMap = ({ property }: { property: IProperty }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(false);
  const [geocodeError, setGeocodeError] = useState(false);

  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
    outputFormat: 'json' as OutputFormat,
  });

  const getCoordinates = async () => {
    try {
      setLoading(true);
      const res = await fromAddress(
        `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
      );
      if (res?.results?.length === 0) {
        setGeocodeError(true);
        return;
      }
      const { lat, lng } = res.results[0].geometry.location;
      setLat(lat);
      setLng(lng);
      setViewPort((state) => ({ ...state, latitude: lat, longitude: lng }));
    } catch (error) {
      console.log(error);
      setGeocodeError(true);
      toast.error('Failed to get coordinates');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCoordinates();
  }, []);
  if (geocodeError) {
    return <div>Error getting coordinates</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>PropertyMap</div>;
};

export default PropertyMap;
