'use client';

import { Plus, Filter, Search, Calendar, MapPin, Zap, Users, Clock, MoreVertical, Edit, Eye, Download } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const projects = [
    {
      id: '1',
      name: 'Solar Farm Alpha',
      client: 'GreenTech Corporation',
      location: 'California, USA',
      capacity: '50MW',
      status: 'In Progress',
      progress: 75,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      teamSize: 12,
      type: 'Solar',
      budget: '$2.5M',
      lastUpdate: '2 days ago',
      priority: 'High'
    },
    {
      id: '2',
      name: 'Wind Installation Beta',
      client: 'EcoEnergy Ltd',
      location: 'Texas, USA',
      capacity: '100MW',
      status: 'Planning',
      progress: 25,
      startDate: '2024-03-01',
      endDate: '2024-09-15',
      teamSize: 8,
      type: 'Wind',
      budget: '$4.2M',
      lastUpdate: '1 day ago',
      priority: 'Medium'
    },
    {
      id: '3',
      name: 'Hybrid System Gamma',
      client: 'PowerFlow Inc',
      location: 'Arizona, USA',
      capacity: '75MW',
      status: 'Review',
      progress: 90,
      startDate: '2023-11-10',
      endDate: '2024-02-28',
      teamSize: 15,
      type: 'Hybrid',
      budget: '$3.8M',
      lastUpdate: '3 hours ago',
      priority: 'High'
    },
    {
      id: '4',
      name: 'Community Solar Delta',
      client: 'LocalGrid Co',
      location: 'Nevada, USA',
      capacity: '25MW',
      status: 'Completed',
      progress: 100,
      startDate: '2023-08-20',
      endDate: '2023-12-15',
      teamSize: 6,
      type: 'Solar',
      budget: '$1.2M',
      lastUpdate: '1 week ago',
      priority: 'Low'
    },
    {
      id: '5',
      name: 'Offshore Wind Epsilon',
      client: 'OceanPower Inc',
      location: 'North Carolina, USA',
      capacity: '200MW',
      status: 'Planning',
      progress: 15,
      startDate: '2024-05-01',
      endDate: '2025-12-31',
      teamSize: 25,
      type: 'Wind',
      budget: '$8.5M',
      lastUpdate: '5 days ago',
      priority: 'High'
    },
    {
      id: '6',
      name: 'Residential Solar Zeta',
      client: 'HomePower Solutions',
      location: 'Florida, USA',
      capacity: '10MW',
      status: 'In Progress',
      progress: 60,
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      teamSize: 4,
      type: 'Solar',
      budget: '$650K',
      lastUpdate: '1 day ago',
      priority: 'Medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Planning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Review': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'On Hold': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Solar': return '☀️';
      case 'Wind': return '💨';
      case 'Hybrid': return '⚡';
      default: return '🔋';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesType = typeFilter === 'all' || project.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'progress':
        return b.progress - a.progress;
      case 'startDate':
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      case 'capacity':
        return parseFloat(b.capacity) - parseFloat(a.capacity);
      default:
        return 0;
    }
  });

  const stats = {
    total: projects.length,
    completed: projects.filter(p => p.status === 'Completed').length,
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    planning: projects.filter(p => p.status === 'Planning').length,
    totalCapacity: projects.reduce((sum, p) => sum + parseFloat(p.capacity), 0),
    totalBudget: projects.reduce((sum, p) => sum + parseFloat(p.budget.replace(/[$MK,]/g, '')), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">Projects</h1>
          <p className="text-stone-600 mt-1">Manage and track all your renewable energy projects</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex cursor-pointer items-center text-dark space-x-2 px-4 py-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="bg-gradient-to-r cursor-pointer from-primary to-primary text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
          <div className="text-2xl font-bold text-primary">{stats.total}</div>
          <div className="text-sm text-dark">Total Projects</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
          <div className="text-2xl font-bold text-primary">{stats.completed}</div>
          <div className="text-sm text-dark">Completed</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
          <div className="text-2xl font-bold text-primary">{stats.inProgress}</div>
          <div className="text-sm text-dark">In Progress</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
          <div className="text-2xl font-bold text-primary">{stats.planning}</div>
          <div className="text-sm text-dark">Planning</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
          <div className="text-2xl font-bold text-primary">{stats.totalCapacity}MW</div>
          <div className="text-sm text-dark">Total Capacity</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
          <div className="text-2xl font-bold text-primary">${stats.totalBudget.toFixed(1)}M</div>
          <div className="text-sm text-dark">Total Budget</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-80 text-dark bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 text-dark border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 text-dark border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            >
              <option value="all">All Types</option>
              <option value="Solar">Solar</option>
              <option value="Wind">Wind</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-dark">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-dark border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-sm"
            >
              <option value="name">Name</option>
              <option value="status">Status</option>
              <option value="progress">Progress</option>
              <option value="startDate">Start Date</option>
              <option value="capacity">Capacity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedProjects.map((project) => (
          <div key={project.id} className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 group">
            {/* Header - Make clickable */}
            <Link href={`/projects/${project.id}`} className="block">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getTypeIcon(project.type)}</div>
                  <div>
                    <h3 className="font-bold text-stone-800 text-lg group-hover:text-amber-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-stone-600 text-sm">{project.client}</p>
                  </div>
                </div>
                <div className="relative">
                  <button 
                    className="p-1 rounded-lg hover:bg-stone-100 transition-colors"
                    onClick={(e) => e.preventDefault()} // Prevent navigation when clicking menu
                  >
                    <MoreVertical className="w-4 h-4 text-stone-400" />
                  </button>
                </div>
              </div>
            </Link>

            {/* Status and Priority */}
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(project.priority)}`}>
                {project.priority}
              </span>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center space-x-2 text-stone-600">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{project.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-stone-600">
                <Zap className="w-4 h-4" />
                <span>{project.capacity}</span>
              </div>
              <div className="flex items-center space-x-2 text-stone-600">
                <Users className="w-4 h-4" />
                <span>{project.teamSize} members</span>
              </div>
              <div className="flex items-center space-x-2 text-stone-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-stone-700">Progress</span>
                <span className="text-sm text-stone-600">{project.progress}%</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Budget and Timeline */}
            <div className="flex items-center justify-between mb-4 text-sm">
              <div>
                <span className="text-stone-500">Budget: </span>
                <span className="font-medium text-stone-800">{project.budget}</span>
              </div>
              <div>
                <span className="text-stone-500">Due: </span>
                <span className="font-medium text-stone-800">{new Date(project.endDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <div className="flex items-center space-x-4">
                <Link href={`/projects/${project.id}`} className="flex items-center space-x-1 text-amber-600 hover:text-amber-700 text-sm">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </Link>
                <button 
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                  onClick={(e) => e.preventDefault()} // Prevent navigation, handle edit action
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-stone-400" />
                <span className="text-xs text-stone-500">Updated {project.lastUpdate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedProjects.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-stone-200">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="text-lg font-medium text-stone-800 mb-2">No projects found</h3>
          <p className="text-stone-600 mb-6">Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setTypeFilter('all');
            }}
            className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}