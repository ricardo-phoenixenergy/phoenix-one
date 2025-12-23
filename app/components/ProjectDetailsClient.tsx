'use client';

import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Calendar, MapPin, Zap, Users, DollarSign, Edit, Download, Share, 
  AlertCircle, CheckCircle, FileText, MessageSquare, Activity, Upload, Clock,
  ChevronDown, ChevronUp, X, Eye, AlertTriangle, TrendingUp, Battery,
  Briefcase, User, Monitor
} from 'lucide-react';
import { useState } from 'react';
import { Project, DocumentStatus, MilestoneStatus } from '../types/project.types';
import EditableProjectOverview from './EditableProjectOverview';
import { OMScheduleCard, OMHistoryCard, MonitoringDashboardCard } from './OMandMonitoring';

interface ProjectDetailsClientProps {
  initialProject: Project | undefined;
}

export default function ProjectDetailsClient({ initialProject }: ProjectDetailsClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  if (!initialProject) {
    return (
      <div className="flex items-center justify-center min-h-96 text-dark">
        <div className="text-center">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-stone-400" />
          </div>
          <h2 className="text-xl font-semibold text-stone-800 mb-2">Project Not Found</h2>
          <p className="text-stone-600 mb-4">The project you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.push('/projects')}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const project = initialProject;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Solar': return '☀️';
      case 'Wind': return '💨';
      case 'Hybrid': return '⚡';
      case 'Battery Storage': return '🔋';
      default: return '🔋';
    }
  };

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending-review': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'not-submitted': return 'bg-stone-100 text-stone-600 border-stone-200';
    }
  };

  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending-review': return <Clock className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      case 'not-submitted': return <Upload className="w-4 h-4" />;
    }
  };

  const getMilestoneStatusColor = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'blocked': return 'bg-red-100 text-red-700 border-red-300';
      case 'not-started': return 'bg-stone-100 text-stone-600 border-stone-300';
    }
  };

  const handleFileUpload = (docId: string) => {
    setUploadingDoc(docId);
    // Simulate upload
    setTimeout(() => {
      setUploadingDoc(null);
      alert('File upload functionality would be implemented here');
    }, 1000);
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'milestones', name: 'Milestones & Documents', icon: CheckCircle },
    { id: 'om-monitoring', name: 'O&M & Monitoring', icon: Monitor },
    { id: 'activity', name: 'Activity Feed', icon: MessageSquare },
    { id: 'team', name: 'Team', icon: Users }
  ];

  const completedMilestones = project.milestones.filter(m => m.status === 'completed').length;
  const totalMilestones = project.milestones.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.push('/projects')}
            className="p-2 cursor-pointer text-dark rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">{getTypeIcon(project.type)}</span>
              <h1 className="text-3xl font-bold text-stone-800">{project.name}</h1>
            </div>
            <p className="text-stone-600">{project.client} • {project.location}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex cursor-pointer text-dark items-center space-x-2 px-4 py-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
            <Share className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button className="flex cursor-pointer text-dark items-center space-x-2 px-4 py-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>Edit Project</span>
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-medium border bg-white/20 text-white border-white/30">
                {project.status}
              </span>
            </div>
            <div>
              <div className="text-sm opacity-90">Overall Progress</div>
              <div className="text-2xl font-bold">{project.progress}%</div>
            </div>
            <div>
              <div className="text-sm opacity-90">Current Phase</div>
              <div className="text-lg font-semibold">{project.phase}</div>
            </div>
            <div>
              <div className="text-sm opacity-90">Milestones</div>
              <div className="text-lg font-semibold">{completedMilestones}/{totalMilestones} Complete</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Budget Utilized</div>
            <div className="text-xl font-bold">{project.spent} / {project.budget}</div>
            <div className="text-xs opacity-75 mt-1">
              {Math.round((parseFloat(project.spent.replace(/[$M]/g, '')) / parseFloat(project.budget.replace(/[$M]/g, ''))) * 100)}% spent
            </div>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div 
            className="bg-white h-3 rounded-full transition-all duration-300 relative overflow-hidden"
            style={{ width: `${project.progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="w-5 h-5 text-amber-600" />
            <span className="text-sm text-stone-600">Capacity</span>
          </div>
          <div className="text-xl font-bold text-stone-800">{project.capacity}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-stone-600">Team Size</span>
          </div>
          <div className="text-xl font-bold text-stone-800">{project.teamSize}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-sm text-stone-600">Budget</span>
          </div>
          <div className="text-xl font-bold text-stone-800">{project.budget}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-stone-600">Start Date</span>
          </div>
          <div className="text-lg font-bold text-stone-800">{new Date(project.startDate).toLocaleDateString()}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="w-5 h-5 text-red-600" />
            <span className="text-sm text-stone-600">End Date</span>
          </div>
          <div className="text-lg font-bold text-stone-800">{new Date(project.endDate).toLocaleDateString()}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <MapPin className="w-5 h-5 text-stone-600" />
            <span className="text-sm text-stone-600">Location</span>
          </div>
          <div className="text-sm font-medium text-stone-800">{project.location}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-stone-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-stone-600 hover:text-stone-800 hover:border-stone-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === 'overview' && (
            <EditableProjectOverview project={project} />
          )}

          {activeTab === 'milestones' && (
            <div className="space-y-4">
              {project.milestones.map((milestone, index) => {
                const isExpanded = expandedMilestone === milestone.id;
                const approvedDocs = milestone.requiredDocuments.filter(d => d.currentVersion?.status === 'approved').length;
                const totalDocs = milestone.requiredDocuments.length;
                
                return (
                  <div key={milestone.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                    {/* Milestone Header */}
                    <div 
                      className="p-6 cursor-pointer hover:bg-stone-50 transition-colors"
                      onClick={() => setExpandedMilestone(isExpanded ? null : milestone.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-stone-800">{milestone.name}</h3>
                            <p className="text-sm text-stone-600 mt-1">{milestone.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getMilestoneStatusColor(milestone.status)}`}>
                            {milestone.status.replace('-', ' ').toUpperCase()}
                          </span>
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-stone-400" />
                          <span className="text-stone-600">{approvedDocs}/{totalDocs} documents approved</span>
                        </div>
                        {milestone.status !== 'not-started' && (
                          <>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-stone-400" />
                              <span className="text-stone-600">
                                {milestone.startDate && new Date(milestone.startDate).toLocaleDateString()}
                              </span>
                            </div>
                          </>
                        )}
                        <div className="ml-auto">
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-stone-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all ${
                                  milestone.progress === 100 ? 'bg-green-500' : 'bg-amber-500'
                                }`}
                                style={{ width: `${milestone.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-stone-700">{milestone.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content - Documents */}
                    {isExpanded && (
                      <div className="border-t border-stone-200 bg-stone-50 p-6">
                        <h4 className="font-semibold text-stone-800 mb-4">Required Documents</h4>
                        <div className="space-y-3">
                          {milestone.requiredDocuments.map((doc) => {
                            const currentVersion = doc.currentVersion;
                            const hasVersions = doc.versions.length > 0;
                            
                            return (
                              <div key={doc.id} className="bg-white rounded-lg border border-stone-200 p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h5 className="font-medium text-stone-800">{doc.name}</h5>
                                      {currentVersion && (
                                        <span className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(currentVersion.status)}`}>
                                          {getStatusIcon(currentVersion.status)}
                                          <span>{currentVersion.status.replace('-', ' ')}</span>
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-stone-600">{doc.description}</p>
                                    <p className="text-xs text-stone-500 mt-1">
                                      Accepted: {doc.fileTypes.join(', ')} • Max: {doc.maxSize}MB
                                    </p>
                                  </div>
                                  
                                  {!hasVersions ? (
                                    <button 
                                      onClick={() => handleFileUpload(doc.id)}
                                      disabled={uploadingDoc === doc.id}
                                      className="flex items-center space-x-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium disabled:opacity-50"
                                    >
                                      <Upload className="w-4 h-4" />
                                      <span>{uploadingDoc === doc.id ? 'Uploading...' : 'Upload'}</span>
                                    </button>
                                  ) : (
                                    <div className="flex items-center space-x-2">
                                      <button className="p-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
                                        <Eye className="w-4 h-4 text-stone-600" />
                                      </button>
                                      <button 
                                        onClick={() => handleFileUpload(doc.id)}
                                        className="flex items-center space-x-2 px-3 py-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors text-sm"
                                      >
                                        <Upload className="w-4 h-4" />
                                        <span>New Version</span>
                                      </button>
                                    </div>
                                  )}
                                </div>

                                {/* Current Version Details */}
                                {currentVersion && (
                                  <div className="mt-3 pt-3 border-t border-stone-100">
                                    <div className="flex items-center justify-between text-xs">
                                      <div className="flex items-center space-x-4 text-stone-600">
                                        <span>v{currentVersion.version}</span>
                                        <span>{currentVersion.fileName}</span>
                                        <span>{currentVersion.fileSize}</span>
                                        <span>Uploaded by {currentVersion.uploadedBy}</span>
                                        <span>{new Date(currentVersion.uploadedAt).toLocaleDateString()}</span>
                                      </div>
                                    </div>
                                    
                                    {currentVersion.status === 'approved' && currentVersion.reviewedBy && (
                                      <div className="mt-2 flex items-center space-x-2 text-xs text-green-700">
                                        <CheckCircle className="w-3 h-3" />
                                        <span>Approved by {currentVersion.reviewedBy} on {new Date(currentVersion.reviewedAt!).toLocaleDateString()}</span>
                                      </div>
                                    )}
                                    
                                    {currentVersion.status === 'rejected' && currentVersion.rejectionReason && (
                                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <div className="flex items-start space-x-2">
                                          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                                          <div className="flex-1">
                                            <div className="text-xs font-medium text-red-800 mb-1">Rejected by {currentVersion.reviewedBy}</div>
                                            <p className="text-xs text-red-700">{currentVersion.rejectionReason}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    
                                    {currentVersion.status === 'pending-review' && (
                                      <div className="mt-2 flex items-center space-x-2 text-xs text-yellow-700">
                                        <Clock className="w-3 h-3" />
                                        <span>Awaiting third-party review...</span>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Version History */}
                                {doc.versions.length > 1 && (
                                  <div className="mt-3 pt-3 border-t border-stone-100">
                                    <button className="text-xs text-amber-600 hover:text-amber-700 font-medium">
                                      View {doc.versions.length - 1} previous version{doc.versions.length > 2 ? 's' : ''}
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Optional Documents Section */}
                        {milestone.optionalDocuments.length > 0 && (
                          <div className="mt-6">
                            <h4 className="font-semibold text-stone-800 mb-3">Optional Documents ({milestone.optionalDocuments.length})</h4>
                            <div className="space-y-2">
                              {milestone.optionalDocuments.map((doc) => (
                                <div key={doc.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-stone-200">
                                  <div className="flex items-center space-x-3">
                                    <FileText className="w-4 h-4 text-stone-400" />
                                    <div>
                                      <div className="font-medium text-sm text-stone-800">{doc.name}</div>
                                      <div className="text-xs text-stone-600">{doc.fileSize} • {new Date(doc.uploadedAt).toLocaleDateString()}</div>
                                    </div>
                                  </div>
                                  <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                                    Download
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <button className="mt-4 w-full py-2 border-2 border-dashed border-stone-300 rounded-lg text-stone-600 hover:border-amber-500 hover:text-amber-600 transition-colors text-sm font-medium">
                          + Add Optional Document
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'om-monitoring' && (
            <div className="space-y-6">
              <MonitoringDashboardCard project={project} />
              <OMScheduleCard project={project} />
              <OMHistoryCard project={project} />
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <h2 className="text-xl font-bold text-stone-800 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {project.recentActivity.map((activity) => {
                  const getActivityIcon = () => {
                    switch (activity.type) {
                      case 'document-uploaded': return <Upload className="w-4 h-4 text-blue-600" />;
                      case 'document-approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
                      case 'document-rejected': return <X className="w-4 h-4 text-red-600" />;
                      case 'milestone-completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
                      case 'milestone-started': return <TrendingUp className="w-4 h-4 text-blue-600" />;
                      case 'team-member-added': return <Users className="w-4 h-4 text-purple-600" />;
                      default: return <MessageSquare className="w-4 h-4 text-amber-600" />;
                    }
                  };

                  const getActivityColor = () => {
                    switch (activity.type) {
                      case 'document-approved':
                      case 'milestone-completed':
                        return 'border-green-200 bg-green-50';
                      case 'document-rejected':
                        return 'border-red-200 bg-red-50';
                      case 'document-uploaded':
                      case 'milestone-started':
                        return 'border-blue-200 bg-blue-50';
                      default:
                        return 'border-amber-200 bg-amber-50';
                    }
                  };

                  return (
                    <div key={activity.id} className={`flex items-start space-x-3 p-4 border-l-4 rounded-r-lg ${getActivityColor()}`}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-stone-200">
                        {getActivityIcon()}
                      </div>
                      <div className="flex-1">
                        <p className="text-stone-800">{activity.message}</p>
                        <p className="text-sm text-stone-600 mt-1">{activity.user} • {activity.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <h2 className="text-xl font-bold text-stone-800 mb-4">Team Members</h2>
              <div className="space-y-3">
                {project.teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-stone-800">{member.name}</h3>
                        <p className="text-sm text-stone-600">{member.role}</p>
                        <p className="text-xs text-stone-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-stone-500">Joined</p>
                      <p className="text-sm text-stone-700">{new Date(member.joinedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Health */}
          <div className="bg-white rounded-xl p-4 border border-stone-200">
            <h3 className="font-semibold text-stone-800 mb-4 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-amber-600" />
              <span>Project Health</span>
            </h3>
            <div className="space-y-3">
              {Object.entries(project.projectHealth).map(([key, value]) => {
                const getHealthColor = (val: string) => {
                  if (val.includes('track') || val === 'excellent' || val === 'complete') return 'text-green-600';
                  if (val.includes('risk') || val === 'good' || val === 'in-progress') return 'text-yellow-600';
                  return 'text-red-600';
                };
                
                return (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-stone-600 capitalize">{key.replace('-', ' ')}</span>
                    <span className={`text-sm font-medium ${getHealthColor(value)}`}>
                      {value.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-4 border border-stone-200">
            <h3 className="font-semibold text-stone-800 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-600">Milestones Complete</span>
                <span className="text-sm font-medium text-stone-800">{completedMilestones}/{totalMilestones}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-600">Documents Pending</span>
                <span className="text-sm font-medium text-yellow-600">
                  {project.milestones.reduce((acc, m) => 
                    acc + m.requiredDocuments.filter(d => d.currentVersion?.status === 'pending-review').length, 0
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-600">Documents Approved</span>
                <span className="text-sm font-medium text-green-600">
                  {project.milestones.reduce((acc, m) => 
                    acc + m.requiredDocuments.filter(d => d.currentVersion?.status === 'approved').length, 0
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-600">Last Updated</span>
                <span className="text-sm font-medium text-stone-800">{project.lastUpdate}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-4 border border-stone-200">
            <h3 className="font-semibold text-stone-800 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-colors border border-transparent hover:border-amber-200">
                📊 Generate Progress Report
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-colors border border-transparent hover:border-amber-200">
                📅 Schedule Review Meeting
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-colors border border-transparent hover:border-amber-200">
                ✉️ Request Document Review
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-amber-50 hover:text-amber-700 transition-colors border border-transparent hover:border-amber-200">
                📎 Bulk Upload Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}