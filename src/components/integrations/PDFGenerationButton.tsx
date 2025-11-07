/**
 * PDF GENERATION BUTTON COMPONENT
 * 
 * =============================================================================
 * PURPOSE
 * =============================================================================
 * Triggers branded PDF generation for various deliverables:
 * - Capstone project summaries
 * - Partner project briefs
 * - TrailBuild team submissions
 * - Coach assessment reports
 * - Certificate of completion
 * 
 * =============================================================================
 * SALESFORCE INTEGRATION
 * =============================================================================
 * 
 * Flow Trigger:
 * - Flow Name: Generate_{Type}_PDF (e.g., Generate_Capstone_PDF)
 * - Trigger: Button click → LWC calls Flow via NavigationMixin
 * - Input: Record ID (Project__c, Assessment__c, etc.)
 * 
 * PDF Generation Process:
 * 1. User clicks "Generate PDF" button
 * 2. LWC calls Screen Flow or Apex action
 * 3. Visualforce page renders with record data
 * 4. PDF created as ContentVersion
 * 5. Link stored in Latest_PDF__c field
 * 6. Email sent with PDF attachment
 * 7. Success message shown to user
 * 
 * Visualforce Template:
 * - Template: {Type}PDF.page (e.g., CapstoneProjectPDF)
 * - Includes: Transition Trails logo, header, footer
 * - Content: Dynamic from record data
 * 
 * Storage:
 * - ContentVersion object (Salesforce Files)
 * - Linked to parent record via ContentDocumentLink
 * - Field: Project__c.Latest_PDF__c (Lookup: ContentVersion)
 * 
 * =============================================================================
 * PROPS
 * =============================================================================
 * @param recordId - Salesforce record ID to generate PDF for
 * @param recordType - Type of record ('capstone' | 'partner' | 'assessment' | 'certificate')
 * @param fileName - PDF file name (e.g., "Capstone_Summary_Alex_Johnson.pdf")
 * @param buttonText - Custom button text
 * @param variant - Button style: 'primary' | 'secondary' | 'outline'
 * @param size - Button size: 'sm' | 'md' | 'lg'
 * @param showIcon - Whether to show PDF icon
 * @param disabled - Whether button is disabled
 * @param onSuccess - Callback when PDF generated successfully
 * @param onError - Callback when PDF generation fails
 * 
 * =============================================================================
 */

