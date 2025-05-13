import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesChart = () => {
  // Sample data for sales analytics
  const salesData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 2780 },
    { name: 'May', amount: 1890 },
    { name: 'Jun', amount: 2390 },
    { name: 'Jul', amount: 3490 },
    { name: 'Aug', amount: 2000 },
    { name: 'Sep', amount: 2780 },
    { name: 'Oct', amount: 1890 },
    { name: 'Nov', amount: 3578 },
    { name: 'Dec', amount: 3900 },
  ];

  return (
    <div className='w-full bg-white px-4 py-4 mt-8 shadow-md rounded'>
      <h4 className='text-xl text-gray-600 font-semibold mb-2'>Sales Analytics</h4>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={salesData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart; 