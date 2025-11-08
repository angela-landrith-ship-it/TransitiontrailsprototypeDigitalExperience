/**
 * PORTFOLIO RÉSUMÉ TILE - STUDENT DASHBOARD WIDGET
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Component: PortfolioResumeTile
 * Page: My Profile → Dashboard
 * Audience: Authenticated Learners with at least one published project
 * Placement: Right column, above "My Merch Orders"
 * 
 * =============================================================================
 * SALESFORCE OBJECTS & FIELDS
 * =============================================================================
 * 
 * Project__c:
 * - Is_Public__c (Checkbox) - Controls visibility
 * - Slug__c (Text, 100) - URL-safe project identifier
 * - Short_URL__c (Text, 255) - Short link (e.g., tt.ac/abc123)
 * - Name (Text, 255) - Project title
 * - Cover_Image_URL__c (URL) - From CMS
 * - Value_Headline__c (Text, 255) - One-line impact statement
 * 
 * Student Consent:
 * - User.Portfolio_Consent__c (Checkbox)
 * 
 * Partner Consent:
 * - Partner_Organization__c.Public_Consent__c (Checkbox)
 * 
 * =============================================================================
 * ADMIN CONTROLS (Component Properties)
 * =============================================================================
 * 
 * - ALLOW_QR_DOWNLOAD (boolean, default: true)
 * - ENABLE_SHORT_URL (boolean, default: true)
 * - LINK_DOMAIN (string, default: "tt.ac")
 * - ENABLE_LINKEDIN_COMPOSER (boolean, default: true)
 * 
 * =============================================================================
 */

import { useState } from 'react';
import { Copy, Download, Linkedin, ExternalLink, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner@2.0.3';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

interface PublishedProject {
  id: string;
  slug: string;
  shortUrl: string;
  name: string;
  coverImage: string;
  valueHeadline: string;
  description: string;
}

interface PortfolioResumeTileProps {
  hasProjects?: boolean;
  project?: string;
  showQR?: boolean;
  showLinkedInComposer?: boolean;
  onNavigateToProjects?: () => void;
}

export function PortfolioResumeTile({
  hasProjects = true,
  showQR = true,
  showLinkedInComposer = true,
  onNavigateToProjects
}: PortfolioResumeTileProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Mock data - In production, this comes from Salesforce via API
  // Query: SELECT Id, Name, Slug__c, Short_URL__c, Cover_Image_URL__c, Value_Headline__c 
  //        FROM Project__c 
  //        WHERE Is_Public__c = true 
  //        ORDER BY LastModifiedDate DESC
  const publishedProjects: PublishedProject[] = [
    {
      id: '1',
      slug: 'hearts-hands-volunteer-management',
      shortUrl: 'tt.ac/hh-vol',
      name: 'Community Service Volunteer Management System',
      coverImage: 'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      valueHeadline: 'Reduced volunteer intake time by 45% and increased program adoption by 30%',
      description: 'Built a comprehensive Salesforce Nonprofit Cloud solution featuring automated volunteer intake, intelligent matching, and real-time reporting dashboards for Hearts & Hands Community Services.'
    },
    {
      id: '2',
      slug: 'youth-mentorship-portal',
      shortUrl: 'tt.ac/ym-portal',
      name: 'Youth Mentorship Matching Portal',
      coverImage: 'https://images.unsplash.com/photo-1762330910399-95caa55acf04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      valueHeadline: 'Automated mentor matching reduced admin hours by 60%, matched 200+ youth',
      description: 'Developed an Experience Cloud portal with AI-powered mentor matching for Future Leaders Foundation, streamlining the connection process for mentors and mentees.'
    },
    {
      id: '3',
      slug: 'food-bank-inventory',
      shortUrl: 'tt.ac/fb-inv',
      name: 'Food Distribution Inventory System',
      coverImage: 'https://images.unsplash.com/photo-1758691736843-90f58dce465e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      valueHeadline: 'Real-time inventory tracking eliminated 80% of stockouts',
      description: 'Created a real-time inventory management system for City Food Bank Network, enabling efficient food distribution tracking and reducing waste.'
    }
  ];

  const selectedProject = selectedProjectId 
    ? publishedProjects.find(p => p.id === selectedProjectId)
    : publishedProjects[0];

  // Set default selection
  if (!selectedProjectId && publishedProjects.length > 0) {
    setSelectedProjectId(publishedProjects[0].id);
  }

  const handleCopyLink = () => {
    if (selectedProject) {
      const fullUrl = `https://${selectedProject.shortUrl}`;
      navigator.clipboard.writeText(fullUrl).then(() => {
        setCopySuccess(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopySuccess(false), 2000);
      });
    }
  };

  const handleDownloadQR = () => {
    if (!selectedProject) return;

    // Get the QR code SVG element
    const svg = document.getElementById('portfolio-qr-code');
    if (!svg) return;

    // Convert SVG to PNG and download
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `portfolio-${selectedProject.slug}.png`;
          link.click();
          URL.revokeObjectURL(url);
          toast.success('QR code downloaded!');
        }
      });
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  // Empty State - No published projects
  if (!hasProjects || publishedProjects.length === 0) {
    return (
      <div className="bg-[#F2EAD3] dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-[#F9A03F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-[#F9A03F]" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 dark:text-gray-100 mb-2">Share Your Portfolio</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-900 dark:text-blue-300 mb-2">
                    Publish a project to unlock your shareable portfolio tile.
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-400">
                    Perfect for your résumé and LinkedIn Featured section!
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={onNavigateToProjects}
              className="px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm"
            >
              Go to Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#F2EAD3] dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-[#2F6B4E] text-white px-6 py-4">
          <h3 className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5" />
            <span>Share Your Portfolio</span>
          </h3>
          <p className="text-sm text-green-100 mt-1">
            Perfect for your résumé and LinkedIn Featured
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Project Selector */}
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
              Choose a project
            </label>
            <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
              <SelectTrigger className="w-full bg-white dark:bg-slate-900">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {publishedProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProject && (
            <>
              {/* Short Link */}
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  Short link
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2">
                    <code className="text-sm text-[#2C6975] dark:text-[#7EB5C1]">
                      {selectedProject.shortUrl}
                    </code>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                      copySuccess
                        ? 'bg-[#3B6A52] text-white'
                        : 'bg-[#F9A03F] text-white hover:bg-[#e89135]'
                    }`}
                  >
                    {copySuccess ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* QR Code */}
              {showQR && (
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200 dark:border-slate-600">
                    <QRCodeSVG
                      id="portfolio-qr-code"
                      value={`https://${selectedProject.shortUrl}`}
                      size={120}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      Scan to view project
                    </p>
                    <button
                      onClick={handleDownloadQR}
                      className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-sm text-gray-700 dark:text-gray-300"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download QR PNG</span>
                    </button>
                  </div>
                </div>
              )}

              {/* LinkedIn Featured */}
              {showLinkedInComposer && (
                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => setShowLinkedInModal(true)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>Add to LinkedIn Featured</span>
                  </button>
                </div>
              )}

              {/* Helper Text */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-900 dark:text-blue-300">
                    <strong>Sharing helps partners discover your work.</strong> Add this to your résumé, portfolio website, and LinkedIn profile to showcase real-world impact.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* LinkedIn Featured Composer Modal */}
      {showLinkedInComposer && selectedProject && (
        <LinkedInFeaturedComposer
          isOpen={showLinkedInModal}
          onClose={() => setShowLinkedInModal(false)}
          project={selectedProject}
        />
      )}
    </>
  );
}

