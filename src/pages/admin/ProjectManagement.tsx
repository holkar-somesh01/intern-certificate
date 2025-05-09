import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toaster';
import { Search, Filter, CheckCircle, XCircle, User, FileText, ExternalLink } from 'lucide-react';

// Mock submissions data
const mockSubmissions = [
  {
    id: '1',
    userId: '1',
    userName: 'Emily Johnson',
    userEmail: 'emily.johnson@example.com',
    step: 'step3',
    stepName: 'Final Submission',
    fileUrl: 'https://drive.google.com/file/d/example1',
    projectUrl: 'https://github.com/emilyjohnson/project',
    submittedDate: '2025-03-20T15:30:00Z',
    status: 'submitted',
    notes: 'Here is my final project submission with all requirements implemented.'
  },
  {
    id: '2',
    userId: '3',
    userName: 'Sarah Brown',
    userEmail: 'sarah.brown@example.com',
    step: 'step2',
    stepName: 'Implementation',
    fileUrl: 'https://drive.google.com/file/d/example2',
    projectUrl: 'https://github.com/sarahbrown/portfolio',
    submittedDate: '2025-03-19T10:15:00Z',
    status: 'submitted',
    notes: 'I\'ve implemented all the core features as requested.'
  },
  {
    id: '3',
    userId: '5',
    userName: 'Jessica Martinez',
    userEmail: 'jessica.martinez@example.com',
    step: 'step2',
    stepName: 'Implementation',
    fileUrl: 'https://drive.google.com/file/d/example3',
    projectUrl: 'https://github.com/jessicam/portfolio-project',
    submittedDate: '2025-03-18T14:45:00Z',
    status: 'submitted',
    notes: 'Please review my implementation of the main features.'
  },
  {
    id: '4',
    userId: '6',
    userName: 'Daniel Lee',
    userEmail: 'daniel.lee@example.com',
    step: 'step1',
    stepName: 'Project Setup',
    fileUrl: 'https://drive.google.com/file/d/example4',
    projectUrl: 'https://github.com/daniellee/portfolio',
    submittedDate: '2025-03-21T09:30:00Z',
    status: 'submitted',
    notes: 'Initial project setup completed as per requirements.'
  },
  {
    id: '5',
    userId: '7',
    userName: 'Amanda Clark',
    userEmail: 'amanda.clark@example.com',
    step: 'step3',
    stepName: 'Final Submission',
    fileUrl: 'https://drive.google.com/file/d/example5',
    projectUrl: 'https://github.com/amandac/portfolio-complete',
    submittedDate: '2025-03-17T16:00:00Z',
    status: 'submitted',
    notes: 'Final project with all features implemented and documentation.'
  }
];

const ProjectManagement = () => {
  const { showToast } = useToast();
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStep, setFilterStep] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [feedbackText, setFeedbackText] = useState('');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (step: string) => {
    setFilterStep(step);
  };
  
  const openSubmissionModal = (submission: any) => {
    setSelectedSubmission(submission);
    setFeedbackText('');
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
    setFeedbackText('');
  };
  
  const approveSubmission = () => {
    if (!selectedSubmission) return;
    
    // Update submission in state
    setSubmissions(
      submissions.map(s => 
        s.id === selectedSubmission.id 
          ? { ...s, status: 'approved' }
          : s
      )
    );
    
    showToast(`Submission by ${selectedSubmission.userName} has been approved!`, 'success');
    closeModal();
  };
  
  const rejectSubmission = () => {
    if (!selectedSubmission || !feedbackText) return;
    
    // Update submission in state
    setSubmissions(
      submissions.map(s => 
        s.id === selectedSubmission.id 
          ? { ...s, status: 'rejected', feedback: feedbackText }
          : s
      )
    );
    
    showToast(`Submission by ${selectedSubmission.userName} has been rejected with feedback.`, 'error');
    closeModal();
  };
  
  const filteredSubmissions = submissions.filter(submission => {
    // Search filter
    const matchesSearch = 
      submission.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Step filter
    const matchesStep = filterStep === 'all' || submission.step === filterStep;
    
    return matchesSearch && matchesStep;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={filterStep === 'all' ? 'primary' : 'outline'}
                onClick={() => handleFilterChange('all')}
              >
                All
              </Button>
              <Button
                variant={filterStep === 'step1' ? 'primary' : 'outline'}
                onClick={() => handleFilterChange('step1')}
              >
                Step 1
              </Button>
              <Button
                variant={filterStep === 'step2' ? 'primary' : 'outline'}
                onClick={() => handleFilterChange('step2')}
              >
                Step 2
              </Button>
              <Button
                variant={filterStep === 'step3' ? 'primary' : 'outline'}
                onClick={() => handleFilterChange('step3')}
              >
                Step 3
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="border rounded-lg overflow-hidden hover:border-blue-300 transition-colors cursor-pointer"
                onClick={() => openSubmissionModal(submission)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{submission.userName}</h3>
                      <p className="text-sm text-gray-500">{submission.userEmail}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        submission.step === 'step1'
                          ? 'bg-blue-100 text-blue-800'
                          : submission.step === 'step2'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {submission.stepName}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 line-clamp-2">{submission.notes}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Submitted: {formatDate(submission.submittedDate)}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex items-center">
                        <FileText size={14} className="mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredSubmissions.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">No submissions found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Submission Details Modal */}
      {isModalOpen && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Submission Details</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-medium text-gray-900">{selectedSubmission.userName}</div>
                    <div className="text-sm text-gray-500">{selectedSubmission.userEmail}</div>
                  </div>
                  <div className="ml-auto">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedSubmission.step === 'step1'
                        ? 'bg-blue-100 text-blue-800'
                        : selectedSubmission.step === 'step2'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {selectedSubmission.stepName}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Submission Date</p>
                    <p className="text-sm text-gray-600">{formatDate(selectedSubmission.submittedDate)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Student Notes</p>
                    <p className="text-sm text-gray-600">{selectedSubmission.notes}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Project Files</p>
                      <a
                        href={selectedSubmission.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        View Files
                      </a>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700">Project Repository</p>
                      <a
                        href={selectedSubmission.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        View GitHub Repository
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                  Feedback (required for rejection)
                </label>
                <textarea
                  id="feedback"
                  rows={4}
                  placeholder="Provide feedback for the student..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={rejectSubmission}
                  disabled={!feedbackText}
                  className="flex items-center"
                >
                  <XCircle size={16} className="mr-1" />
                  Reject
                </Button>
                <Button
                  onClick={approveSubmission}
                  className="flex items-center"
                >
                  <CheckCircle size={16} className="mr-1" />
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;