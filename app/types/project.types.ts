// Deal Structure Types
export type DealType = 'PPA' | 'Lease' | 'Outright Purchase' | 'ESCO' | 'Hybrid';
export type FinancingType = 'Cash' | 'Debt' | 'Equity' | 'Tax Equity' | 'Grant' | 'Mixed';

// O&M Types
export interface OMScheduleItem {
  id: string;
  title: string;
  description: string;
  scheduledDate: string;
  completedDate?: string;
  status: 'scheduled' | 'completed' | 'overdue' | 'cancelled';
  technician?: string;
  notes?: string;
}

export interface OMHistory {
  id: string;
  date: string;
  type: 'preventive' | 'corrective' | 'inspection' | 'emergency';
  description: string;
  technician: string;
  duration: string;
  cost?: string;
  findings?: string;
  nextAction?: string;
}

// Client Information
export interface ClientInfo {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  industry?: string;
  businessType?: string;
  website?: string;
  contactPerson?: string;
  profileUrl?: string; // Link to detailed client profile
}

// Needs Analysis
export interface NeedsAnalysis {
  primaryGoal: string;
  painPoints: string[];
  energyUsagePattern: string;
  currentElectricityCost?: string;
  motivations: string[];
  constraints?: string[];
  timeline?: string;
  budget?: string;
}

// Monitoring Dashboard
export interface MonitoringDashboard {
  isActive: boolean;
  dashboardUrl?: string;
  provider?: string; // e.g., "SolarEdge", "Fronius", "Custom SCADA"
  lastUpdate?: string;
  status?: 'online' | 'offline' | 'maintenance';
}

// Core Project Types
export type ProjectType = 'Solar' | 'Wind' | 'Hybrid' | 'Battery Storage';
export type ProjectStatus = 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'On Hold' | 'Operational';
export type ProjectPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type ProjectPhase = 'Site Assessment' | 'Design' | 'Permitting' | 'Procurement' | 'Construction' | 'Commissioning' | 'Operational';

export type MilestoneStatus = 'not-started' | 'in-progress' | 'completed' | 'blocked';
export type DocumentStatus = 'not-submitted' | 'pending-review' | 'approved' | 'rejected';

// Document Types
export interface DocumentVersion {
  id: string;
  version: number;
  fileName: string;
  fileSize: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
  status: DocumentStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

export interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  fileTypes: string[];
  maxSize: number; // in MB
  currentVersion?: DocumentVersion;
  versions: DocumentVersion[];
  isRequired: true;
}

export interface OptionalDocument {
  id: string;
  name: string;
  description: string;
  fileSize: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
  status: DocumentStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  isRequired: false;
}

export type Document = RequiredDocument | OptionalDocument;

// Milestone Types
export interface Milestone {
  id: string;
  name: string;
  description: string;
  order: number;
  status: MilestoneStatus;
  startDate?: string;
  endDate?: string;
  completionDate?: string;
  requiredDocuments: RequiredDocument[];
  optionalDocuments: OptionalDocument[];
  completionCriteria: string;
  progress: number; // percentage based on approved required documents
}

// Activity Types
export type ActivityType = 
  | 'document-uploaded' 
  | 'document-approved' 
  | 'document-rejected' 
  | 'milestone-completed' 
  | 'milestone-started'
  | 'project-updated' 
  | 'team-member-added' 
  | 'team-member-removed'
  | 'comment-added';

export interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  date: string;
  user: string;
  metadata?: {
    documentName?: string;
    milestoneName?: string;
    oldValue?: string;
    newValue?: string;
  };
}

// Team Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
  joinedDate: string;
}

// Project Health Metrics
export interface ProjectHealth {
  schedule: 'on-track' | 'at-risk' | 'delayed';
  budget: 'on-track' | 'at-risk' | 'over-budget';
  quality: 'excellent' | 'good' | 'needs-improvement';
  documentation: 'complete' | 'in-progress' | 'incomplete';
}

// Main Project Interface
export interface Project {
  id: string;
  name: string;
  client: string;
  clientInfo: ClientInfo;
  location: string;
  capacity: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  endDate: string;
  teamSize: number;
  type: ProjectType;
  budget: string;
  spent: string;
  lastUpdate: string;
  priority: ProjectPriority;
  description: string;
  projectManager: string;
  clientContact: string;
  phase: ProjectPhase;
  
  // Deal Structure
  dealType: DealType;
  financingType: FinancingType;
  contractTerm?: string; // e.g., "25 years" for PPA
  
  // Needs Analysis
  needsAnalysis: NeedsAnalysis;
  
  // O&M
  omSchedule: OMScheduleItem[];
  omHistory: OMHistory[];
  
  // Monitoring
  monitoringDashboard?: MonitoringDashboard;
  
  milestones: Milestone[];
  teamMembers: TeamMember[];
  recentActivity: Activity[];
  projectHealth: ProjectHealth;
  technicalSpecs: {
    systemSize?: string;
    pvCapacity?: string;
    inverterCapacity?: string;
    batteryCapacity?: string;
    windCapacity?: string;
    panelCount?: number;
    inverterType?: string;
    batteryStorage?: string;
    annualProduction?: string;
  };
}

// Milestone Templates by Project Type
export interface MilestoneTemplate {
  projectType: ProjectType;
  milestones: Omit<Milestone, 'id' | 'status' | 'progress' | 'startDate' | 'endDate' | 'completionDate' | 'optionalDocuments'>[];
}