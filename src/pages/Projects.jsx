import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import moment from "moment";
import Title from "../components/Title";
import Button from "../components/Button";

// Sample projects data (in a real app this would come from an API or Redux store)
const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern UI/UX",
    startDate: "2023-12-10",
    endDate: "2024-03-15",
    status: "in progress",
    completion: 65,
    budget: 12000,
    spent: 7500,
    manager: "Jane Smith",
    team: ["John Doe", "Alex Johnson", "Emily Wilson"]
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Develop native iOS and Android applications for customer engagement",
    startDate: "2024-01-05",
    endDate: "2024-05-20",
    status: "in progress",
    completion: 40,
    budget: 25000,
    spent: 8200,
    manager: "Alex Johnson",
    team: ["Sarah Parker", "Tom Harris", "Mike Chen"]
  },
  {
    id: 3,
    name: "Brand Identity Design",
    description: "Create new brand guidelines, logo and visual identity",
    startDate: "2023-11-15",
    endDate: "2024-02-10",
    status: "completed",
    completion: 100,
    budget: 5500,
    spent: 5200,
    manager: "Emily Wilson",
    team: ["Lisa Wong", "Daniel Black"]
  },
  {
    id: 4,
    name: "E-commerce Integration",
    description: "Integrate payment gateway and shopping cart functionality",
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    status: "todo",
    completion: 10,
    budget: 18000,
    spent: 1200,
    manager: "John Doe",
    team: ["Rachel Green", "Michael Scott", "Pam Beesly"]
  }
];

const statusColors = {
  completed: "bg-green-100 text-green-800",
  "in progress": "bg-blue-100 text-blue-800",
  todo: "bg-yellow-100 text-yellow-800"
};

const ProjectCard = ({ project, onView }) => {
  const daysLeft = moment(project.endDate).diff(moment(), 'days');
  const isOverdue = daysLeft < 0 && project.status !== "completed";
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs capitalize ${statusColors[project.status]}`}>
            {project.status}
          </span>
        </div>
        
        <p className="text-gray-600 mt-2 line-clamp-2">{project.description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between mb-1 text-sm">
            <span>Progress</span>
            <span>{project.completion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${project.completion === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${project.completion}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Budget:</span>
            <span className="font-medium">${project.budget.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Spent:</span>
            <span className="font-medium">${project.spent.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
              {isOverdue 
                ? `Overdue by ${Math.abs(daysLeft)} days` 
                : project.status === "completed" 
                  ? "Completed" 
                  : `${daysLeft} days left`}
            </span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => onView(project.id)}
              className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
            >
              <MdVisibility />
            </button>
            <button className="p-1.5 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100">
              <FaEdit />
            </button>
            <button className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectFilters = ({ activeFilter, setActiveFilter }) => {
  const filters = ["all", "in progress", "completed", "todo"];
  
  return (
    <div className="flex space-x-2 mb-6">
      {filters.map(filter => (
        <button
          key={filter}
          className={`px-4 py-2 rounded text-sm font-medium transition ${
            activeFilter === filter 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter === 'all' ? 'All Projects' : filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Project Details</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-700">{project.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="text-gray-700">{moment(project.startDate).format('MMM D, YYYY')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="text-gray-700">{moment(project.endDate).format('MMM D, YYYY')}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs capitalize mt-1 ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Project Manager</p>
                  <p className="text-gray-700">{project.manager}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Progress & Budget</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500">Completion</span>
                    <span className="text-sm font-medium">{project.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${project.completion === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${project.completion}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="text-xl font-semibold text-gray-700">${project.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Spent</p>
                      <p className="text-xl font-semibold text-gray-700">${project.spent.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Remaining</p>
                    <p className="text-xl font-semibold text-gray-700">${(project.budget - project.spent).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Team Members</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-2">
                {project.team.map((member, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {member.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="ml-3 text-gray-700">{member}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Update Project
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.status === activeFilter);
    
  const handleViewProject = (id) => {
    const project = projects.find(p => p.id === id);
    setSelectedProject(project);
  };
  
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-6">
        <Title title="Projects" />
        <Button
          label="New Project"
          icon={<FaPlus className="text-lg" />}
          className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 px-3 2xl:py-2.5"
        />
      </div>
      
      <ProjectFilters 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onView={handleViewProject}
          />
        ))}
      </div>
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default Projects; 