// LinkedIn Featured Composer Component
interface LinkedInFeaturedComposerProps {
  isOpen: boolean;
  onClose: () => void;
  project: PublishedProject;
}

function LinkedInFeaturedComposer({ isOpen, onClose, project }: LinkedInFeaturedComposerProps) {
  const [title, setTitle] = useState(project.valueHeadline);
  const [description, setDescription] = useState(project.description);
  const [copied, setCopied] = useState(false);

  // Penny AI suggestions
  const pennySuggestions = [
    "Try a results-first headline (e.g., 'Reduced intake time by 45%').",
    "Keep your description under 220 characters.",
    "Lead with impact metrics, then explain the solution.",
    "Mention the partner organization to add credibility."
  ];

  const handleCopyContent = () => {
    const content = `${title}\n\n${description}\n\n${project.shortUrl}`;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      toast.success('Content copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleOpenLinkedIn = () => {
    // In production, this would open LinkedIn's featured section
    window.open('https://www.linkedin.com/in/me/details/featured/', '_blank');
    toast.info('Opening LinkedIn Featured section...');
  };

  const characterCount = description.length;
  const isOverLimit = characterCount > 220;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Linkedin className="w-6 h-6 text-[#0A66C2]" />
            <span>Add to LinkedIn Featured</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-4">
            {/* Preview Image */}
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                Preview Image
              </label>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800">
                <img
                  src={project.coverImage}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                Title (Headline)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#2C6975] focus:border-transparent text-gray-900 dark:text-gray-100"
                placeholder="Impact-focused headline"
              />
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <span className={`text-xs ${
                  isOverLimit ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {characterCount}/220 characters
                </span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full px-4 py-2 bg-white dark:bg-slate-900 border rounded-lg focus:ring-2 focus:ring-[#2C6975] focus:border-transparent text-gray-900 dark:text-gray-100 ${
                  isOverLimit ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                }`}
                placeholder="2-3 line summary of the project and its impact"
              />
              {isOverLimit && (
                <div className="flex items-center space-x-2 mt-2 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Description is too long. LinkedIn recommends under 220 characters.</span>
                </div>
              )}
            </div>

            {/* URL */}
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                URL (Read-only)
              </label>
              <div className="bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2">
                <code className="text-sm text-[#2C6975] dark:text-[#7EB5C1]">
                  https://{project.shortUrl}
                </code>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-4">
              <button
                onClick={handleCopyContent}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  copied
                    ? 'bg-[#3B6A52] text-white'
                    : 'bg-[#F9A03F] text-white hover:bg-[#e89135]'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Content</span>
                  </>
                )}
              </button>

              <button
                onClick={handleOpenLinkedIn}
                className="flex items-center space-x-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-colors"
              >
                <span>Open LinkedIn</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Penny Helper */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 p-4 sticky top-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-[#F9A03F] rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-gray-900 dark:text-gray-100">Penny's Tips</h4>
              </div>
              
              <ul className="space-y-3">
                {pennySuggestions.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-[#F9A03F] flex-shrink-0 mt-1">•</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-slate-700">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Pro tip:</strong> LinkedIn Featured items appear prominently on your profile and are visible before visitors scroll.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Icon fix
import { Briefcase } from 'lucide-react';
