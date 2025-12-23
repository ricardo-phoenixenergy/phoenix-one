'use client';

import { Project, OMScheduleItem, OMHistory } from '../types/project.types';
import { Calendar, Clock, CheckCircle, AlertCircle, User, FileText, ExternalLink, Monitor, Activity, Zap } from 'lucide-react';

interface OMAndMonitoringProps {
  project: Project;
}

export function OMScheduleCard({ project }: OMAndMonitoringProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'overdue': return 'bg-red-100 text-red-700 border-red-300';
      case 'cancelled': return 'bg-stone-100 text-stone-600 border-stone-300';
      default: return 'bg-stone-100 text-stone-600 border-stone-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const upcomingTasks = project.omSchedule.filter(task => task.status === 'scheduled');
  const nextTask = upcomingTasks.sort((a, b) => 
    new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
  )[0];

  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-stone-800 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span>O&M Schedule</span>
        </h3>
        <span className="text-sm text-stone-600">{upcomingTasks.length} upcoming</span>
      </div>

      {nextTask && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-xs text-blue-600 font-medium mb-1">NEXT SCHEDULED</div>
              <div className="font-semibold text-stone-800">{nextTask.title}</div>
            </div>
            <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(nextTask.status)}`}>
              {getStatusIcon(nextTask.status)}
              <span>{nextTask.status}</span>
            </span>
          </div>
          <p className="text-sm text-stone-600 mb-2">{nextTask.description}</p>
          <div className="flex items-center space-x-4 text-xs text-stone-600">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(nextTask.scheduledDate).toLocaleDateString()}</span>
            </div>
            {nextTask.technician && (
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3" />
                <span>{nextTask.technician}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="text-sm font-medium text-stone-700 mb-2">All Scheduled Tasks</div>
        {project.omSchedule.length === 0 ? (
          <p className="text-sm text-stone-500 text-center py-4">No O&M tasks scheduled yet</p>
        ) : (
          project.omSchedule.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
              <div className="flex items-center space-x-3 flex-1">
                {getStatusIcon(task.status)}
                <div className="flex-1">
                  <div className="font-medium text-sm text-stone-800">{task.title}</div>
                  <div className="text-xs text-stone-600">{new Date(task.scheduledDate).toLocaleDateString()}</div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
          ))
        )}
      </div>

      <button className="w-full mt-4 py-2 border-2 border-dashed border-stone-300 rounded-lg text-stone-600 hover:border-blue-500 hover:text-blue-600 transition-colors text-sm font-medium">
        + Schedule New Task
      </button>
    </div>
  );
}

export function OMHistoryCard({ project }: OMAndMonitoringProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'preventive': return 'bg-green-100 text-green-700';
      case 'corrective': return 'bg-orange-100 text-orange-700';
      case 'inspection': return 'bg-blue-100 text-blue-700';
      case 'emergency': return 'bg-red-100 text-red-700';
      default: return 'bg-stone-100 text-stone-700';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200">
      <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center space-x-2">
        <FileText className="w-5 h-5 text-green-600" />
        <span>O&M History</span>
      </h3>

      {project.omHistory.length === 0 ? (
        <p className="text-sm text-stone-500 text-center py-8">No maintenance history yet</p>
      ) : (
        <div className="space-y-4">
          {project.omHistory.map((record) => (
            <div key={record.id} className="border border-stone-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}>
                      {record.type}
                    </span>
                    <span className="text-xs text-stone-500">{new Date(record.date).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-semibold text-stone-800">{record.description}</h4>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <span className="text-stone-600">Technician:</span>
                  <span className="ml-2 font-medium text-stone-800">{record.technician}</span>
                </div>
                <div>
                  <span className="text-stone-600">Duration:</span>
                  <span className="ml-2 font-medium text-stone-800">{record.duration}</span>
                </div>
                {record.cost && (
                  <div>
                    <span className="text-stone-600">Cost:</span>
                    <span className="ml-2 font-medium text-stone-800">{record.cost}</span>
                  </div>
                )}
              </div>

              {record.findings && (
                <div className="mb-2">
                  <div className="text-xs font-medium text-stone-700 mb-1">Findings:</div>
                  <p className="text-sm text-stone-600 bg-stone-50 p-2 rounded">{record.findings}</p>
                </div>
              )}

              {record.nextAction && (
                <div>
                  <div className="text-xs font-medium text-stone-700 mb-1">Next Action:</div>
                  <p className="text-sm text-blue-600">{record.nextAction}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function MonitoringDashboardCard({ project }: OMAndMonitoringProps) {
  if (!project.monitoringDashboard) {
    return (
      <div className="bg-white rounded-xl p-6 border border-stone-200">
        <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center space-x-2">
          <Monitor className="w-5 h-5 text-purple-600" />
          <span>System Monitoring</span>
        </h3>
        <div className="text-center py-8">
          <Monitor className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500 mb-4">No monitoring dashboard configured</p>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium">
            Configure Monitoring
          </button>
        </div>
      </div>
    );
  }

  const dashboard = project.monitoringDashboard;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-700 border-green-300';
      case 'offline': return 'bg-red-100 text-red-700 border-red-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-stone-100 text-stone-600 border-stone-300';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-stone-800 flex items-center space-x-2">
          <Monitor className="w-5 h-5 text-purple-600" />
          <span>System Monitoring</span>
        </h3>
        {dashboard.status && (
          <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(dashboard.status)}`}>
            <Activity className="w-3 h-3" />
            <span>{dashboard.status.toUpperCase()}</span>
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* Dashboard Info */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-medium text-stone-700 mb-1">SCADA Provider</div>
              <div className="text-lg font-bold text-stone-800">{dashboard.provider}</div>
            </div>
            <Zap className="w-8 h-8 text-purple-600" />
          </div>
          {dashboard.lastUpdate && (
            <div className="text-xs text-stone-600 flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Last updated: {dashboard.lastUpdate}</span>
            </div>
          )}
        </div>

        {/* Quick Stats - Placeholder for real data */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-xs text-stone-600 mb-1">Current Output</div>
            <div className="text-xl font-bold text-green-700">Live Data</div>
            <div className="text-xs text-stone-500">View in dashboard</div>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-xs text-stone-600 mb-1">Today's Production</div>
            <div className="text-xl font-bold text-blue-700">Live Data</div>
            <div className="text-xs text-stone-500">View in dashboard</div>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="text-xs text-stone-600 mb-1">System Efficiency</div>
            <div className="text-xl font-bold text-amber-700">Live Data</div>
            <div className="text-xs text-stone-500">View in dashboard</div>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="text-xs text-stone-600 mb-1">Weather Conditions</div>
            <div className="text-xl font-bold text-purple-700">Live Data</div>
            <div className="text-xs text-stone-500">View in dashboard</div>
          </div>
        </div>

        {/* Access Dashboard Button */}
        {dashboard.dashboardUrl && (
          <a
            href={dashboard.dashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all font-medium shadow-sm hover:shadow-md"
          >
            <Monitor className="w-4 h-4" />
            <span>Open Live Dashboard</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}

        <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
          <div className="text-xs text-stone-600 mb-2 flex items-center space-x-1">
            <Activity className="w-3 h-3" />
            <span>Available Data</span>
          </div>
          <ul className="space-y-1 text-xs text-stone-700">
            <li>• Real-time energy production & consumption</li>
            <li>• Individual inverter performance</li>
            <li>• Weather data integration</li>
            <li>• System alerts & notifications</li>
            <li>• Historical performance analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}