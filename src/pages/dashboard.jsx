import React, { Suspense, lazy } from "react";
import {
  MdAdminPanelSettings,
} from "react-icons/md";
import { FaNewspaper, FaMoneyBillWave, FaProjectDiagram } from "react-icons/fa";
import { summary } from "../assets/data";
import clsx from "clsx";

// Lazy load heavy components
const Chart = lazy(() => import("../components/Chart"));
const ProjectTable = lazy(() => import("../components/project/ProjectTable"));
const SalesChart = lazy(() => import("../components/charts/SalesChart"));
const TaskTable = lazy(() => import("../components/task/TaskTable"));
const UserTable = lazy(() => import("../components/user/UserTable"));

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

// Sample data for projects
const projects = [
  {
    id: 1,
    name: "Website Redesign",
    startDate: "2023-12-10",
    endDate: "2024-03-15",
    status: "in progress",
    completion: 65,
    budget: 12000,
    spent: 7500
  },
  {
    id: 2,
    name: "Mobile App Development",
    startDate: "2024-01-05",
    endDate: "2024-05-20",
    status: "in progress",
    completion: 40,
    budget: 25000,
    spent: 8200
  },
  {
    id: 3,
    name: "Brand Identity Design",
    startDate: "2023-11-15",
    endDate: "2024-02-10",
    status: "completed",
    completion: 100,
    budget: 5500,
    spent: 5200
  },
  {
    id: 4,
    name: "E-commerce Integration",
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    status: "todo",
    completion: 10,
    budget: 18000,
    spent: 1200
  }
];

// Calculate total sales, budget and spent
const totalSales = salesData.reduce((sum, item) => sum + item.amount, 0);
const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
const totalSpent = projects.reduce((sum, project) => sum + project.spent, 0);

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-32">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Dashboard = () => {
  const totals = summary.tasks;

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "PROJECTS",
      total: projects.length,
      icon: <FaProjectDiagram />,
      bg: "bg-[#be185d]",
    },
    {
      _id: "4",
      label: "TOTAL SALES",
      total: `$${(totalSales/1000).toFixed(1)}K`,
      icon: <FaMoneyBillWave />,
      bg: "bg-[#15803d]",
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-gray-400'>{"Last updated today"}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  // Budget summary cards
  const budgetStats = [
    {
      label: "TOTAL BUDGET",
      count: `$${(totalBudget/1000).toFixed(1)}K`,
      bg: "bg-indigo-600",
      icon: <FaMoneyBillWave />,
    },
    {
      label: "TOTAL SPENT",
      count: `$${(totalSpent/1000).toFixed(1)}K`,
      bg: "bg-violet-600",
      icon: <FaMoneyBillWave />,
    },
    {
      label: "REMAINING",
      count: `$${((totalBudget - totalSpent)/1000).toFixed(1)}K`,
      bg: "bg-emerald-600",
      icon: <FaMoneyBillWave />,
    },
    {
      label: "SPENT PERCENT",
      count: `${Math.round((totalSpent/totalBudget) * 100)}%`,
      bg: "bg-amber-600",
      icon: <FaMoneyBillWave />,
    },
  ];
  
  return (
    <div className='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      {/* Project Overview Section */}
      <Suspense fallback={<LoadingFallback />}>
        <ProjectTable />
      </Suspense>

      {/* Sales Analytics Section */}
      <Suspense fallback={<LoadingFallback />}>
        <SalesChart />
      </Suspense>

      {/* Budget Summary Section */}
      <div className='mt-8 mb-8'>
        <h4 className='text-xl text-gray-600 font-semibold mb-4'>Budget Monitoring</h4>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
          {budgetStats.map((stat, index) => (
            <Card 
              key={index} 
              icon={stat.icon} 
              bg={stat.bg} 
              label={stat.label} 
              count={stat.count} 
            />
          ))}
        </div>
      </div>

      <div className='w-full bg-white my-8 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold'>
          Task Priority Distribution
        </h4>
        <Suspense fallback={<LoadingFallback />}>
          <Chart />
        </Suspense>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        {/* /left */}
        <Suspense fallback={<LoadingFallback />}>
          <TaskTable tasks={summary.last10Task} />
        </Suspense>

        {/* /right */}
        <Suspense fallback={<LoadingFallback />}>
          <UserTable users={summary.users} />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
