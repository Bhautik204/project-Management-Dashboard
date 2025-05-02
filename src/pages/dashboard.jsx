import React from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers, FaMoneyBillWave, FaProjectDiagram } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary } from "../assets/data";
import clsx from "clsx";
import { Chart } from "../components/Chart";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import UserInfo from "../components/UserInfo";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black text-left'>
        <th className='py-2'>Project Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Team</th>
        <th className='py-2 hidden md:block'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />

          <p className='text-base text-black'>{task.title}</p>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className='capitalize'>{task.priority}</span>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );
  return (
    <>
      <div className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
        <table className='w-full'>
          <TableHeader />
          <tbody>
            {tasks?.map((task, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const ProjectTable = () => {
  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Project Name</th>
        <th className='py-2'>Timeline</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Progress</th>
        <th className='py-2 hidden lg:table-cell'>Budget</th>
      </tr>
    </thead>
  );

  const statusColors = {
    completed: "bg-green-100 text-green-800",
    "in progress": "bg-blue-100 text-blue-800",
    todo: "bg-yellow-100 text-yellow-800"
  };

  const TableRow = ({ project }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-3'>
        <p className='text-base font-medium text-black'>{project.name}</p>
      </td>
      <td className='py-3'>
        <div className='text-sm'>
          <p>{moment(project.startDate).format('MMM D, YYYY')}</p>
          <p>to {moment(project.endDate).format('MMM D, YYYY')}</p>
        </div>
      </td>
      <td className='py-3'>
        <span className={`px-2 py-1 rounded-full text-xs capitalize ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </td>
      <td className='py-3'>
        <div className='flex flex-col w-full max-w-[120px]'>
          <div className='flex justify-between mb-1'>
            <span className='text-xs'>{project.completion}%</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div 
              className='bg-blue-600 h-2 rounded-full' 
              style={{ width: `${project.completion}%` }}
            ></div>
          </div>
        </div>
      </td>
      <td className='py-3 hidden lg:table-cell'>
        <div className='text-sm'>
          <p>Budget: ${project.budget.toLocaleString()}</p>
          <p>Spent: ${project.spent.toLocaleString()}</p>
        </div>
      </td>
    </tr>
  );

  return (
    <div className='w-full bg-white px-2 md:px-6 py-4 mt-8 shadow-md rounded'>
      <h4 className='text-xl text-gray-600 font-semibold mb-4'>Projects Overview</h4>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <TableHeader />
          <tbody>
            {projects.map((project) => (
              <TableRow key={project.id} project={project} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SalesChart = () => {
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

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black  text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200  text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700'>
            <span className='text-center'>{getInitials(user?.name)}</span>
          </div>

          <div>
            <p> {user.name}</p>
            <span className='text-xs text-black'>{user?.role}</span>
          </div>
        </div>
      </td>

      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className='w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded'>
      <table className='w-full mb-5'>
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
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
      <ProjectTable />

      {/* Sales Analytics Section */}
      <SalesChart />

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
        <Chart />
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        {/* /left */}
        <TaskTable tasks={summary.last10Task} />

        {/* /right */}
        <UserTable users={summary.users} />
      </div>
    </div>
  );
};

export default Dashboard;
