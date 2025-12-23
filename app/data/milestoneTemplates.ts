import { MilestoneTemplate, ProjectType } from '../types/project.types';

export const MILESTONE_TEMPLATES: Record<ProjectType, MilestoneTemplate> = {
  'Solar': {
    projectType: 'Solar',
    milestones: [
      {
        name: 'Site Assessment & Feasibility',
        description: 'Initial site evaluation, feasibility studies, and data collection',
        order: 1,
        completionCriteria: 'All required documents approved',
        requiredDocuments: [
          {
            id: 'doc-1-1',
            name: 'Electricity Bills (Last 12 Months)',
            description: 'Historical electricity consumption data for load analysis',
            fileTypes: ['.pdf', '.xlsx', '.csv'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-1-2',
            name: 'Site Survey Report',
            description: 'Detailed site measurements, roof condition, and structural assessment',
            fileTypes: ['.pdf', '.docx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-1-3',
            name: 'Environmental Impact Assessment',
            description: 'Environmental compliance and impact study',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Design & Engineering',
        description: 'System design, simulations, and technical specifications',
        order: 2,
        completionCriteria: 'All required documents approved by technical reviewer',
        requiredDocuments: [
          {
            id: 'doc-2-1',
            name: 'PVsyst/Helioscope Simulation',
            description: 'Complete system simulation with energy yield analysis',
            fileTypes: ['.pdf', '.prj', '.pvs', '.hsim'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-2-2',
            name: 'Single Line Diagram (Electrical)',
            description: 'Electrical single line diagram showing system configuration',
            fileTypes: ['.pdf', '.dwg', '.dxf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-2-3',
            name: 'Layout Design (Site Plan)',
            description: 'Detailed layout showing panel placement and equipment locations',
            fileTypes: ['.pdf', '.dwg', '.dxf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-2-4',
            name: 'Equipment Specifications',
            description: 'Technical datasheets for all major equipment (panels, inverters, mounting)',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-2-5',
            name: 'Structural Calculations',
            description: 'Load calculations and structural engineering report',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Financial & Commercial',
        description: 'Financial analysis, contracts, and client documentation',
        order: 3,
        completionCriteria: 'All financial documents approved',
        requiredDocuments: [
          {
            id: 'doc-3-1',
            name: 'Client Audited Financials',
            description: 'Last 3 years of audited financial statements',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-3-2',
            name: 'Financial Model & ROI Analysis',
            description: 'Complete financial model with IRR, NPV, and payback calculations',
            fileTypes: ['.xlsx', '.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-3-3',
            name: 'Power Purchase Agreement (PPA)',
            description: 'Signed PPA or lease agreement if applicable',
            fileTypes: ['.pdf', '.docx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Permitting & Approvals',
        description: 'Regulatory approvals, permits, and utility agreements',
        order: 4,
        completionCriteria: 'All permits obtained and approved',
        requiredDocuments: [
          {
            id: 'doc-4-1',
            name: 'Building Permit',
            description: 'Approved building permit from local authority',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-4-2',
            name: 'Utility Interconnection Agreement',
            description: 'Signed agreement with utility company for grid connection',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-4-3',
            name: 'Electrical Compliance Certificate',
            description: 'Certificate of compliance for electrical installation',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Procurement',
        description: 'Equipment procurement and vendor contracts',
        order: 5,
        completionCriteria: 'All equipment ordered and delivery scheduled',
        requiredDocuments: [
          {
            id: 'doc-5-1',
            name: 'Purchase Orders',
            description: 'All equipment purchase orders',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-5-2',
            name: 'Delivery Schedule',
            description: 'Confirmed delivery dates for all major equipment',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-5-3',
            name: 'Quality Certifications',
            description: 'Quality and warranty certificates from manufacturers',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Construction & Installation',
        description: 'On-site construction and system installation',
        order: 6,
        completionCriteria: 'Installation complete and verified',
        requiredDocuments: [
          {
            id: 'doc-6-1',
            name: 'Construction Schedule',
            description: 'Detailed construction timeline and milestones',
            fileTypes: ['.pdf', '.xlsx', '.mpp'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-6-2',
            name: 'Daily Progress Reports',
            description: 'Daily construction progress and site photos',
            fileTypes: ['.pdf', '.docx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-6-3',
            name: 'Safety Compliance Documentation',
            description: 'Health and safety compliance records',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Commissioning & Testing',
        description: 'System testing, commissioning, and performance verification',
        order: 7,
        completionCriteria: 'System commissioned and performance verified',
        requiredDocuments: [
          {
            id: 'doc-7-1',
            name: 'Commissioning Report',
            description: 'Complete system commissioning and test results',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-7-2',
            name: 'Performance Test Results',
            description: 'Initial performance testing and energy production data',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-7-3',
            name: 'As-Built Drawings',
            description: 'Final as-built electrical and layout drawings',
            fileTypes: ['.pdf', '.dwg'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Handover & Documentation',
        description: 'Project handover, training, and final documentation',
        order: 8,
        completionCriteria: 'All handover documents submitted and approved',
        requiredDocuments: [
          {
            id: 'doc-8-1',
            name: 'Operations & Maintenance Manual',
            description: 'Complete O&M manual for system operation',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-8-2',
            name: 'Warranty Documentation',
            description: 'All equipment warranties and guarantees',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-8-3',
            name: 'Training Records',
            description: 'Client training completion certificates',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-8-4',
            name: 'Project Completion Report',
            description: 'Final project report with all deliverables',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      }
    ]
  },
  'Wind': {
    projectType: 'Wind',
    milestones: [
      {
        name: 'Site Assessment & Wind Resource',
        description: 'Wind resource assessment and site feasibility',
        order: 1,
        completionCriteria: 'All required documents approved',
        requiredDocuments: [
          {
            id: 'doc-w-1-1',
            name: 'Wind Resource Assessment',
            description: 'Wind speed data and resource analysis',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-1-2',
            name: 'Logging Data (12 Months)',
            description: 'Met mast or LiDAR wind measurement data',
            fileTypes: ['.pdf', '.csv', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-1-3',
            name: 'Site Survey Report',
            description: 'Topographical and geotechnical site survey',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-1-4',
            name: 'Environmental Impact Assessment',
            description: 'Environmental and wildlife impact study',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Design & Engineering',
        description: 'Turbine selection, layout design, and engineering',
        order: 2,
        completionCriteria: 'All design documents approved',
        requiredDocuments: [
          {
            id: 'doc-w-2-1',
            name: 'Energy Production Simulation',
            description: 'WindPRO or similar simulation with energy yield',
            fileTypes: ['.pdf', '.wpro'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-2-2',
            name: 'Turbine Layout Design',
            description: 'Farm layout with turbine positions and spacing',
            fileTypes: ['.pdf', '.dwg'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-2-3',
            name: 'Electrical Single Line Diagram',
            description: 'Electrical system design and grid connection',
            fileTypes: ['.pdf', '.dwg'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-2-4',
            name: 'Foundation Design',
            description: 'Turbine foundation engineering calculations',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Financial & Commercial',
        description: 'Financial analysis and commercial agreements',
        order: 3,
        completionCriteria: 'All financial documents approved',
        requiredDocuments: [
          {
            id: 'doc-w-3-1',
            name: 'Client Audited Financials',
            description: 'Last 3 years of audited financial statements',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-3-2',
            name: 'Financial Model & Analysis',
            description: 'Complete financial model with LCOE and IRR',
            fileTypes: ['.xlsx', '.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-3-3',
            name: 'Power Purchase Agreement',
            description: 'Signed PPA or offtake agreement',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Permitting & Approvals',
        description: 'Regulatory permits and environmental clearances',
        order: 4,
        completionCriteria: 'All permits obtained',
        requiredDocuments: [
          {
            id: 'doc-w-4-1',
            name: 'Construction Permit',
            description: 'Approved construction permit',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-4-2',
            name: 'Environmental Clearance',
            description: 'Environmental approval certificate',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-4-3',
            name: 'Grid Connection Approval',
            description: 'Utility interconnection agreement',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Procurement',
        description: 'Turbine and equipment procurement',
        order: 5,
        completionCriteria: 'Equipment ordered and scheduled',
        requiredDocuments: [
          {
            id: 'doc-w-5-1',
            name: 'Turbine Purchase Order',
            description: 'Wind turbine procurement contract',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-5-2',
            name: 'Delivery Schedule',
            description: 'Equipment delivery timeline',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Construction & Installation',
        description: 'Civil works and turbine installation',
        order: 6,
        completionCriteria: 'Installation complete',
        requiredDocuments: [
          {
            id: 'doc-w-6-1',
            name: 'Construction Schedule',
            description: 'Detailed construction timeline',
            fileTypes: ['.pdf', '.mpp'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-6-2',
            name: 'Progress Reports',
            description: 'Weekly construction progress updates',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Commissioning & Testing',
        description: 'Turbine commissioning and performance testing',
        order: 7,
        completionCriteria: 'System commissioned',
        requiredDocuments: [
          {
            id: 'doc-w-7-1',
            name: 'Commissioning Report',
            description: 'Turbine commissioning results',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-7-2',
            name: 'Performance Test Results',
            description: 'Initial performance verification',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Handover & Documentation',
        description: 'Project handover and final documentation',
        order: 8,
        completionCriteria: 'Handover complete',
        requiredDocuments: [
          {
            id: 'doc-w-8-1',
            name: 'O&M Manual',
            description: 'Operations and maintenance manual',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-w-8-2',
            name: 'Warranty Documentation',
            description: 'All warranties and guarantees',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      }
    ]
  },
  'Hybrid': {
    projectType: 'Hybrid',
    milestones: [
      {
        name: 'Site Assessment & Resource Analysis',
        description: 'Combined solar and wind resource assessment',
        order: 1,
        completionCriteria: 'All assessment documents approved',
        requiredDocuments: [
          {
            id: 'doc-h-1-1',
            name: 'Electricity Bills (Last 12 Months)',
            description: 'Historical load profile data',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-1-2',
            name: 'Solar Resource Assessment',
            description: 'Solar irradiation and shading analysis',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-1-3',
            name: 'Wind Resource Data',
            description: 'Wind measurement and analysis',
            fileTypes: ['.pdf', '.csv'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-1-4',
            name: 'Site Survey Report',
            description: 'Comprehensive site assessment',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Integrated Design & Engineering',
        description: 'Hybrid system design with energy storage integration',
        order: 2,
        completionCriteria: 'All design documents approved',
        requiredDocuments: [
          {
            id: 'doc-h-2-1',
            name: 'Hybrid System Simulation',
            description: 'Combined solar-wind-storage simulation (HOMER/PVsyst)',
            fileTypes: ['.pdf', '.homer', '.pvs'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-2-2',
            name: 'Electrical Single Line Diagram',
            description: 'Integrated electrical system design',
            fileTypes: ['.pdf', '.dwg'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-2-3',
            name: 'Layout Design (Combined)',
            description: 'Site layout showing solar, wind, and storage placement',
            fileTypes: ['.pdf', '.dwg'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-2-4',
            name: 'Battery Storage Specifications',
            description: 'Energy storage system design and specs',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-2-5',
            name: 'Control System Architecture',
            description: 'Hybrid system control and optimization strategy',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Financial & Commercial',
        description: 'Financial analysis for hybrid system',
        order: 3,
        completionCriteria: 'All financial documents approved',
        requiredDocuments: [
          {
            id: 'doc-h-3-1',
            name: 'Client Audited Financials',
            description: 'Last 3 years of audited financial statements',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-3-2',
            name: 'Financial Model & ROI Analysis',
            description: 'Hybrid system financial model with storage economics',
            fileTypes: ['.xlsx', '.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-3-3',
            name: 'Power Purchase Agreement',
            description: 'Offtake agreement or PPA',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Permitting & Approvals',
        description: 'Combined permits for hybrid installation',
        order: 4,
        completionCriteria: 'All permits obtained',
        requiredDocuments: [
          {
            id: 'doc-h-4-1',
            name: 'Building/Construction Permit',
            description: 'Approved permit for hybrid system',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-4-2',
            name: 'Utility Interconnection Agreement',
            description: 'Grid connection approval',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-4-3',
            name: 'Battery Storage Permit',
            description: 'Energy storage system approval',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Procurement',
        description: 'Equipment procurement for all subsystems',
        order: 5,
        completionCriteria: 'All equipment ordered',
        requiredDocuments: [
          {
            id: 'doc-h-5-1',
            name: 'Purchase Orders (All Systems)',
            description: 'POs for solar, wind, and storage equipment',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-5-2',
            name: 'Delivery Schedule',
            description: 'Coordinated delivery timeline',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Construction & Installation',
        description: 'Hybrid system installation',
        order: 6,
        completionCriteria: 'Installation complete',
        requiredDocuments: [
          {
            id: 'doc-h-6-1',
            name: 'Construction Schedule',
            description: 'Integrated construction timeline',
            fileTypes: ['.pdf', '.mpp'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-6-2',
            name: 'Progress Reports',
            description: 'Construction progress updates',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Commissioning & Testing',
        description: 'Integrated system commissioning',
        order: 7,
        completionCriteria: 'System operational',
        requiredDocuments: [
          {
            id: 'doc-h-7-1',
            name: 'Commissioning Report',
            description: 'Full system commissioning results',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-7-2',
            name: 'Performance Test Results',
            description: 'Integrated system performance data',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-7-3',
            name: 'As-Built Drawings',
            description: 'Final as-built documentation',
            fileTypes: ['.pdf', '.dwg'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Handover & Documentation',
        description: 'Project handover',
        order: 8,
        completionCriteria: 'Handover complete',
        requiredDocuments: [
          {
            id: 'doc-h-8-1',
            name: 'O&M Manual (Integrated)',
            description: 'Complete operations manual for hybrid system',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-8-2',
            name: 'Warranty Documentation',
            description: 'All equipment warranties',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-h-8-3',
            name: 'Project Completion Report',
            description: 'Final project documentation',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      }
    ]
  },
  'Battery Storage': {
    projectType: 'Battery Storage',
    milestones: [
      {
        name: 'Site Assessment & Load Analysis',
        description: 'Load profile analysis and site evaluation',
        order: 1,
        completionCriteria: 'All assessment documents approved',
        requiredDocuments: [
          {
            id: 'doc-b-1-1',
            name: 'Electricity Bills (Last 12 Months)',
            description: 'Historical consumption and demand data',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-b-1-2',
            name: 'Load Profile Analysis',
            description: 'Detailed load curve and peak demand analysis',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-b-1-3',
            name: 'Site Survey Report',
            description: 'Installation site assessment',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'System Design & Engineering',
        description: 'Battery system design and specifications',
        order: 2,
        completionCriteria: 'All design documents approved',
        requiredDocuments: [
          {
            id: 'doc-b-2-1',
            name: 'Battery System Design',
            description: 'Complete BESS design with capacity sizing',
            fileTypes: ['.pdf', '.xlsx'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-b-2-2',
            name: 'Electrical Single Line Diagram',
            description: 'Electrical system design',
            fileTypes: ['.pdf', '.dwg'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-b-2-3',
            name: 'Control System Architecture',
            description: 'BMS and control strategy',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Financial & Commercial',
        description: 'Financial analysis',
        order: 3,
        completionCriteria: 'Financial approval obtained',
        requiredDocuments: [
          {
            id: 'doc-b-3-1',
            name: 'Client Audited Financials',
            description: 'Financial statements',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-b-3-2',
            name: 'Financial Model',
            description: 'BESS economics and arbitrage analysis',
            fileTypes: ['.xlsx', '.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Permitting & Approvals',
        description: 'Regulatory approvals',
        order: 4,
        completionCriteria: 'All permits obtained',
        requiredDocuments: [
          {
            id: 'doc-b-4-1',
            name: 'Installation Permit',
            description: 'Building permit for battery system',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          },
          {
            id: 'doc-b-4-2',
            name: 'Grid Connection Approval',
            description: 'Utility interconnection agreement',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Procurement',
        description: 'Battery and equipment procurement',
        order: 5,
        completionCriteria: 'Equipment ordered',
        requiredDocuments: [
          {
            id: 'doc-b-5-1',
            name: 'Purchase Orders',
            description: 'Battery system procurement',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Installation',
        description: 'Battery system installation',
        order: 6,
        completionCriteria: 'Installation complete',
        requiredDocuments: [
          {
            id: 'doc-b-6-1',
            name: 'Installation Schedule',
            description: 'Installation timeline',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Commissioning',
        description: 'System testing and commissioning',
        order: 7,
        completionCriteria: 'System commissioned',
        requiredDocuments: [
          {
            id: 'doc-b-7-1',
            name: 'Commissioning Report',
            description: 'BESS commissioning results',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      },
      {
        name: 'Handover',
        description: 'Project handover',
        order: 8,
        completionCriteria: 'Handover complete',
        requiredDocuments: [
          {
            id: 'doc-b-8-1',
            name: 'O&M Manual',
            description: 'Operations manual',
            fileTypes: ['.pdf'],
            maxSize: 10,
            versions: [],
            isRequired: true
          }
        ]
      }
    ]
  }
};