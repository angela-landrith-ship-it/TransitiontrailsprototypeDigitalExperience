/**
 * PORTFOLIO CARD COMPONENT
 * 
 * Individual project card for the portfolio gallery.
 * Shows project image, title, partner logo, value proposition, and tags.
 * 
 * Features:
 * - Hover animation with amber shadow
 * - Share functionality
 * - Badge pills (Partner Project, Capstone, TrailBuild Winner)
 * - Responsive image with CMS support
 */

import { ExternalLink, Share2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  partnerName: string;
  partnerLogo?: string;
  coverImage: string;
  valueHeadline: string;
  trail: 'Visitor' | 'Guided' | 'Mastery';
  role: 'Admin' | 'BA' | 'Dev';
  domain: string;
  status: 'Completed' | 'In Progress';
  skills: string[];
  badges?: ('Partner Project' | 'Capstone' | 'TrailBuild Winner')[];
}

interface PortfolioCardProps {
  project: PortfolioProject;
  onViewProject: (slug: string) => void;
}

export function PortfolioCard({ project, onViewProject }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/portfolio/${project.slug}`;
    
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Project link copied to clipboard!');
    });
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Partner Project':
        return 'bg-[#F9A03F] text-white';
      case 'Capstone':
        return 'bg-[#2C6975] text-white';
      case 'TrailBuild Winner':
        return 'bg-[#7EB5C1] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 cursor-pointer transition-all duration-300 group ${
        isHovered ? 'shadow-xl shadow-[#F9A03F]/20 -translate-y-1' : 'shadow-sm hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewProject(project.slug)}
    >
      {/* Cover Image */}
      <div className="relative aspect-video bg-gray-100 dark:bg-slate-700 overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badge Pills */}
        {project.badges && project.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {project.badges.map((badge) => (
              <span
                key={badge}
                className={`px-3 py-1 rounded-full text-xs ${getBadgeColor(badge)} shadow-md`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Partner Logo Overlay */}
        {project.partnerLogo && (
          <div className="absolute bottom-3 right-3 bg-white dark:bg-slate-800 rounded-lg p-2 shadow-md">
            <img
              src={project.partnerLogo}
              alt={project.partnerName}
              className="h-8 w-auto object-contain"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Partner */}
        <h3 className="text-gray-900 dark:text-gray-100 mb-1 line-clamp-2 group-hover:text-[#2C6975] dark:group-hover:text-[#7EB5C1] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {project.partnerName}
        </p>

        {/* Value Headline */}
        <p className="text-sm text-[#2C6975] dark:text-[#7EB5C1] mb-4 line-clamp-2">
          {project.valueHeadline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            {project.trail} Trail
          </Badge>
          <Badge variant="outline" className="text-xs">
            {project.role}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {project.domain}
          </Badge>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded text-xs"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span className="px-2 py-0.5 text-gray-500 dark:text-gray-400 text-xs">
              +{project.skills.length - 3} more
            </span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex items-center justify-between">
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm"
            onClick={() => onViewProject(project.slug)}
          >
            <span>View Project</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-[#2C6975] dark:hover:text-[#7EB5C1]"
            title="Share project"
            aria-label="Share project"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
