import React from 'react';

const Table: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users Table</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">ID</th>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-4 border-b">1</td>
              <td className="px-6 py-4 border-b">John Doe</td>
              <td className="px-6 py-4 border-b">john@example.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;