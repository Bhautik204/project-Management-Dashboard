import React from "react";
import moment from "moment";

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

export default ProjectTable; 