import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Calendar, Award, ListChecks, FileCheck, Clock, User } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const getProjectProgress = () => {
    const steps = [
      user.projectProgress.step1,
      user.projectProgress.step2,
      user.projectProgress.step3
    ];
    
    const approvedSteps = steps.filter(step => step === 'approved').length;
    const percentage = Math.round((approvedSteps / steps.length) * 100);
    
    return {
      percentage,
      approvedSteps,
      totalSteps: steps.length
    };
  };
  
  const progress = getProjectProgress();
  const daysActivePercentage = Math.round((user.daysActive / 30) * 100);
  const canGetCertificate = progress.percentage === 100 && user.daysActive >= 30;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <User size={20} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-2"><path d="M22 10.5V12c0 5-3.5 7.5-8 7.5h-2c-4.5 0-8-2.5-8-7.5V10l3-6 3.5 1L12 3l2.5 2L18 4l4 6.5z"/><path d="M6 10.5V15c0 .9.7 1.5 1.5 1.5s1.5-.6 1.5-1.5v-2a1.5 1.5 0 1 1 3 0v2c0 .9.7 1.5 1.5 1.5s1.5-.6 1.5-1.5v-4.5"/></svg>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              {user.college && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-2"><path d="m2 22 10-10"/><path d="m16 8-1.9-1.9"/><path d="M2 12h2"/><path d="M19 15.5V22"/><path d="M22 9.2c0-1.5-1.3-2.8-2.8-2.8-1.3 0-2.4.9-2.7 2.1"/><path d="M3 5.5V2"/><path d="M7.5 6.1a4.1 4.1 0 0 1 7.3-2.3"/><path d="M21 16a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v6h8v-6z"/><path d="M3 10a2 2 0 0 0 2-2c0-1.1-1-2-2-2a2 2 0 0 0-2 2c0 1 1 2 2 2z"/></svg>
                  <div>
                    <p className="text-sm text-gray-500">College</p>
                    <p className="font-medium">{user.college}</p>
                  </div>
                </div>
              )}
              {user.linkedin && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  <div>
                    <p className="text-sm text-gray-500">LinkedIn</p>
                    <p className="font-medium">
                      <a href={`https://${user.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {user.linkedin}
                      </a>
                    </p>
                  </div>
                </div>
              )}
              <Link to="/dashboard">
                <Button variant="outline" fullWidth className="mt-4">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Project Progress Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall progress</span>
                  <span className="font-medium">{progress.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500">
                  {progress.approvedSteps} of {progress.totalSteps} steps approved
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ListChecks size={20} className="text-blue-600" />
                    <h3 className="font-medium">Step 1</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Project Setup</p>
                  <div className={`text-sm font-medium px-2 py-1 rounded-full inline-block ${
                    user.projectProgress.step1 === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : user.projectProgress.step1 === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : user.projectProgress.step1 === 'submitted'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.projectProgress.step1.charAt(0).toUpperCase() + user.projectProgress.step1.slice(1)}
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileCheck size={20} className="text-blue-600" />
                    <h3 className="font-medium">Step 2</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Implementation</p>
                  <div className={`text-sm font-medium px-2 py-1 rounded-full inline-block ${
                    user.projectProgress.step2 === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : user.projectProgress.step2 === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : user.projectProgress.step2 === 'submitted'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.projectProgress.step2.charAt(0).toUpperCase() + user.projectProgress.step2.slice(1)}
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award size={20} className="text-blue-600" />
                    <h3 className="font-medium">Step 3</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Final Submission</p>
                  <div className={`text-sm font-medium px-2 py-1 rounded-full inline-block ${
                    user.projectProgress.step3 === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : user.projectProgress.step3 === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : user.projectProgress.step3 === 'submitted'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.projectProgress.step3.charAt(0).toUpperCase() + user.projectProgress.step3.slice(1)}
                  </div>
                </div>
              </div>
              
              <Link to="/dashboard/project">
                <Button fullWidth>
                  View Project Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Activity Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar size={20} className="text-gray-500 mr-2" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Active Days</p>
                  <div className="flex items-center">
                    <span className="font-medium">{user.daysActive} / 30 Days</span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({daysActivePercentage}% Complete)
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${daysActivePercentage}%` }}
                ></div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Activity Reminder</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        Remember to log in daily and make progress on your project to complete the activity requirement for certification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Certificate Card */}
        <Card>
          <CardHeader>
            <CardTitle>Certificate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
                <Award size={64} className={`mx-auto mb-4 ${canGetCertificate ? 'text-yellow-500' : 'text-gray-400'}`} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {canGetCertificate 
                    ? 'Certificate Ready!'
                    : 'Complete all requirements to earn your certificate'}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {canGetCertificate
                    ? 'Congratulations! You have completed all the requirements for your internship certificate.'
                    : `You need to complete all project steps and be active for 30 days to qualify for a certificate.`}
                </p>
                
                <Link to="/dashboard/certificate">
                  <Button 
                    fullWidth
                    disabled={!canGetCertificate}
                  >
                    {user.paymentCompleted
                      ? 'View Certificate'
                      : 'Get Certificate'}
                  </Button>
                </Link>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Certificate Benefits</h3>
                    <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                      <li>Validates your skills to employers</li>
                      <li>Add to your LinkedIn profile</li>
                      <li>Includes detailed project accomplishments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;