import { FileText, Download, CheckCircle, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface PDFGenerationButtonProps {
  recordId: string;
  recordType: 'capstone' | 'partner' | 'assessment' | 'certificate' | 'trailbuild';
  fileName?: string;
  buttonText?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  disabled?: boolean;
  existingPdfUrl?: string; // If PDF already exists
  onSuccess?: (pdfUrl: string) => void;
  onError?: (error: string) => void;
}

export function PDFGenerationButton({
  recordId,
  recordType,
  fileName,
  buttonText,
  variant = 'primary',
  size = 'md',
  showIcon = true,
  disabled = false,
  existingPdfUrl,
  onSuccess,
  onError,
}: PDFGenerationButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(existingPdfUrl || null);

  // Get default button text based on record type
  const getDefaultButtonText = () => {
    if (generatedPdfUrl) {
      return 'Download PDF';
    }
    switch (recordType) {
      case 'capstone':
        return 'Generate Project Summary';
      case 'partner':
        return 'Generate Project Brief';
      case 'assessment':
        return 'Generate Assessment Report';
      case 'certificate':
        return 'Generate Certificate';
      case 'trailbuild':
        return 'Generate Team Summary';
      default:
        return 'Generate PDF';
    }
  };

  const displayText = buttonText || getDefaultButtonText();

  // Get default file name based on record type
  const getDefaultFileName = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    switch (recordType) {
      case 'capstone':
        return `Capstone_Project_Summary_${timestamp}.pdf`;
      case 'partner':
        return `Partner_Project_Brief_${timestamp}.pdf`;
      case 'assessment':
        return `Assessment_Report_${timestamp}.pdf`;
      case 'certificate':
        return `Certificate_of_Completion_${timestamp}.pdf`;
      case 'trailbuild':
        return `TrailBuild_Team_Summary_${timestamp}.pdf`;
      default:
        return `Document_${timestamp}.pdf`;
    }
  };

  const displayFileName = fileName || getDefaultFileName();

  // Simulate PDF generation (in production, this calls Salesforce Flow/Apex)
  const handleGeneratePDF = async () => {
    setIsGenerating(true);

    try {
      // In production Salesforce:
      // 1. Call Apex method or Screen Flow
      // 2. Apex/Flow renders Visualforce page to PDF
      // 3. Creates ContentVersion record
      // 4. Returns ContentVersion public URL
      
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock PDF URL (in production, this comes from Salesforce)
      const mockPdfUrl = `/sfc/servlet.shepherd/version/download/${recordId}`;
      
      setGeneratedPdfUrl(mockPdfUrl);
      setIsGenerating(false);

      toast.success('PDF generated successfully!', {
        description: `${displayFileName} is ready to download.`,
      });

      if (onSuccess) {
        onSuccess(mockPdfUrl);
      }
    } catch (error) {
      setIsGenerating(false);
      const errorMessage = 'Failed to generate PDF. Please try again.';
      
      toast.error('PDF Generation Failed', {
        description: errorMessage,
      });

      if (onError) {
        onError(errorMessage);
      }
    }
  };

  // If PDF already exists, show download button
  if (generatedPdfUrl) {
    return (
      <div className="space-y-2">
        <a
          href={generatedPdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center space-x-2 rounded-lg transition-colors ${
            size === 'sm' ? 'px-3 py-1.5 text-sm' :
            size === 'lg' ? 'px-6 py-3 text-base' :
            'px-4 py-2 text-sm'
          } ${
            variant === 'primary' ? 'bg-[#2C6975] text-white hover:bg-[#234d56]' :
            variant === 'secondary' ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' :
            'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
          }`}
        >
          {showIcon && <Download className="w-4 h-4" />}
          <span>Download PDF</span>
          <CheckCircle className="w-4 h-4 text-green-500" />
        </a>
        <button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className="text-xs text-[#2C6975] hover:underline flex items-center space-x-1"
        >
          <span>Regenerate PDF</span>
        </button>
      </div>
    );
  }

  // Generate PDF button
  return (
    <button
      onClick={handleGeneratePDF}
      disabled={disabled || isGenerating}
      className={`inline-flex items-center justify-center space-x-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        size === 'sm' ? 'px-3 py-1.5 text-sm' :
        size === 'lg' ? 'px-6 py-3 text-base' :
        'px-4 py-2 text-sm'
      } ${
        variant === 'primary' ? 'bg-[#2C6975] text-white hover:bg-[#234d56]' :
        variant === 'secondary' ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' :
        'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
      }`}
      aria-label={displayText}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          {showIcon && <FileText className="w-4 h-4" />}
          <span>{displayText}</span>
        </>
      )}
    </button>
  );
}

/**
 * =============================================================================
 * PDF PREVIEW CARD COMPONENT
 * =============================================================================
 * Shows a card with PDF metadata and actions
 */

interface PDFPreviewCardProps {
  recordId: string;
  recordType: 'capstone' | 'partner' | 'assessment' | 'certificate' | 'trailbuild';
  title: string;
  description?: string;
  existingPdfUrl?: string;
  generatedDate?: string;
  fileSize?: string;
  onGenerate?: () => void;
}

export function PDFPreviewCard({
  recordId,
  recordType,
  title,
  description,
  existingPdfUrl,
  generatedDate,
  fileSize,
  onGenerate,
}: PDFPreviewCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-red-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-gray-900 mb-1">{title}</h4>
          {description && (
            <p className="text-sm text-gray-600 mb-2">{description}</p>
          )}
          {existingPdfUrl && (
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              {generatedDate && (
                <span>Generated {generatedDate}</span>
              )}
              {fileSize && (
                <span>• {fileSize}</span>
              )}
            </div>
          )}
        </div>
        {existingPdfUrl && (
          <Badge variant="outline" className="text-xs text-green-600 border-green-600">
            Generated
          </Badge>
        )}
      </div>

      <PDFGenerationButton
        recordId={recordId}
        recordType={recordType}
        existingPdfUrl={existingPdfUrl}
        variant="outline"
        size="md"
        onSuccess={onGenerate}
      />

      {!existingPdfUrl && (
        <p className="mt-3 text-xs text-gray-500">
          💡 This PDF will include the Transition Trails branding and a complete summary of your {recordType} project.
        </p>
      )}
    </div>
  );
}

/**
 * =============================================================================
 * USAGE EXAMPLES
 * =============================================================================
 * 
 * 1. Capstone Project Summary:
 * ```tsx
 * <PDFGenerationButton
 *   recordId={project.id}
 *   recordType="capstone"
 *   fileName={`Capstone_${learner.name}.pdf`}
 *   variant="primary"
 *   size="md"
 *   onSuccess={(pdfUrl) => console.log('PDF generated:', pdfUrl)}
 * />
 * ```
 * 
 * 2. Assessment Report with Preview Card:
 * ```tsx
 * <PDFPreviewCard
 *   recordId={assessment.id}
 *   recordType="assessment"
 *   title="Bi-Weekly Assessment Report"
 *   description="Technical and soft skills evaluation for Week 6"
 *   existingPdfUrl={assessment.latestPdfUrl}
 *   generatedDate="2 days ago"
 *   fileSize="245 KB"
 * />
 * ```
 * 
 * 3. TrailBuild Team Submission:
 * ```tsx
 * <PDFGenerationButton
 *   recordId={team.id}
 *   recordType="trailbuild"
 *   buttonText="Generate Final Submission PDF"
 *   variant="primary"
 *   size="lg"
 *   showIcon={true}
 * />
 * ```
 * 
 * 4. Certificate of Completion:
 * ```tsx
 * <PDFGenerationButton
 *   recordId={trail.id}
 *   recordType="certificate"
 *   fileName={`Certificate_${learner.name}.pdf`}
 *   variant="secondary"
 *   onSuccess={(pdfUrl) => {
 *     // Share on LinkedIn
 *     shareToLinkedIn(pdfUrl);
 *   }}
 * />
 * ```
 * 
 * =============================================================================
 * SALESFORCE IMPLEMENTATION NOTES
 * =============================================================================
 * 
 * LWC Component: <c-pdf-generation-button>
 * 
 * Properties:
 * @api recordId (String) - Required
 * @api recordType (String) - Required
 * @api variant (String) - Optional
 * @api size (String) - Optional
 * 
 * Apex Controller: PDFGenerationController.cls
 * ```apex
 * @AuraEnabled
 * public static String generateProjectPDF(Id recordId, String recordType) {
 *     // 1. Query record data
 *     // 2. Render Visualforce page to PDF (PageReference.getContentAsPDF())
 *     // 3. Create ContentVersion
 *     // 4. Link to parent record
 *     // 5. Send email with attachment
 *     // 6. Return ContentVersion download URL
 * }
 * ```
 * 
 * Visualforce Page: CapstoneProjectPDF.page
 * ```html
 * <apex:page renderAs="pdf" standardController="Project__c">
 *   <style>
 *     @page { margin: 1in; }
 *     .header { border-bottom: 2px solid #2C6975; }
 *   </style>
 *   <div class="header">
 *     <apex:image url="{!$Resource.TransitionTrailsLogo}" />
 *     <h1>{!Project__c.Name}</h1>
 *   </div>
 *   <div class="content">
 *     <p>{!Project__c.Description__c}</p>
 *   </div>
 * </apex:page>
 * ```
 * 
 * Flow: Generate_Capstone_PDF
 * Steps:
 * 1. Get Record (Project__c by Id)
 * 2. Apex Action: PDFGenerationController.generateProjectPDF
 * 3. Update Project__c.Latest_PDF__c = {ContentVersion.Id}
 * 4. Send Email (with PDF attachment)
 * 5. Show success message
 * 
 * =============================================================================
 */
