import { useState } from 'react';
import { ArrowLeft, Send, X, AlertCircle, HelpCircle, Tag, Code, Image, Link as LinkIcon } from 'lucide-react';
import { PageType } from '../App';
import { SectionHeader } from './SectionHeader';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';

interface ForumEditorProps {
  mode: 'thread' | 'reply';
  threadTitle?: string;
  onCancel: () => void;
  onSubmit: (data: ThreadData | ReplyData) => void;
  onNavigate: (page: PageType) => void;
}

interface ThreadData {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

interface ReplyData {
  content: string;
}

const categories = [
  { id: 'learning', name: 'Learning & Courses', icon: '📚' },
  { id: 'projects', name: 'Capstone Projects', icon: '🏗️' },
  { id: 'career', name: 'Career & Jobs', icon: '💼' },
  { id: 'technical', name: 'Technical Help', icon: '⚙️' },
  { id: 'general', name: 'General Discussion', icon: '💬' },
];

const suggestedTags = [
  'apex',
  'lwc',
  'admin',
  'developer',
  'testing',
  'deployment',
  'certification',
  'soql',
  'triggers',
  'flows',
  'validation-rules',
  'formulas',
  'reports',
  'dashboards',
  'security',
  'integration',
  'lightning',
  'visualforce',
  'javascript',
  'capstone',
  'career',
  'interview',
  'job-search',
  'networking',
  'portfolio',
];

export function ForumEditor({ mode, threadTitle, onCancel, onSubmit, onNavigate }: ForumEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (mode === 'thread') {
      if (!title.trim()) {
        newErrors.title = 'Title is required';
      } else if (title.length < 15) {
        newErrors.title = 'Title must be at least 15 characters';
      } else if (title.length > 150) {
        newErrors.title = 'Title must be less than 150 characters';
      }

      if (!category) {
        newErrors.category = 'Please select a category';
      }

      if (tags.length === 0) {
        newErrors.tags = 'Add at least one tag';
      } else if (tags.length > 5) {
        newErrors.tags = 'Maximum 5 tags allowed';
      }
    }

    if (!content.trim()) {
      newErrors.content = mode === 'thread' ? 'Question content is required' : 'Answer content is required';
    } else if (content.length < 30) {
      newErrors.content = 'Please provide more detail (at least 30 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (mode === 'thread') {
      onSubmit({
        title,
        content,
        category,
        tags,
      } as ThreadData);
    } else {
      onSubmit({
        content,
      } as ReplyData);
    }
  };

