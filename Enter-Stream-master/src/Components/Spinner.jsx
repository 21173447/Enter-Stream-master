import React from 'react';
import { RingLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <RingLoader color="blue" size={90} loading={loading} />
    </div>
  );
};

export default Spinner;
