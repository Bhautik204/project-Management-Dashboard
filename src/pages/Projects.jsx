import React, { useState, Suspense, lazy } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import moment from "moment";
import Title from "../components/Title";
import Button from "../components/Button";
import ProjectFilters from '../components/ProjectFilters';
import ProjectCard from '../components/ProjectCard';

// Lazy load ProjectModal component
const ProjectModal = lazy(() => import('../components/ProjectModal'));

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

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-32">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

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
        <Suspense fallback={<LoadingFallback />}>
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        </Suspense>
      )}
    </div>
  );
};

export default Projects; 