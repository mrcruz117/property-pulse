'use client';
import { ClipLoader } from 'react-spinners';
const overRide = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = () => {
  return (
    <ClipLoader
      color='#3B82f6'
      cssOverride={overRide}
      size={150}
      aria-label='Loading Spinner'
    />
  );
};

export default Spinner;
