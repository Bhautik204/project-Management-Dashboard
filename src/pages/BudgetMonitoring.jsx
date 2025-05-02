import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { FaArrowUp, FaArrowDown, FaCalendarAlt, FaFilter } from 'react-icons/fa';
import Title from '../components/Title';

// Sample budget data (this would be from API/Redux in production)
const budgetData = [
  {
    id: 1,
    project: 'Website Redesign',
    category: 'Development',
    budgeted: 12000,
    spent: 7500,
    remaining: 4500,
    status: 'On Budget'
  },
  {
    id: 2,
    project: 'Mobile App Development',
    category: 'Development',
    budgeted: 25000,
    spent: 8200,
    remaining: 16800,
    status: 'On Budget'
  },
  {
    id: 3,
    project: 'Brand Identity Design',
    category: 'Design',
    budgeted: 5500,
    spent: 5200,
    remaining: 300,
    status: 'Critical'
  },
  {
    id: 4,
    project: 'E-commerce Integration',
    category: 'Development',
    budgeted: 18000,
    spent: 1200,
    remaining: 16800,
    status: 'On Budget'
  },
  {
    id: 5,
    project: 'Marketing Campaign',
    category: 'Marketing',
    budgeted: 8000,
    spent: 9200,
    remaining: -1200,
    status: 'Over Budget'
  },
  {
    id: 6,
    project: 'Content Creation',
    category: 'Marketing',
    budgeted: 3000,
    spent: 2400,
    remaining: 600,
    status: 'On Budget'
  }
];

// Monthly expense data
const monthlyExpenses = [
  { name: 'Jan', spent: 8500 },
  { name: 'Feb', spent: 12300 },
  { name: 'Mar', spent: 9800 },
  { name: 'Apr', spent: 15200 },
  { name: 'May', spent: 11500 },
  { name: 'Jun', spent: 14200 },
  { name: 'Jul', spent: 10700 },
  { name: 'Aug', spent: 9300 },
  { name: 'Sep', spent: 13600 },
  { name: 'Oct', spent: 17800 },
  { name: 'Nov', spent: 12900 },
  { name: 'Dec', spent: 6200 },
];

// Category spending data for pie chart
const categorySpending = [
  { name: 'Development', value: 16900 },
  { name: 'Design', value: 5200 },
  { name: 'Marketing', value: 11600 },
  { name: 'Operations', value: 8500 },
  { name: 'Administration', value: 4800 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const statusColors = {
  'On Budget': 'text-green-600 bg-green-100',
  'Critical': 'text-amber-600 bg-amber-100',
  'Over Budget': 'text-red-600 bg-red-100'
};

const BudgetMonitoring = () => {
  const [timeFilter, setTimeFilter] = useState('This Year');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  
  // Calculate totals
  const totalBudgeted = budgetData.reduce((sum, item) => sum + item.budgeted, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;
  const spendingPercentage = Math.round((totalSpent / totalBudgeted) * 100);
  
  return (
    <div className="w-full py-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <Title title="Budget Monitoring" />
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          <div className="relative">
            <div className="flex items-center px-3 py-2 bg-white border rounded-md shadow-sm">
              <FaCalendarAlt className="text-gray-400 mr-2" />
              <select 
                className="bg-transparent border-none focus:ring-0 text-sm"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option>This Month</option>
                <option>This Quarter</option>
                <option>This Year</option>
                <option>Last Year</option>
              </select>
            </div>
          </div>
          
          <div className="relative">
            <div className="flex items-center px-3 py-2 bg-white border rounded-md shadow-sm">
              <FaFilter className="text-gray-400 mr-2" />
              <select 
                className="bg-transparent border-none focus:ring-0 text-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option>All Categories</option>
                <option>Development</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Operations</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Budget</h3>
          <p className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 flex items-center">
              <FaArrowUp className="mr-1" />3.2%
            </span>
            <span className="text-gray-500 ml-2">vs last period</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Spent</h3>
          <p className="text-2xl font-bold">${totalSpent.toLocaleString()}</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-600 flex items-center">
              <FaArrowUp className="mr-1" />5.8%
            </span>
            <span className="text-gray-500 ml-2">vs last period</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Remaining Budget</h3>
          <p className="text-2xl font-bold">${totalRemaining.toLocaleString()}</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 flex items-center">
              <FaArrowDown className="mr-1" />2.3%
            </span>
            <span className="text-gray-500 ml-2">vs last period</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Budget Utilization</h3>
          <p className="text-2xl font-bold">{spendingPercentage}%</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${spendingPercentage > 90 ? 'bg-red-600' : spendingPercentage > 70 ? 'bg-amber-500' : 'bg-green-600'}`}
              style={{ width: `${spendingPercentage}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {totalBudgeted > 0 ? `${spendingPercentage}% of budget used` : 'No budget allocated'}
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Monthly Expenses Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Monthly Expenses</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyExpenses}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#718096" />
                <YAxis stroke="#718096" />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Spent']}
                  labelFormatter={(label) => `${label} ${new Date().getFullYear()}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="spent" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Category Spending Pie Chart */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Spending by Category</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Project Budget Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Project Budgets</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {budgetData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.budgeted.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.spent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.remaining.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Budget vs Actual Bar Chart */}
      <div className="mt-8 bg-white p-5 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Budget vs Actual Spending</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={budgetData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="project" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="budgeted" name="Budget" fill="#8884d8" />
              <Bar dataKey="spent" name="Actual" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BudgetMonitoring; 