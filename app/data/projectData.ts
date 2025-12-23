import { Project } from '../types/project.types';
import { MILESTONE_TEMPLATES } from './milestoneTemplates';

// Helper to create default client info
const createDefaultClientInfo = (companyName: string, contactName: string, email: string) => ({
  id: `client-${Math.random().toString(36).substr(2, 9)}`,
  name: contactName,
  companyName,
  email,
  phone: '+1 (555) 000-0000',
  address: 'Address not specified',
  profileUrl: `/clients/${companyName.toLowerCase().replace(/\s+/g, '-')}`
});

// Helper to create default needs analysis
const createDefaultNeedsAnalysis = () => ({
  primaryGoal: 'Transition to renewable energy',
  painPoints: ['High energy costs', 'Environmental impact concerns'],
  energyUsagePattern: 'Standard commercial usage',
  motivations: ['Cost savings', 'Sustainability goals'],
  constraints: []
});

// Helper function to create a milestone from template with realistic data
const createMilestoneWithData = (template: any, projectId: string, milestoneIndex: number) => {
  const isEarlyMilestone = milestoneIndex < 3;
  const isMidMilestone = milestoneIndex >= 3 && milestoneIndex < 6;
  
  // Add some realistic document versions for early milestones
  const requiredDocuments = template.requiredDocuments.map((doc: any) => {
    if (isEarlyMilestone) {
      // Completed milestones have approved documents
      return {
        ...doc,
        currentVersion: {
          id: `${doc.id}-v1`,
          version: 1,
          fileName: `${doc.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
          fileSize: `${Math.floor(Math.random() * 5 + 1)}.${Math.floor(Math.random() * 10)}MB`,
          fileUrl: `/uploads/${projectId}/${doc.id}-v1.pdf`,
          uploadedBy: 'John Smith',
          uploadedAt: new Date(2024, 0, 15 + milestoneIndex * 10).toISOString(),
          status: 'approved' as const,
          reviewedBy: 'TechReview Solutions',
          reviewedAt: new Date(2024, 0, 17 + milestoneIndex * 10).toISOString()
        },
        versions: [{
          id: `${doc.id}-v1`,
          version: 1,
          fileName: `${doc.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
          fileSize: `${Math.floor(Math.random() * 5 + 1)}.${Math.floor(Math.random() * 10)}MB`,
          fileUrl: `/uploads/${projectId}/${doc.id}-v1.pdf`,
          uploadedBy: 'John Smith',
          uploadedAt: new Date(2024, 0, 15 + milestoneIndex * 10).toISOString(),
          status: 'approved' as const,
          reviewedBy: 'TechReview Solutions',
          reviewedAt: new Date(2024, 0, 17 + milestoneIndex * 10).toISOString()
        }]
      };
    } else if (isMidMilestone && Math.random() > 0.4) {
      // In-progress milestones have mix of pending, approved, and rejected
      const statuses: ('pending-review' | 'approved' | 'rejected')[] = ['pending-review', 'approved', 'rejected'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      const versions = [];
      if (randomStatus === 'rejected') {
        // Rejected documents have multiple versions
        versions.push({
          id: `${doc.id}-v1`,
          version: 1,
          fileName: `${doc.name.replace(/[^a-zA-Z0-9]/g, '_')}_v1.pdf`,
          fileSize: `${Math.floor(Math.random() * 5 + 1)}.${Math.floor(Math.random() * 10)}MB`,
          fileUrl: `/uploads/${projectId}/${doc.id}-v1.pdf`,
          uploadedBy: 'Sarah Johnson',
          uploadedAt: new Date(2024, 2, 10 + milestoneIndex * 5).toISOString(),
          status: 'rejected' as const,
          reviewedBy: 'TechReview Solutions',
          reviewedAt: new Date(2024, 2, 12 + milestoneIndex * 5).toISOString(),
          rejectionReason: 'Missing technical specifications on page 3. Please include inverter capacity calculations and provide updated equipment datasheets.'
        });
        versions.push({
          id: `${doc.id}-v2`,
          version: 2,
          fileName: `${doc.name.replace(/[^a-zA-Z0-9]/g, '_')}_v2.pdf`,
          fileSize: `${Math.floor(Math.random() * 5 + 1)}.${Math.floor(Math.random() * 10)}MB`,
          fileUrl: `/uploads/${projectId}/${doc.id}-v2.pdf`,
          uploadedBy: 'Sarah Johnson',
          uploadedAt: new Date(2024, 2, 15 + milestoneIndex * 5).toISOString(),
          status: 'pending-review' as const
        });
      } else {
        versions.push({
          id: `${doc.id}-v1`,
          version: 1,
          fileName: `${doc.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
          fileSize: `${Math.floor(Math.random() * 5 + 1)}.${Math.floor(Math.random() * 10)}MB`,
          fileUrl: `/uploads/${projectId}/${doc.id}-v1.pdf`,
          uploadedBy: 'Sarah Johnson',
          uploadedAt: new Date(2024, 2, 10 + milestoneIndex * 5).toISOString(),
          status: randomStatus,
          ...(randomStatus === 'approved' ? {
            reviewedBy: 'TechReview Solutions',
            reviewedAt: new Date(2024, 2, 12 + milestoneIndex * 5).toISOString()
          } : {})
        });
      }
      
      return {
        ...doc,
        currentVersion: versions[versions.length - 1],
        versions
      };
    }
    
    // Not started milestones have no uploads
    return {
      ...doc,
      versions: []
    };
  });
  
  const approvedCount = requiredDocuments.filter((d: any) => 
    d.currentVersion?.status === 'approved'
  ).length;
  const rejectedCount = requiredDocuments.filter((d: any) => 
    d.currentVersion?.status === 'rejected'
  ).length;
  const uploadedCount = requiredDocuments.filter((d: any) => 
    d.currentVersion
  ).length;
  const pendingCount = requiredDocuments.filter((d: any) => 
    d.currentVersion?.status === 'pending-review'
  ).length;
  
  const totalRequired = requiredDocuments.length;
  const progress = Math.round((approvedCount / totalRequired) * 100);
  
  // Calculate status based on document states
  let status: 'not-started' | 'in-progress' | 'completed' | 'blocked' = 'not-started';
  if (approvedCount === totalRequired) {
    status = 'completed';
  } else if (rejectedCount > 0) {
    status = 'blocked';
  } else if (uploadedCount > 0 || pendingCount > 0) {
    status = 'in-progress';
  }
  
  return {
    id: `${projectId}-m${milestoneIndex + 1}`,
    ...template,
    status,
    startDate: status !== 'not-started' ? new Date(2024, 0, 15 + milestoneIndex * 15).toISOString() : undefined,
    endDate: status !== 'not-started' ? new Date(2024, 0, 30 + milestoneIndex * 15).toISOString() : undefined,
    completionDate: status === 'completed' ? new Date(2024, 0, 28 + milestoneIndex * 15).toISOString() : undefined,
    requiredDocuments,
    optionalDocuments: [],
    progress
  };
};

export const projectsData: Project[] = [
  {
    id: '1',
    name: 'Solar Farm Alpha',
    client: 'GreenTech Corporation',
    clientInfo: {
      id: 'client-1',
      name: 'Mike Chen',
      companyName: 'GreenTech Corporation',
      email: 'mike.chen@greentech.com',
      phone: '+1 (555) 123-4567',
      address: '123 Innovation Drive, San Francisco, CA 94105',
      industry: 'Technology',
      businessType: 'Data Center Operations',
      website: 'https://greentech.com',
      contactPerson: 'Mike Chen - VP of Sustainability',
      profileUrl: '/clients/client-1'
    },
    location: 'California, USA',
    capacity: '50MW',
    status: 'In Progress',
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2024-12-30',
    teamSize: 12,
    type: 'Solar',
    budget: '$2.5M',
    spent: '$1.625M',
    lastUpdate: '2 days ago',
    priority: 'High',
    description: 'Large-scale utility solar farm project with advanced tracking systems and energy storage integration. This project will provide clean energy to over 15,000 homes and includes a 10MWh battery storage system for grid stability.',
    projectManager: 'Sarah Johnson',
    clientContact: 'Mike Chen (mike.chen@greentech.com)',
    phase: 'Construction',
    
    // Deal Structure
    dealType: 'PPA',
    financingType: 'Tax Equity',
    contractTerm: '25 years',
    
    // Needs Analysis
    needsAnalysis: {
      primaryGoal: 'Reduce electricity costs by 40% and achieve 100% renewable energy for data center operations',
      painPoints: [
        'High and volatile electricity costs (~$15M/year)',
        'Corporate sustainability mandates (Net Zero by 2030)',
        'Grid reliability concerns during peak demand',
        'Pressure from investors for ESG improvements'
      ],
      energyUsagePattern: 'Baseload 24/7 with peak demand during business hours (8AM-6PM)',
      currentElectricityCost: '$0.12/kWh average',
      motivations: [
        'Cost savings (projected $6M/year)',
        'Corporate sustainability goals',
        'Hedge against future electricity price increases',
        'Positive PR and brand reputation'
      ],
      constraints: [
        'Need system operational before Q4 2024 for tax incentives',
        'Limited upfront capital availability',
        'Requires 99.9% uptime SLA'
      ],
      timeline: 'Target completion: Q4 2024',
      budget: 'Flexible - focused on long-term savings rather than upfront cost'
    },
    
    // O&M Schedule
    omSchedule: [
      {
        id: 'om-1',
        title: 'Quarterly Panel Cleaning',
        description: 'Clean all solar panels to maintain optimal efficiency',
        scheduledDate: '2024-06-15',
        status: 'scheduled',
        technician: 'ABC Solar Maintenance'
      },
      {
        id: 'om-2',
        title: 'Inverter Inspection',
        description: 'Inspect all inverters for wear and performance',
        scheduledDate: '2024-05-20',
        status: 'scheduled',
        technician: 'TBD'
      },
      {
        id: 'om-3',
        title: 'Annual Thermal Imaging',
        description: 'Thermal scan of all panels to detect hotspots',
        scheduledDate: '2024-12-01',
        status: 'scheduled',
        technician: 'TBD'
      }
    ],
    
    // O&M History
    omHistory: [
      {
        id: 'omh-1',
        date: '2024-03-15',
        type: 'preventive',
        description: 'Initial system commissioning and setup',
        technician: 'Sarah Johnson',
        duration: '8 hours',
        findings: 'All systems operational. Minor firmware updates applied to inverters.',
        nextAction: 'Schedule first quarterly maintenance for June 2024'
      }
    ],
    
    // Monitoring Dashboard
    monitoringDashboard: {
      isActive: true,
      dashboardUrl: 'https://monitoring.greentech-solar.com/dashboard/alpha',
      provider: 'SolarEdge',
      lastUpdate: '2 hours ago',
      status: 'online'
    },
    
    milestones: MILESTONE_TEMPLATES['Solar'].milestones.slice(0, 8).map((m, i) => 
      createMilestoneWithData(m, '1', i)
    ),
    teamMembers: [
      { id: 't1', name: 'Sarah Johnson', role: 'Project Manager', email: 'sarah.j@company.com', joinedDate: '2024-01-10' },
      { id: 't2', name: 'John Smith', role: 'Lead Engineer', email: 'john.s@company.com', joinedDate: '2024-01-15' },
      { id: 't3', name: 'Maria Garcia', role: 'Site Supervisor', email: 'maria.g@company.com', joinedDate: '2024-02-01' },
      { id: 't4', name: 'David Lee', role: 'Electrical Engineer', email: 'david.l@company.com', joinedDate: '2024-01-20' },
    ],
    recentActivity: [
      {
        id: 'a1',
        type: 'document-uploaded',
        message: 'Progress Reports uploaded to Construction & Installation milestone',
        date: '2 days ago',
        user: 'Maria Garcia',
        metadata: { documentName: 'Daily Progress Reports' }
      },
      {
        id: 'a2',
        type: 'document-approved',
        message: 'Equipment Specifications approved by TechReview Solutions',
        date: '3 days ago',
        user: 'TechReview Solutions',
        metadata: { documentName: 'Equipment Specifications' }
      },
      {
        id: 'a3',
        type: 'milestone-completed',
        message: 'Financial & Commercial milestone completed',
        date: '1 week ago',
        user: 'Sarah Johnson',
        metadata: { milestoneName: 'Financial & Commercial' }
      },
      {
        id: 'a4',
        type: 'document-rejected',
        message: 'Single Line Diagram rejected - needs revision',
        date: '1 week ago',
        user: 'TechReview Solutions',
        metadata: { documentName: 'Single Line Diagram (Electrical)' }
      },
      {
        id: 'a5',
        type: 'team-member-added',
        message: 'Maria Garcia joined as Site Supervisor',
        date: '2 weeks ago',
        user: 'Sarah Johnson'
      }
    ],
    projectHealth: {
      schedule: 'on-track',
      budget: 'at-risk',
      quality: 'excellent',
      documentation: 'in-progress'
    },
    technicalSpecs: {
      systemSize: '50MW DC',
      pvCapacity: '50MW',
      inverterCapacity: '47.5MW AC',
      batteryCapacity: '10MWh',
      panelCount: 125000,
      inverterType: 'Central Inverters (2.5MW each)',
      batteryStorage: '10MWh Lithium-Ion',
      annualProduction: '87,500 MWh/year'
    }
  },
  {
    id: '2',
    name: 'Wind Installation Beta',
    client: 'EcoEnergy Ltd',
    clientInfo: createDefaultClientInfo('EcoEnergy Ltd', 'Emily Watson', 'emily.w@ecoenergy.com'),
    location: 'Texas, USA',
    capacity: '100MW',
    status: 'Planning',
    progress: 35,
    startDate: '2024-03-01',
    endDate: '2025-09-15',
    teamSize: 8,
    type: 'Wind',
    budget: '$4.2M',
    spent: '$1.47M',
    lastUpdate: '1 day ago',
    priority: 'Medium',
    description: 'Large-scale wind farm development with 20 wind turbines, including transmission infrastructure and environmental mitigation measures. The project includes comprehensive wildlife monitoring and habitat preservation programs.',
    projectManager: 'David Rodriguez',
    clientContact: 'Emily Watson (emily.w@ecoenergy.com)',
    phase: 'Design',
    dealType: 'PPA',
    financingType: 'Debt',
    contractTerm: '20 years',
    needsAnalysis: createDefaultNeedsAnalysis(),
    omSchedule: [],
    omHistory: [],
    milestones: MILESTONE_TEMPLATES['Wind'].milestones.slice(0, 8).map((m, i) => 
      createMilestoneWithData(m, '2', i)
    ),
    teamMembers: [
      { id: 't5', name: 'David Rodriguez', role: 'Project Manager', email: 'david.r@company.com', joinedDate: '2024-02-15' },
      { id: 't6', name: 'Lisa Chen', role: 'Wind Resource Analyst', email: 'lisa.c@company.com', joinedDate: '2024-03-01' },
      { id: 't7', name: 'Tom Anderson', role: 'Environmental Specialist', email: 'tom.a@company.com', joinedDate: '2024-03-05' },
    ],
    recentActivity: [
      {
        id: 'a6',
        type: 'document-uploaded',
        message: 'Energy Production Simulation uploaded for review',
        date: '1 day ago',
        user: 'Lisa Chen',
        metadata: { documentName: 'Energy Production Simulation' }
      },
      {
        id: 'a7',
        type: 'milestone-completed',
        message: 'Site Assessment & Wind Resource milestone completed',
        date: '5 days ago',
        user: 'David Rodriguez',
        metadata: { milestoneName: 'Site Assessment & Wind Resource' }
      },
      {
        id: 'a8',
        type: 'document-approved',
        message: 'Environmental Impact Assessment approved',
        date: '1 week ago',
        user: 'TechReview Solutions',
        metadata: { documentName: 'Environmental Impact Assessment' }
      }
    ],
    projectHealth: {
      schedule: 'on-track',
      budget: 'on-track',
      quality: 'good',
      documentation: 'in-progress'
    },
    technicalSpecs: {
      systemSize: '100MW',
      windCapacity: '100MW',
      inverterType: 'N/A',
      annualProduction: '325,000 MWh/year'
    }
  },
  {
    id: '3',
    name: 'Hybrid System Gamma',
    client: 'PowerFlow Inc',
    clientInfo: createDefaultClientInfo('PowerFlow Inc', 'Robert Taylor', 'robert.t@powerflow.com'),
    location: 'Arizona, USA',
    capacity: '75MW (50MW Solar + 25MW Wind)',
    status: 'Review',
    progress: 85,
    startDate: '2023-11-10',
    endDate: '2024-08-30',
    teamSize: 15,
    type: 'Hybrid',
    budget: '$3.8M',
    spent: '$3.23M',
    lastUpdate: '3 hours ago',
    priority: 'High',
    description: 'Innovative hybrid renewable energy system combining solar and wind technologies with 20MWh battery storage for maximum efficiency and grid stability. Features advanced energy management system with AI-powered optimization.',
    projectManager: 'Lisa Chen',
    clientContact: 'Robert Taylor (robert.t@powerflow.com)',
    phase: 'Commissioning',
    dealType: 'Outright Purchase',
    financingType: 'Mixed',
    needsAnalysis: createDefaultNeedsAnalysis(),
    omSchedule: [],
    omHistory: [],
    milestones: MILESTONE_TEMPLATES['Hybrid'].milestones.slice(0, 8).map((m, i) => 
      createMilestoneWithData(m, '3', i)
    ),
    teamMembers: [
      { id: 't8', name: 'Lisa Chen', role: 'Project Manager', email: 'lisa.c@company.com', joinedDate: '2023-11-01' },
      { id: 't9', name: 'Carlos Martinez', role: 'Systems Integration Lead', email: 'carlos.m@company.com', joinedDate: '2023-11-10' },
      { id: 't10', name: 'Jennifer Wu', role: 'Controls Engineer', email: 'jennifer.w@company.com', joinedDate: '2023-12-01' },
    ],
    recentActivity: [
      {
        id: 'a9',
        type: 'document-uploaded',
        message: 'Performance Test Results uploaded - excellent results',
        date: '3 hours ago',
        user: 'Carlos Martinez',
        metadata: { documentName: 'Performance Test Results' }
      },
      {
        id: 'a10',
        type: 'milestone-completed',
        message: 'Construction & Installation milestone completed ahead of schedule',
        date: '1 day ago',
        user: 'Lisa Chen',
        metadata: { milestoneName: 'Construction & Installation' }
      },
      {
        id: 'a11',
        type: 'document-approved',
        message: 'Commissioning Report approved',
        date: '2 days ago',
        user: 'TechReview Solutions',
        metadata: { documentName: 'Commissioning Report' }
      }
    ],
    projectHealth: {
      schedule: 'on-track',
      budget: 'on-track',
      quality: 'excellent',
      documentation: 'in-progress'
    },
    technicalSpecs: {
      systemSize: '75MW (50MW Solar + 25MW Wind)',
      pvCapacity: '50MW',
      windCapacity: '25MW',
      batteryCapacity: '20MWh',
      panelCount: 125000,
      batteryStorage: '20MWh',
      annualProduction: '185,000 MWh/year'
    }
  },
  {
    id: '4',
    name: 'Community Solar Delta',
    client: 'LocalGrid Co',
    clientInfo: createDefaultClientInfo('LocalGrid Co', 'Maria Garcia', 'maria.g@localgrid.com'),
    location: 'Nevada, USA',
    capacity: '25MW',
    status: 'Completed',
    progress: 100,
    startDate: '2023-08-20',
    endDate: '2023-12-15',
    teamSize: 6,
    type: 'Solar',
    budget: '$1.2M',
    spent: '$1.15M',
    lastUpdate: '1 week ago',
    priority: 'Low',
    description: 'Community-scale solar installation providing renewable energy access to local residents and small businesses. Successfully serving 500+ subscribers with 100% renewable energy.',
    projectManager: 'Tom Anderson',
    clientContact: 'Maria Garcia (maria.g@localgrid.com)',
    phase: 'Operational',
    dealType: 'Lease',
    financingType: 'Debt',
    contractTerm: '15 years',
    needsAnalysis: createDefaultNeedsAnalysis(),
    omSchedule: [],
    omHistory: [],
    milestones: MILESTONE_TEMPLATES['Solar'].milestones.slice(0, 8).map((m, i) => 
      createMilestoneWithData(m, '4', i)
    ).map(m => ({ ...m, status: 'completed' as const, progress: 100 })),
    teamMembers: [
      { id: 't11', name: 'Tom Anderson', role: 'Project Manager', email: 'tom.a@company.com', joinedDate: '2023-08-15' },
      { id: 't12', name: 'Rachel Green', role: 'Community Liaison', email: 'rachel.g@company.com', joinedDate: '2023-08-20' },
    ],
    recentActivity: [
      {
        id: 'a12',
        type: 'project-updated',
        message: 'Monthly performance report shows 102% of expected generation',
        date: '1 week ago',
        user: 'Operations Team'
      },
      {
        id: 'a13',
        type: 'milestone-completed',
        message: 'Project successfully completed and handed over',
        date: '2 months ago',
        user: 'Tom Anderson',
        metadata: { milestoneName: 'Handover & Documentation' }
      }
    ],
    projectHealth: {
      schedule: 'on-track',
      budget: 'on-track',
      quality: 'excellent',
      documentation: 'complete'
    },
    technicalSpecs: {
      systemSize: '25MW DC',
      pvCapacity: '25MW',
      panelCount: 62500,
      inverterType: 'String Inverters',
      annualProduction: '43,750 MWh/year'
    }
  },
  {
    id: '5',
    name: 'Offshore Wind Epsilon',
    client: 'OceanPower Inc',
    clientInfo: createDefaultClientInfo('OceanPower Inc', 'Captain James Morrison', 'james.m@oceanpower.com'),
    location: 'North Carolina, USA',
    capacity: '200MW',
    status: 'Planning',
    progress: 20,
    startDate: '2024-05-01',
    endDate: '2025-12-31',
    teamSize: 25,
    type: 'Wind',
    budget: '$8.5M',
    spent: '$1.7M',
    lastUpdate: '5 days ago',
    priority: 'High',
    description: 'Ambitious offshore wind project with 40 advanced 5MW turbines designed to harness consistent ocean winds. Includes comprehensive marine environmental monitoring and vessel coordination protocols.',
    projectManager: 'Jennifer Wu',
    clientContact: 'Captain James Morrison (james.m@oceanpower.com)',
    phase: 'Site Assessment',
    dealType: 'PPA',
    financingType: 'Equity',
    contractTerm: '30 years',
    needsAnalysis: createDefaultNeedsAnalysis(),
    omSchedule: [],
    omHistory: [],
    milestones: MILESTONE_TEMPLATES['Wind'].milestones.slice(0, 8).map((m, i) => 
      createMilestoneWithData(m, '5', i)
    ),
    teamMembers: [
      { id: 't13', name: 'Jennifer Wu', role: 'Project Manager', email: 'jennifer.w@company.com', joinedDate: '2024-04-15' },
      { id: 't14', name: 'Michael Brown', role: 'Marine Engineer', email: 'michael.b@company.com', joinedDate: '2024-05-01' },
      { id: 't15', name: 'Sarah O\'Connor', role: 'Environmental Consultant', email: 'sarah.o@company.com', joinedDate: '2024-05-10' },
    ],
    recentActivity: [
      {
        id: 'a14',
        type: 'document-uploaded',
        message: 'Marine Survey data uploaded for analysis',
        date: '5 days ago',
        user: 'Michael Brown',
        metadata: { documentName: 'Site Survey Report' }
      },
      {
        id: 'a15',
        type: 'milestone-started',
        message: 'Site Assessment & Wind Resource milestone started',
        date: '1 week ago',
        user: 'Jennifer Wu',
        metadata: { milestoneName: 'Site Assessment & Wind Resource' }
      }
    ],
    projectHealth: {
      schedule: 'on-track',
      budget: 'on-track',
      quality: 'good',
      documentation: 'in-progress'
    },
    technicalSpecs: {
      systemSize: '200MW',
      windCapacity: '200MW',
      annualProduction: '750,000 MWh/year'
    }
  },
  {
    id: '6',
    name: 'Residential Solar Zeta',
    client: 'HomePower Solutions',
    clientInfo: createDefaultClientInfo('HomePower Solutions', 'Sandra Williams', 'sandra.w@homepower.com'),
    location: 'Florida, USA',
    capacity: '10MW',
    status: 'In Progress',
    progress: 55,
    startDate: '2024-02-01',
    endDate: '2024-07-30',
    teamSize: 4,
    type: 'Solar',
    budget: '$650K',
    spent: '$357K',
    lastUpdate: '1 day ago',
    priority: 'Medium',
    description: 'Distributed residential solar program installing rooftop systems across 200 homes in multiple neighborhoods. Includes community education and energy efficiency workshops.',
    projectManager: 'Carlos Rodriguez',
    clientContact: 'Sandra Williams (sandra.w@homepower.com)',
    phase: 'Construction',
    dealType: 'Outright Purchase',
    financingType: 'Cash',
    needsAnalysis: createDefaultNeedsAnalysis(),
    omSchedule: [],
    omHistory: [],
    milestones: MILESTONE_TEMPLATES['Solar'].milestones.slice(0, 8).map((m, i) => 
      createMilestoneWithData(m, '6', i)
    ),
    teamMembers: [
      { id: 't16', name: 'Carlos Rodriguez', role: 'Project Manager', email: 'carlos.r@company.com', joinedDate: '2024-01-25' },
      { id: 't17', name: 'Amanda Foster', role: 'Installation Coordinator', email: 'amanda.f@company.com', joinedDate: '2024-02-01' },
    ],
    recentActivity: [
      {
        id: 'a16',
        type: 'project-updated',
        message: '110 out of 200 installations completed - ahead of schedule',
        date: '1 day ago',
        user: 'Amanda Foster'
      },
      {
        id: 'a17',
        type: 'document-approved',
        message: 'Construction Schedule approved',
        date: '3 days ago',
        user: 'TechReview Solutions',
        metadata: { documentName: 'Construction Schedule' }
      },
      {
        id: 'a18',
        type: 'milestone-completed',
        message: 'Permitting & Approvals milestone completed',
        date: '1 week ago',
        user: 'Carlos Rodriguez',
        metadata: { milestoneName: 'Permitting & Approvals' }
      }
    ],
    projectHealth: {
      schedule: 'on-track',
      budget: 'on-track',
      quality: 'excellent',
      documentation: 'in-progress'
    },
    technicalSpecs: {
      systemSize: '10MW (50kW per home avg)',
      pvCapacity: '10MW',
      panelCount: 25000,
      inverterType: 'Micro-inverters',
      annualProduction: '15,000 MWh/year'
    }
  }
];