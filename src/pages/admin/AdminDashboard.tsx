import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Users, Award, FileCheck, DollarSign } from 'lucide-react';

// Mock data
const stats = {
  totalUsers: 124,
  activeUsers: 87,
  pendingApprovals: 15,
  certificationsPurchased: 62,
  revenue: 3038
};

const recentActivities = [
  { id: 1, type: 'user_registered', name: 'Emily Johnson', date: '2 hours ago' },
  { id: 2, type: 'submission_approval', name: 'Michael Smith', stepNumber: 2, date: '4 hours ago' },
  { id: 3, type: 'certificate_purchased', name: 'James Wilson', date: '1 day ago' },
  { id: 4, type: 'submission_rejection', name: 'Sarah Brown', stepNumber: 3, date: '1 day ago' },
  { id: 5, type: 'user_registered', name: 'David Miller', date: '2 days ago' }
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 mr-4">
                <Users size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-green-600">+12%</span> from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 mr-4">
                <FileCheck size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <h3 className="text-2xl font-bold">{stats.pendingApprovals}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-yellow-600">+5</span> new submissions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-purple-100 mr-4">
                <Award size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Certifications</p>
                <h3 className="text-2xl font-bold">{stats.certificationsPurchased}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-green-600">+18%</span> from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-yellow-100 mr-4">
                <DollarSign size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <h3 className="text-2xl font-bold">${stats.revenue}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-green-600">+24%</span> from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className={`p-2 rounded-full mr-4 ${
                    activity.type === 'user_registered'
                      ? 'bg-blue-100'
                      : activity.type === 'submission_approval'
                      ? 'bg-green-100'
                      : activity.type === 'certificate_purchased'
                      ? 'bg-purple-100'
                      : 'bg-red-100'
                  }`}>
                    {activity.type === 'user_registered' && <Users size={16} className="text-blue-600" />}
                    {activity.type === 'submission_approval' && <FileCheck size={16} className="text-green-600" />}
                    {activity.type === 'certificate_purchased' && <Award size={16} className="text-purple-600" />}
                    {activity.type === 'submission_rejection' && <FileCheck size={16} className="text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-600">
                      {activity.type === 'user_registered' && 'Registered a new account'}
                      {activity.type === 'submission_approval' && `Step ${activity.stepNumber} submission was approved`}
                      {activity.type === 'certificate_purchased' && 'Purchased a certificate'}
                      {activity.type === 'submission_rejection' && `Step ${activity.stepNumber} submission was rejected`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="outline">View All Activities</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/admin/users">
              <Button variant="outline" fullWidth className="justify-start">
                <Users size={16} className="mr-2" />
                Manage Users
              </Button>
            </Link>
            <Link to="/admin/projects">
              <Button variant="outline" fullWidth className="justify-start">
                <FileCheck size={16} className="mr-2" />
                Review Submissions
              </Button>
            </Link>
            <Button variant="outline" fullWidth className="justify-start">
              <Award size={16} className="mr-2" />
              Manage Certificates
            </Button>
            <Button variant="outline" fullWidth className="justify-start">
              <DollarSign size={16} className="mr-2" />
              View Financial Reports
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300">
              <p className="text-gray-500">User engagement chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300">
              <p className="text-gray-500">Revenue trends chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;