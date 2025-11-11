import React from 'react';

const SamplePage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sample Page</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p>This is a sample page content.</p>
      </div>
    </div>
  );
};

export default SamplePage;
