import { X, Send, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';

interface PartnerSubmissionModalProps {
  onClose: () => void;
}

export function PartnerSubmissionModal({ onClose }: PartnerSubmissionModalProps) {
  const [formData, setFormData] = useState({
    projectTitle: '',
    summary: '',
    category: 'Admin',
    skillsNeeded: '',
    duration: '',
    contactName: '',
    contactEmail: '',
    allowSelfOrganize: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl text-gray-900 mb-2">Submission Received!</h2>
          <p className="text-gray-600 mb-6">
            Your project has been submitted for admin review. We'll notify you once it's approved and posted to the Partner Board.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-gray-900 mb-1">Submit Partner Project</h2>
            <p className="text-gray-600">Share a Salesforce project opportunity with learners</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Title */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              required
              placeholder="e.g., Volunteer Management System"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Project Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe the project, its goals, and the impact it will have..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975] resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
            >
              <option value="Admin">Admin</option>
              <option value="Data">Data</option>
              <option value="Integration">Integration</option>
            </select>
          </div>

          {/* Skills Needed */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Skills Needed <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="skillsNeeded"
              value={formData.skillsNeeded}
              onChange={handleChange}
              required
              placeholder="e.g., Flows, Reports, Dashboards (comma-separated)"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
            />
            <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Estimated Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              placeholder="e.g., 4-6 weeks"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Contact Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                placeholder="your.email@partner.org"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
              />
            </div>
          </div>

          {/* Self-Organize Checkbox */}
          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              name="allowSelfOrganize"
              id="allowSelfOrganize"
              checked={formData.allowSelfOrganize}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-[#2C6975] border-gray-300 rounded focus:ring-[#2C6975]"
            />
            <label htmlFor="allowSelfOrganize" className="flex-1 text-sm text-gray-700">
              <strong>Allow learners to self-organize teams</strong>
              <p className="text-xs text-gray-600 mt-1">
                Learners can form their own teams to work on this project without pre-assignment
              </p>
            </label>
          </div>

          {/* Info Badge */}
          <div className="p-4 bg-[#7EB5C1]/10 border border-[#7EB5C1]/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <Briefcase className="w-5 h-5 text-[#2C6975] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  <strong>What happens next?</strong>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Your project will be reviewed by our admin team within 1-2 business days. 
                  Once approved, it will appear on the Partner Board for learners to join.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-all shadow-lg flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Submit for Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
