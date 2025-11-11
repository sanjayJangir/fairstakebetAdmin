import React from 'react';

const Shadow: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shadow Examples</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-sm bg-white p-4 rounded">Shadow Small</div>
        <div className="shadow bg-white p-4 rounded">Shadow Regular</div>
        <div className="shadow-md bg-white p-4 rounded">Shadow Medium</div>
        <div className="shadow-lg bg-white p-4 rounded">Shadow Large</div>
      </div>
    </div>
  );
};

export default Shadow;