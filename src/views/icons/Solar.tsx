
import React from 'react';

const Solar: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Solar Icons</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          Icon 1
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          Icon 2
        </div>
      </div>
    </div>
  );
};

export default Solar;