  const handleAddTag = (tag: string) => {
    const cleanTag = tag.trim().toLowerCase().replace(/\s+/g, '-');
    if (cleanTag && !tags.includes(cleanTag) && tags.length < 5) {
      setTags([...tags, cleanTag]);
      setTagInput('');
      setShowTagSuggestions(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const filteredSuggestions = suggestedTags.filter(
    (tag) =>
      tag.toLowerCase().includes(tagInput.toLowerCase()) &&
      !tags.includes(tag) &&
      tagInput.length > 0
  );

  return (
    <div className="min-h-screen bg-[#F5F3E8] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancel
          </button>

          <SectionHeader
            icon={mode === 'thread' ? HelpCircle : Send}
            title={mode === 'thread' ? 'Ask a Question' : 'Write Your Answer'}
            subtitle={
              mode === 'thread'
                ? 'Get help from the community by asking a clear, detailed question'
                : `Answering: ${threadTitle}`
            }
            color="#2C6975"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guidelines */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Writing Tips:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                {mode === 'thread' ? (
                  <>
                    <li>Make your title specific and descriptive</li>
                    <li>Include relevant code snippets or error messages</li>
                    <li>Explain what you've already tried</li>
                    <li>Add appropriate tags to help others find your question</li>
                  </>
                ) : (
                  <>
                    <li>Provide a clear, step-by-step explanation</li>
                    <li>Include code examples when relevant</li>
                    <li>Explain why your solution works</li>
                    <li>Be respectful and encouraging</li>
                  </>
                )}
              </ul>
            </AlertDescription>
          </Alert>

          {/* Thread-only fields */}
          {mode === 'thread' && (
            <>
              {/* Title */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <Label htmlFor="title" className="text-gray-900 mb-2 block">
                  Question Title *
                </Label>
                <p className="text-sm text-gray-600 mb-3">
                  Be specific and imagine you're asking a question to another person
                </p>
                <Input
                  id="title"
                  placeholder="e.g., How do I debug Apex trigger test failures?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-2">{errors.title}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {title.length}/150 characters
                </p>
              </div>

              {/* Category */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <Label className="text-gray-900 mb-2 block">Category *</Label>
                <p className="text-sm text-gray-600 mb-3">
                  Choose the most relevant category for your question
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        category === cat.id
                          ? 'border-[#2C6975] bg-[#2C697510]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-gray-900">{cat.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.category && (
                  <p className="text-red-600 text-sm mt-2">{errors.category}</p>
                )}
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <Label className="text-gray-900 mb-2 block">Tags *</Label>
                <p className="text-sm text-gray-600 mb-3">
                  Add up to 5 tags to describe your question (e.g., apex, testing, triggers)
                </p>

                {/* Selected Tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-3 py-1 text-sm"
                        style={{
                          backgroundColor: '#2C697515',
                          color: '#2C6975',
                        }}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Tag Input */}
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Type a tag and press Enter"
                        value={tagInput}
                        onChange={(e) => {
                          setTagInput(e.target.value);
                          setShowTagSuggestions(true);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag(tagInput);
                          }
                        }}
                        className="pl-10"
                        disabled={tags.length >= 5}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleAddTag(tagInput)}
                      disabled={!tagInput.trim() || tags.length >= 5}
                    >
                      Add
                    </Button>
                  </div>

                  {/* Tag Suggestions */}
                  {showTagSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {filteredSuggestions.slice(0, 10).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleAddTag(tag)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-gray-700"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {errors.tags && (
                  <p className="text-red-600 text-sm mt-2">{errors.tags}</p>
                )}
              </div>
            </>
          )}

          {/* Content */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <Label htmlFor="content" className="text-gray-900 mb-2 block">
              {mode === 'thread' ? 'Question Details *' : 'Your Answer *'}
            </Label>
            <p className="text-sm text-gray-600 mb-3">
              {mode === 'thread'
                ? 'Provide all the details. Include code snippets, error messages, and what you\'ve tried.'
                : 'Share your knowledge and help solve the problem. Be clear and detailed.'}
            </p>

            {/* Formatting Toolbar */}
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded text-gray-600"
                title="Add code block"
                onClick={() => {
                  const codeBlock = '\n```\n// Your code here\n```\n';
                  setContent(content + codeBlock);
                }}
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded text-gray-600"
                title="Add link"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded text-gray-600"
                title="Add image"
              >
                <Image className="w-4 h-4" />
              </button>
            </div>

            <textarea
              id="content"
              rows={12}
              placeholder={
                mode === 'thread'
                  ? "Include:\n• What you're trying to accomplish\n• What you've tried so far\n• Error messages or unexpected behavior\n• Relevant code snippets"
                  : 'Write a helpful, detailed answer...'
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975] font-mono text-sm ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.content && (
              <p className="text-red-600 text-sm mt-2">{errors.content}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              {content.length} characters • Markdown supported
            </p>
          </div>

          {/* Preview */}
          {content && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Preview</h3>
              <div className="prose prose-sm max-w-none border-t border-gray-200 pt-4">
                <div className="whitespace-pre-wrap text-gray-700">{content}</div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-[#2C6975] hover:bg-[#235158] text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              {mode === 'thread' ? 'Post Question' : 'Post Answer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
