'use client';

import { BarChart3, Users, Zap, AlertCircle, TrendingUp, FileText } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Active Projects', value: '12', icon: BarChart3, change: '+2 this month', trend: 'up' },
    { title: 'Total Clients', value: '8', icon: Users, change: '+1 this week', trend: 'up' },
    { title: 'Energy Generated', value: '2.4MW', icon: Zap, change: '+15% this month', trend: 'up' },
    { title: 'Pending Reviews', value: '5', icon: AlertCircle, change: '2 urgent', trend: 'neutral' },
  ];

  const recentProjects = [
    { name: 'Solar Farm Alpha', client: 'GreenTech Corp', status: 'In Progress', progress: 75 },
    { name: 'Wind Installation Beta', client: 'EcoEnergy Ltd', status: 'Planning', progress: 25 },
    { name: 'Hybrid System Gamma', client: 'PowerFlow Inc', status: 'Review', progress: 90 },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary via-secondary to-third rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Phoenix EPC Dashboard</h1>
          <p className="text-xl opacity-90">Manage your energy projects with precision</p>
        </div>
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-primary to-third p-3 rounded-lg">
                <stat.icon className="w-6 h-6 text-gray-00" />
              </div>
              <span className={`text-sm px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-stone-800 mb-1">{stat.value}</h3>
            <p className="text-stone-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-stone-800">Recent Projects</h2>
            <button className="text-amber-600 hover:text-amber-700 font-medium text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="border border-stone-100 rounded-lg p-4 hover:bg-stone-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-stone-800">{project.name}</h3>
                    <p className="text-sm text-stone-600">{project.client}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    project.status === 'Planning' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-stone-500 mt-1">{project.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
          <h2 className="text-xl font-bold text-stone-800 mb-6">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Urgent Review Required</p>
                <p className="text-xs text-red-600">Solar Farm Alpha needs immediate attention</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Performance Update</p>
                <p className="text-xs text-blue-600">Q4 targets exceeded by 15%</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <FileText className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">Document Ready</p>
                <p className="text-xs text-green-600">Wind Installation Beta permits approved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}