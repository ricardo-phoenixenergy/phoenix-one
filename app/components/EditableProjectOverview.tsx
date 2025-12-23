'use client';

import { useState } from 'react';
import { Project } from '../types/project.types';
import { 
  Edit, Save, X, MapPin, DollarSign, FileText, Briefcase, User, 
  Building, Phone, Mail, Globe, TrendingUp, AlertCircle, Calendar,
  Zap, Battery, Wind, ExternalLink, Monitor, History
} from 'lucide-react';

interface EditableProjectOverviewProps {
  project: Project;
  onSave?: (updatedProject: Partial<Project>) => void;
}

export default function EditableProjectOverview({ project, onSave }: EditableProjectOverviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(project);

  const handleSave = () => {
    if (onSave) {
      onSave(editedData);
    }
    setIsEditing(false);
    alert('Project details updated successfully!');
  };

  const handleCancel = () => {
    setEditedData(project);
    setIsEditing(false);
  };

  const getDealTypeColor = (dealType: string) => {
    switch (dealType) {
      case 'PPA': return 'bg-blue-100 text-blue-700';
      case 'Lease': return 'bg-purple-100 text-purple-700';
      case 'Outright Purchase': return 'bg-green-100 text-green-700';
      case 'ESCO': return 'bg-orange-100 text-orange-700';
      default: return 'bg-stone-100 text-stone-700';
    }
  };

  const getSystemIcon = (type: string) => {
    switch (type) {
      case 'Solar': return <Zap className="w-5 h-5 text-amber-600" />;
      case 'Wind': return <Wind className="w-5 h-5 text-blue-600" />;
      case 'Battery Storage': return <Battery className="w-5 h-5 text-green-600" />;
      default: return <Zap className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-stone-800">Project Overview</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Details</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      {/* Project Description */}
      <div className="bg-white rounded-xl p-6 border border-stone-200">
        <h3 className="text-lg font-semibold text-stone-800 mb-3">Project Description</h3>
        {isEditing ? (
          <textarea
            value={editedData.description}
            onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
            className="w-full text-dark p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            rows={4}
          />
        ) : (
          <p className="text-stone-600 leading-relaxed">{project.description}</p>
        )}
      </div>

      {/* Deal Structure */}
      <div className="bg-white rounded-xl p-6 border border-stone-200">
        <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center space-x-2">
          <FileText className="w-5 h-5 text-amber-600" />
          <span>Deal Structure</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Deal Type</label>
            {isEditing ? (
              <select
                value={editedData.dealType}
                onChange={(e) => setEditedData({ ...editedData, dealType: e.target.value as any })}
                className="w-full text-dark p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="PPA">PPA</option>
                <option value="Lease">Lease</option>
                <option value="Outright Purchase">Outright Purchase</option>
                <option value="ESCO">ESCO</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            ) : (
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDealTypeColor(project.dealType)}`}>
                {project.dealType}
              </span>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Financing Type</label>
            {isEditing ? (
              <select
                value={editedData.financingType}
                onChange={(e) => setEditedData({ ...editedData, financingType: e.target.value as any })}
                className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="Cash">Cash</option>
                <option value="Debt">Debt</option>
                <option value="Equity">Equity</option>
                <option value="Tax Equity">Tax Equity</option>
                <option value="Grant">Grant</option>
                <option value="Mixed">Mixed</option>
              </select>
            ) : (
              <p className="text-stone-600">{project.financingType}</p>
            )}
          </div>
          {project.contractTerm && (
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 block">Contract Term</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.contractTerm || ''}
                  onChange={(e) => setEditedData({ ...editedData, contractTerm: e.target.value })}
                  className="w-full text-dark p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., 25 years"
                />
              ) : (
                <p className="text-stone-600">{project.contractTerm}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Client Information */}
      <div className="bg-white rounded-xl p-6 border border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-stone-800 flex items-center space-x-2">
            <Building className="w-5 h-5 text-blue-600" />
            <span>Client Information</span>
          </h3>
          {project.clientInfo.profileUrl && !isEditing && (
            <a
              href={project.clientInfo.profileUrl}
              className="text-sm text-amber-600 hover:text-amber-700 flex items-center space-x-1"
            >
              <span>View Full Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-stone-700 mb-1 block">Company Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.clientInfo.companyName}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    clientInfo: { ...editedData.clientInfo, companyName: e.target.value }
                  })}
                  className="w-full text-dark p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              ) : (
                <p className="text-stone-800 font-medium">{project.clientInfo.companyName}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700 mb-1 block">Contact Person</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.clientInfo.contactPerson || ''}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    clientInfo: { ...editedData.clientInfo, contactPerson: e.target.value }
                  })}
                  className="w-full text-dark p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              ) : (
                <p className="text-stone-600">{project.clientInfo.contactPerson}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700 mb-1 block flex items-center space-x-1">
                <Mail className="w-3 h-3" />
                <span>Email</span>
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedData.clientInfo.email}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    clientInfo: { ...editedData.clientInfo, email: e.target.value }
                  })}
                  className="w-full text-dark p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              ) : (
                <p className="text-stone-600">{project.clientInfo.email}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700 mb-1 block flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span>Phone</span>
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedData.clientInfo.phone}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    clientInfo: { ...editedData.clientInfo, phone: e.target.value }
                  })}
                  className="w-full text-dark p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              ) : (
                <p className="text-stone-600">{project.clientInfo.phone}</p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-stone-700 mb-1 block flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>Address</span>
              </label>
              {isEditing ? (
                <textarea
                  value={editedData.clientInfo.address}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    clientInfo: { ...editedData.clientInfo, address: e.target.value }
                  })}
                  className="w-full text-dark p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  rows={2}
                />
              ) : (
                <p className="text-stone-600">{project.clientInfo.address}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700 mb-1 block">Industry</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.clientInfo.industry || ''}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    clientInfo: { ...editedData.clientInfo, industry: e.target.value }
                  })}
                  className="w-full text-dark p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., Technology, Manufacturing"
                />
              ) : (
                <p className="text-stone-600">{project.clientInfo.industry || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700 mb-1 block">Business Type</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.clientInfo.businessType || ''}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    clientInfo: { ...editedData.clientInfo, businessType: e.target.value }
                  })}
                  className="w-full text-dark p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., Data Center, Warehouse"
                />
              ) : (
                <p className="text-stone-600">{project.clientInfo.businessType || 'Not specified'}</p>
              )}
            </div>
            {project.clientInfo.website && (
              <div>
                <label className="text-sm font-medium text-stone-700 mb-1 block flex items-center space-x-1">
                  <Globe className="w-3 h-3" />
                  <span>Website</span>
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editedData.clientInfo.website || ''}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      clientInfo: { ...editedData.clientInfo, website: e.target.value }
                    })}
                    className="w-full text-dark p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                ) : (
                  <a href={project.clientInfo.website} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 flex items-center space-x-1">
                    <span>{project.clientInfo.website}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Needs Analysis */}
      <div className="bg-white rounded-xl p-6 border border-stone-200">
        <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span>Client Needs & Motivations</span>
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Primary Goal</label>
            {isEditing ? (
              <textarea
                value={editedData.needsAnalysis.primaryGoal}
                onChange={(e) => setEditedData({
                  ...editedData,
                  needsAnalysis: { ...editedData.needsAnalysis, primaryGoal: e.target.value }
                })}
                className="w-full text-dark p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                rows={2}
              />
            ) : (
              <p className="text-stone-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                {project.needsAnalysis.primaryGoal}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Pain Points</label>
            {isEditing ? (
              <textarea
                value={editedData.needsAnalysis.painPoints.join('\n')}
                onChange={(e) => setEditedData({
                  ...editedData,
                  needsAnalysis: {
                    ...editedData.needsAnalysis,
                    painPoints: e.target.value.split('\n').filter(p => p.trim())
                  }
                })}
                className="w-full text-dark p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                rows={4}
                placeholder="One pain point per line"
              />
            ) : (
              <ul className="space-y-2">
                {project.needsAnalysis.painPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-stone-600">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 block">Energy Usage Pattern</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.needsAnalysis.energyUsagePattern}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    needsAnalysis: { ...editedData.needsAnalysis, energyUsagePattern: e.target.value }
                  })}
                  className="w-full text-dark p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              ) : (
                <p className="text-stone-600">{project.needsAnalysis.energyUsagePattern}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 block">Current Electricity Cost</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.needsAnalysis.currentElectricityCost || ''}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    needsAnalysis: { ...editedData.needsAnalysis, currentElectricityCost: e.target.value }
                  })}
                  className="w-full text-dark p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., $0.12/kWh"
                />
              ) : (
                <p className="text-stone-600">{project.needsAnalysis.currentElectricityCost || 'Not specified'}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Key Motivations</label>
            {isEditing ? (
              <textarea
                value={editedData.needsAnalysis.motivations.join('\n')}
                onChange={(e) => setEditedData({
                  ...editedData,
                  needsAnalysis: {
                    ...editedData.needsAnalysis,
                    motivations: e.target.value.split('\n').filter(m => m.trim())
                  }
                })}
                className="w-full text-dark p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                rows={4}
                placeholder="One motivation per line"
              />
            ) : (
              <ul className="space-y-2">
                {project.needsAnalysis.motivations.map((motivation, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <span className="text-stone-600">{motivation}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {project.needsAnalysis.constraints && project.needsAnalysis.constraints.length > 0 && (
            <div>
              <label className="text-sm font-medium text-stone-700 mb-2 block">Constraints</label>
              {isEditing ? (
                <textarea
                  value={editedData.needsAnalysis.constraints?.join('\n') || ''}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    needsAnalysis: {
                      ...editedData.needsAnalysis,
                      constraints: e.target.value.split('\n').filter(c => c.trim())
                    }
                  })}
                  className="w-full text-dark p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  rows={3}
                  placeholder="One constraint per line"
                />
              ) : (
                <ul className="space-y-2">
                  {project.needsAnalysis.constraints.map((constraint, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-stone-600">{constraint}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-white rounded-xl p-6 border border-stone-200">
        <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center space-x-2">
          {getSystemIcon(project.type)}
          <span>Technical Specifications</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-dark">
          {project.technicalSpecs.pvCapacity && (
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="text-xs text-stone-600 mb-1">PV Capacity</div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.technicalSpecs.pvCapacity || ''}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    technicalSpecs: { ...editedData.technicalSpecs, pvCapacity: e.target.value }
                  })}
                  className="w-full p-1 text-sm border border-stone-300 rounded"
                />
              ) : (
                <div className="font-bold text-stone-800">{project.technicalSpecs.pvCapacity}</div>
              )}
            </div>
          )}
          {project.technicalSpecs.inverterCapacity && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-stone-600 mb-1">Inverter Capacity</div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.technicalSpecs.inverterCapacity || ''}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    technicalSpecs: { ...editedData.technicalSpecs, inverterCapacity: e.target.value }
                  })}
                  className="w-full p-1 text-sm border border-stone-300 rounded"
                />
              ) : (
                <div className="font-bold text-stone-800">{project.technicalSpecs.inverterCapacity}</div>
              )}
            </div>
          )}
          {project.technicalSpecs.batteryCapacity && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xs text-stone-600 mb-1">Battery Storage</div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.technicalSpecs.batteryCapacity || ''}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    technicalSpecs: { ...editedData.technicalSpecs, batteryCapacity: e.target.value }
                  })}
                  className="w-full p-1 text-sm border border-stone-300 rounded"
                />
              ) : (
                <div className="font-bold text-stone-800">{project.technicalSpecs.batteryCapacity}</div>
              )}
            </div>
          )}
          {project.technicalSpecs.panelCount && (
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
              <div className="text-xs text-stone-600 mb-1">Panel Count</div>
              {isEditing ? (
                <input
                  type="number"
                  value={editedData.technicalSpecs.panelCount || ''}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    technicalSpecs: { ...editedData.technicalSpecs, panelCount: parseInt(e.target.value) }
                  })}
                  className="w-full p-1 text-sm border border-stone-300 rounded"
                />
              ) : (
                <div className="font-bold text-stone-800">{project.technicalSpecs.panelCount?.toLocaleString()}</div>
              )}
            </div>
          )}
          {project.technicalSpecs.inverterType && (
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
              <div className="text-xs text-stone-600 mb-1">Inverter Type</div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.technicalSpecs.inverterType || ''}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    technicalSpecs: { ...editedData.technicalSpecs, inverterType: e.target.value }
                  })}
                  className="w-full p-1 text-sm border border-stone-300 rounded"
                />
              ) : (
                <div className="font-medium text-stone-800 text-sm">{project.technicalSpecs.inverterType}</div>
              )}
            </div>
          )}
          {project.technicalSpecs.annualProduction && (
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-xs text-stone-600 mb-1">Annual Production</div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.technicalSpecs.annualProduction || ''}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    technicalSpecs: { ...editedData.technicalSpecs, annualProduction: e.target.value }
                  })}
                  className="w-full p-1 text-sm border border-stone-300 rounded"
                />
              ) : (
                <div className="font-bold text-stone-800">{project.technicalSpecs.annualProduction}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Project Management */}
      <div className="bg-white rounded-xl p-6 border border-stone-200 text-dark">
        <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-amber-600" />
          <span>Project Management</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>Project Manager</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.projectManager}
                onChange={(e) => setEditedData({ ...editedData, projectManager: e.target.value })}
                className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            ) : (
              <p className="text-stone-600 font-medium">{project.projectManager}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>Project Location</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.location}
                onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            ) : (
              <p className="text-stone-600">{project.location}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}