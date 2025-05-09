import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toaster';
import { CheckCircle, Clock, AlertCircle, Lock, FileUp, Link as LinkIcon } from 'lucide-react';

type StepStatus = 'pending' | 'submitted' | 'approved' | 'rejected';

interface StepSubmission {
  fileUrl?: string;
  linkUrl?: string;
  notes?: string;
}

const ProjectSteps = () => {
  const { user, updateProjectProgress } = useAuth();
  const { showToast } = useToast();

  const [submissions, setSubmissions] = useState<{
    [key: string]: StepSubmission;
  }>({
    step1: { fileUrl: '', linkUrl: '', notes: '' },
    step2: { fileUrl: '', linkUrl: '', notes: '' },
    step3: { fileUrl: '', linkUrl: '', notes: '' }
  });

  const [isSubmitting, setIsSubmitting] = useState<{
    [key: string]: boolean;
  }>({
    step1: false,
    step2: false,
    step3: false
  });

  if (!user) return null;

  const steps = [
    {
      id: 'step1',
      title: 'Project Setup',
      description: 'Set up your development environment and create the initial project structure.',
      requirements: [
        'Create a GitHub repository for your project',
        'Set up the basic project structure',
        'Install necessary dependencies',
        'Submit the repository link and a screenshot of your setup'
      ],
      status: user.projectProgress.step1
    },
    {
      id: 'step2',
      title: 'Implementation',
      description: 'Implement the core features of your project according to the requirements.',
      requirements: [
        'Implement user authentication',
        'Create the main application screens',
        'Add basic functionality',
        'Submit progress screenshots and repository update'
      ],
      status: user.projectProgress.step2
    },
    {
      id: 'step3',
      title: 'Final Submission',
      description: 'Complete your project and prepare it for final review.',
      requirements: [
        'Complete all required features',
        'Add documentation',
        'Optimize and refactor your code',
        'Submit the final project with a demo video'
      ],
      status: user.projectProgress.step3
    }
  ];

  const handleSubmissionChange = (
    stepId: string,
    field: keyof StepSubmission,
    value: string
  ) => {
    setSubmissions((prev) => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [field]: value
      }
    }));
  };

  const handleSubmit = (stepId: string) => {
    setIsSubmitting((prev) => ({ ...prev, [stepId]: true }));

    // Simulate API call
    setTimeout(() => {
      updateProjectProgress(
        stepId as keyof typeof user.projectProgress,
        'submitted'
      );
      showToast(`${getStepTitle(stepId)} submitted successfully!`, 'success');
      setIsSubmitting((prev) => ({ ...prev, [stepId]: false }));
    }, 1500);
  };

  const getStepTitle = (stepId: string): string => {
    const step = steps.find((s) => s.id === stepId);
    return step ? step.title : '';
  };

  const isStepLocked = (index: number): boolean => {
    if (index === 0) return false;

    const previousStep = steps[index - 1];
    return previousStep.status !== 'approved';
  };

  const getStatusIcon = (status: StepStatus) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'rejected':
        return <AlertCircle size={20} className="text-red-500" />;
      case 'submitted':
        return <Clock size={20} className="text-yellow-500" />;
      default:
        return <Clock size={20} className="text-gray-400" />;
    }
  };

  const getStatusText = (status: StepStatus) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Needs Revision';
      case 'submitted':
        return 'Under Review';
      default:
        return 'Not Started';
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Project: Web Development Portfolio</h2>
        <p className="text-gray-600 mb-6">
          Create a professional portfolio website showcasing your skills, projects, and contact information.
        </p>

        <div className="relative">
          <div className="hidden sm:block absolute top-5 left-5 w-[calc(100%-2.5rem)] h-0.5 bg-gray-200">
            <div
              className="h-0.5 bg-blue-500 transition-all duration-300"
              style={{
                width: `${steps.filter(step => step.status === 'approved').length * 50}%`
              }}
            ></div>
          </div>

          <ol className="relative grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <li key={step.id} className="relative">
                <div className="flex items-center">
                  <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gray-200 shrink-0">
                    {getStatusIcon(step.status)}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="text-sm text-gray-500">{getStatusText(step.status)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const isLocked = isStepLocked(index);

          return (
            <Card key={step.id} className={isLocked ? 'opacity-70' : ''}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    {step.title}
                    {isLocked && <Lock size={16} className="ml-2 text-gray-400" />}
                  </CardTitle>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${step.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : step.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : step.status === 'submitted'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                    {getStatusText(step.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{step.description}</p>

                <div className="mb-6">
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {step.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                {(step.status === 'rejected' || step.status === 'pending') && !isLocked && (
                  <div className="space-y-4 border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="File Upload Link"
                        id={`${step.id}-file`}
                        name={`${step.id}-file`}
                        placeholder="https://drive.google.com/file-path"
                        // icon={<FileUp size={16} />}
                        value={submissions[step.id]?.fileUrl || ''}
                        onChange={(e) => handleSubmissionChange(step.id, 'fileUrl', e.target.value)}
                        disabled={isLocked || step?.status as string === 'submitted'}
                      />

                      <Input
                        label="GitHub/Project Link"
                        id={`${step.id}-link`}
                        name={`${step.id}-link`}
                        placeholder="https://github.com/username/repo"
                        // icon={<LinkIcon size={16} />}
                        value={submissions[step.id]?.linkUrl || ''}
                        onChange={(e) => handleSubmissionChange(step.id, 'linkUrl', e.target.value)}
                        disabled={isLocked || step.status as string === 'submitted'}
                      />
                    </div>

                    <div>
                      <label htmlFor={`${step.id}-notes`} className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      <textarea
                        id={`${step.id}-notes`}
                        name={`${step.id}-notes`}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add any additional information about your submission..."
                        value={submissions[step.id]?.notes || ''}
                        onChange={(e) => handleSubmissionChange(step.id, 'notes', e.target.value)}
                        disabled={isLocked || step.status as string === 'submitted'}
                      ></textarea>
                    </div>
                  </div>
                )}

                {step.status === 'approved' && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Submission Approved</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>
                            Your submission for this step has been approved! You can now proceed to the next step.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step.status === 'submitted' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Clock className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Submission Under Review</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            Your submission is currently being reviewed. You'll receive feedback once the review is complete.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step.status === 'rejected' && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Revision Required</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>
                            Your submission needs improvement. Please review the feedback and resubmit.
                          </p>
                          <p className="mt-2">
                            <strong>Feedback:</strong> Please improve the project structure and add more detailed documentation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              {(step.status === 'rejected' || step.status === 'pending') && !isLocked && (
                <CardFooter>
                  <Button
                    onClick={() => handleSubmit(step.id)}
                    isLoading={isSubmitting[step.id]}
                    disabled={
                      isLocked ||
                      !submissions[step.id]?.fileUrl ||
                      !submissions[step.id]?.linkUrl ||
                      step.status as string === 'submitted'
                    }
                    fullWidth
                  >
                    Submit Step
                  </Button>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectSteps;