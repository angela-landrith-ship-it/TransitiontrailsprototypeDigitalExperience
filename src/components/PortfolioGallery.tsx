/**
 * PORTFOLIO GALLERY - PUBLIC LANDING PAGE
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Experience Page: ExpPage_Portfolio
 * URL Path: /portfolio
 * Primary Audience: Public (no authentication)
 * Secondary Audiences: Visitor, Learner, Partner
 * 
 * =============================================================================
 * SALESFORCE OBJECTS & FIELDS
 * =============================================================================
 * 
 * Primary Objects:
 * - Project__c (Published student projects)
 *   Fields: Is_Public__c, Slug__c, Name, Partner__c, Value_Headline__c,
 *           Cover_Image_URL__c, Trail__c, Role__c, Domain__c, Status__c,
 *           Skills_JSON__c, Badges_JSON__c
 * 
 * - Partner_Organization__c (Partner details)
 *   Fields: Name, Logo_URL__c, Website__c
 * 
 * =============================================================================
 */

import { useState } from 'react';
import { PortfolioCard, PortfolioProject } from './PortfolioCard';
import { PortfolioFilters, FilterOptions } from './PortfolioFilters';
import { Sparkles, TrendingUp } from 'lucide-react';
import { PageType } from '../App';

interface PortfolioGalleryProps {
  onNavigate: (page: PageType, slug?: string) => void;
}

export function PortfolioGallery({ onNavigate }: PortfolioGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<{
    trail?: string;
    role?: string;
    domain?: string;
    status?: string;
  }>({});

  // Mock data - In production, this would come from Salesforce via API
  const allProjects: PortfolioProject[] = [
    {
      id: '1',
      slug: 'hearts-hands-volunteer-management',
      title: 'Community Service Volunteer Management System',
      partnerName: 'Hearts & Hands Community Services',
      partnerLogo: '',
      coverImage: 'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      valueHeadline: 'Reduced volunteer intake time by 45% and increased program adoption by 30%',
      trail: 'Guided',
      role: 'Admin',
      domain: 'Nonprofit Cloud',
      status: 'Completed',
      skills: ['Salesforce Admin', 'Data Model', 'Flows', 'Reports'],
      badges: ['Partner Project', 'Capstone']
    },
    {
      id: '2',
      slug: 'youth-mentorship-portal',
      title: 'Youth Mentorship Matching Portal',
      partnerName: 'Future Leaders Foundation',
      partnerLogo: '',
      coverImage: 'https://images.unsplash.com/photo-1762330910399-95caa55acf04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      valueHeadline: 'Automated mentor matching reduced admin hours by 60%, matched 200+ youth',
      trail: 'Guided',
      role: 'Dev',
      domain: 'Experience Cloud',
      status: 'Completed',
      skills: ['LWR', 'Apex', 'Lightning Components', 'Integration'],
      badges: ['Partner Project', 'TrailBuild Winner']
    },
    {
      id: '3',
      slug: 'food-bank-inventory',
      title: 'Food Distribution Inventory System',
      partnerName: 'City Food Bank Network',
      partnerLogo: '',
      coverImage: 'https://images.unsplash.com/photo-1758691736843-90f58dce465e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      valueHeadline: 'Real-time inventory tracking eliminated 80% of stockouts',
      trail: 'Guided',
      role: 'BA',
      domain: 'Nonprofit Cloud',
      status: 'Completed',
      skills: ['Business Analysis', 'Process Automation', 'Data Model', 'Reports & Dashboards'],
      badges: ['Partner Project', 'Capstone']
    },
    {
      id: '4',
      slug: 'scholarship-application-portal',
      title: 'Scholarship Application & Review Portal',
      partnerName: 'Education Equity Alliance',
      partnerLogo: '',
      coverImage: 'https://images.unsplash.com/photo-1758790636662-2f8eec12077e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      valueHeadline: 'Streamlined application process for 500+ students, 40% faster reviews',
      trail: 'Mastery',
      role: 'Dev',
      domain: 'Experience Cloud',
      status: 'Completed',
      skills: ['Experience Cloud', 'Custom LWC', 'Apex', 'Document Generation'],
      badges: ['Partner Project']
    },
    {
      id: '5',
      slug: 'animal-shelter-adoption',
      title: 'Pet Adoption Matching Platform',
      partnerName: 'Happy Tails Animal Rescue',
      partnerLogo: '',
      coverImage: 'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      valueHeadline: 'AI-powered matching increased successful adoptions by 35%',
      trail: 'Mastery',
      role: 'Dev',
      domain: 'AI',
      status: 'In Progress',
      skills: ['Einstein AI', 'Apex', 'LWC', 'Integration'],
      badges: ['TrailBuild Winner']
    },
    {
      id: '6',
      slug: 'environmental-grant-tracking',
      title: 'Environmental Grant Management System',
      partnerName: 'Green Earth Initiative',
      partnerLogo: '',
      coverImage: 'https://images.unsplash.com/photo-1758691736843-90f58dce465e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      valueHeadline: 'Centralized grant tracking across 15 programs, improved reporting by 50%',
      trail: 'Guided',
      role: 'Admin',
      domain: 'Nonprofit Cloud',
      status: 'Completed',
      skills: ['NPSP', 'Grants Management', 'Reports', 'Dashboards'],
      badges: ['Partner Project', 'Capstone']
    }
  ];

  // Filter projects based on search and filters
  const filteredProjects = allProjects.filter((project) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.partnerName.toLowerCase().includes(query) ||
        project.valueHeadline.toLowerCase().includes(query) ||
        project.skills.some(skill => skill.toLowerCase().includes(query));
      
      if (!matchesSearch) return false;
    }

    // Trail filter
    if (activeFilters.trail && project.trail !== activeFilters.trail) {
      return false;
    }

    // Role filter
    if (activeFilters.role && project.role !== activeFilters.role) {
      return false;
    }

    // Domain filter
    if (activeFilters.domain && project.domain !== activeFilters.domain) {
      return false;
    }

    // Status filter
    if (activeFilters.status && project.status !== activeFilters.status) {
      return false;
    }

    return true;
  });

  const handleFilterChange = (filterType: keyof FilterOptions, value: string) => {
    setActiveFilters(prev => {
      if (prev[filterType] === value) {
        // Deselect if clicking the same filter
        const newFilters = { ...prev };
        delete newFilters[filterType];
        return newFilters;
      } else {
        // Select new filter
        return { ...prev, [filterType]: value };
      }
    });
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
  };

  const handleViewProject = (slug: string) => {
    onNavigate('portfolio-detail', slug);
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8] dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8" />
            <h1 className="text-4xl">Student Projects & Partner Impact</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Real work. Real value. Explore projects built by Transition Trails learners with our nonprofit and corporate partners.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 sticky top-6">
              <h2 className="text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#F9A03F]" />
                <span>Filters</span>
              </h2>
              <PortfolioFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Main Grid */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing <span className="font-medium text-gray-900 dark:text-gray-100">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
              </p>
            </div>

            {/* Project Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <PortfolioCard
                    key={project.id}
                    project={project}
                    onViewProject={handleViewProject}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">No projects found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-gray-900 dark:text-gray-100 mb-4">
            Interested in partnering with us?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            We connect skilled learners with mission-driven organizations to deliver real-world impact.
          </p>
          <button className="px-6 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-colors">
            Request Contact
          </button>
        </div>
      </div>
    </div>
  );
}
