import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toaster';
import { User, Search, ChevronDown, Award, CheckCircle, XCircle, Edit, Trash } from 'lucide-react';

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    role: 'user',
    college: 'Stanford University',
    dateJoined: '2025-03-10',
    daysActive: 28,
    progress: {
      step1: 'approved',
      step2: 'approved',
      step3: 'submitted'
    },
    certificateEnabled: false,
    paymentCompleted: false
  },
  {
    id: '2',
    name: 'Michael Smith',
    email: 'michael.smith@example.com',
    role: 'user',
    college: 'MIT',
    dateJoined: '2025-03-05',
    daysActive: 30,
    progress: {
      step1: 'approved',
      step2: 'approved',
      step3: 'approved'
    },
    certificateEnabled: true,
    paymentCompleted: true
  },
  {
    id: '3',
    name: 'Sarah Brown',
    email: 'sarah.brown@example.com',
    role: 'user',
    college: 'UC Berkeley',
    dateJoined: '2025-03-15',
    daysActive: 20,
    progress: {
      step1: 'approved',
      step2: 'rejected',
      step3: 'pending'
    },
    certificateEnabled: false,
    paymentCompleted: false
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    role: 'user',
    college: 'Harvard University',
    dateJoined: '2025-02-28',
    daysActive: 32,
    progress: {
      step1: 'approved',
      step2: 'approved',
      step3: 'approved'
    },
    certificateEnabled: true,
    paymentCompleted: true
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    email: 'jessica.martinez@example.com',
    role: 'user',
    college: 'Georgia Tech',
    dateJoined: '2025-03-12',
    daysActive: 25,
    progress: {
      step1: 'approved',
      step2: 'submitted',
      step3: 'pending'
    },
    certificateEnabled: false,
    paymentCompleted: false
  }
];

const UserManagement = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
  };
  
  const toggleCertificateAccess = (userId: string) => {
    setUsers(
      users.map(user => 
        user.id === userId 
          ? { ...user, certificateEnabled: !user.certificateEnabled }
          : user
      )
    );
    
    const user = users.find(u => u.id === userId);
    if (user) {
      showToast(
        `Certificate access ${user.certificateEnabled ? 'disabled' : 'enabled'} for ${user.name}`, 
        'success'
      );
    }
  };
  
  const openUserDetailsModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  
  const getCompletionPercentage = (progress: any) => {
    const steps = Object.values(progress);
    const approvedSteps = steps.filter(step => step === 'approved').length;
    return Math.round((approvedSteps / steps.length) * 100);
  };
  
  const filteredUsers = users.filter(user => {
    // Search filter
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.college?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    let matchesStatus = true;
    
    if (filterStatus === 'completed') {
      matchesStatus = getCompletionPercentage(user.progress) === 100;
    } else if (filterStatus === 'in-progress') {
      const percentage = getCompletionPercentage(user.progress);
      matchesStatus = percentage > 0 && percentage < 100;
    } else if (filterStatus === 'not-started') {
      matchesStatus = getCompletionPercentage(user.progress) === 0;
    } else if (filterStatus === 'certificate-eligible') {
      matchesStatus = 
        getCompletionPercentage(user.progress) === 100 && 
        user.daysActive >= 30;
    }
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            <div className="relative inline-block text-left">
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="inline-flex justify-between w-full"
                  onClick={() => {}}
                >
                  {filterStatus === 'all' && 'All Users'}
                  {filterStatus === 'completed' && 'Completed'}
                  {filterStatus === 'in-progress' && 'In Progress'}
                  {filterStatus === 'not-started' && 'Not Started'}
                  {filterStatus === 'certificate-eligible' && 'Certificate Eligible'}
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </div>
              
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                  <button
                    className={`block px-4 py-2 text-sm ${
                      filterStatus === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } w-full text-left hover:bg-gray-100`}
                    onClick={() => handleFilterChange('all')}
                  >
                    All Users
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm ${
                      filterStatus === 'completed' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } w-full text-left hover:bg-gray-100`}
                    onClick={() => handleFilterChange('completed')}
                  >
                    Completed
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm ${
                      filterStatus === 'in-progress' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } w-full text-left hover:bg-gray-100`}
                    onClick={() => handleFilterChange('in-progress')}
                  >
                    In Progress
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm ${
                      filterStatus === 'not-started' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } w-full text-left hover:bg-gray-100`}
                    onClick={() => handleFilterChange('not-started')}
                  >
                    Not Started
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm ${
                      filterStatus === 'certificate-eligible' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } w-full text-left hover:bg-gray-100`}
                    onClick={() => handleFilterChange('certificate-eligible')}
                  >
                    Certificate Eligible
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certificate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={20} className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 mb-1">
                        {getCompletionPercentage(user.progress)}% Complete
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${getCompletionPercentage(user.progress)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.daysActive >= 30 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.daysActive} / 30 days
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Button
                          variant={user.certificateEnabled ? 'outline' : 'primary'}
                          size="sm"
                          onClick={() => toggleCertificateAccess(user.id)}
                          className="inline-flex items-center"
                        >
                          {user.certificateEnabled ? (
                            <>
                              <XCircle size={16} className="mr-1" />
                              Disable
                            </>
                          ) : (
                            <>
                              <CheckCircle size={16} className="mr-1" />
                              Enable
                            </>
                          )}
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => openUserDetailsModal(user)}
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No users found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">User Details</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedUser.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedUser.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">College</p>
                      <p className="font-medium">{selectedUser.college}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date Joined</p>
                      <p className="font-medium">{new Date(selectedUser.dateJoined).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Progress</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Step 1 Status</p>
                      <p className={`font-medium ${
                        selectedUser.progress.step1 === 'approved' 
                          ? 'text-green-600' 
                          : selectedUser.progress.step1 === 'rejected'
                          ? 'text-red-600'
                          : selectedUser.progress.step1 === 'submitted'
                          ? 'text-yellow-600'
                          : 'text-gray-600'
                      }`}>
                        {selectedUser.progress.step1.charAt(0).toUpperCase() + selectedUser.progress.step1.slice(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Step 2 Status</p>
                      <p className={`font-medium ${
                        selectedUser.progress.step2 === 'approved' 
                          ? 'text-green-600' 
                          : selectedUser.progress.step2 === 'rejected'
                          ? 'text-red-600'
                          : selectedUser.progress.step2 === 'submitted'
                          ? 'text-yellow-600'
                          : 'text-gray-600'
                      }`}>
                        {selectedUser.progress.step2.charAt(0).toUpperCase() + selectedUser.progress.step2.slice(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Step 3 Status</p>
                      <p className={`font-medium ${
                        selectedUser.progress.step3 === 'approved' 
                          ? 'text-green-600' 
                          : selectedUser.progress.step3 === 'rejected'
                          ? 'text-red-600'
                          : selectedUser.progress.step3 === 'submitted'
                          ? 'text-yellow-600'
                          : 'text-gray-600'
                      }`}>
                        {selectedUser.progress.step3.charAt(0).toUpperCase() + selectedUser.progress.step3.slice(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Days Active</p>
                      <p className="font-medium">{selectedUser.daysActive} / 30</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold mb-4">Certificate Status</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Certificate Access</p>
                    <p className={`font-medium ${selectedUser.certificateEnabled ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedUser.certificateEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                  <Button
                    variant={selectedUser.certificateEnabled ? 'outline' : 'primary'}
                    size="sm"
                    onClick={() => {
                      toggleCertificateAccess(selectedUser.id);
                      setSelectedUser({
                        ...selectedUser,
                        certificateEnabled: !selectedUser.certificateEnabled
                      });
                    }}
                    className="inline-flex items-center"
                  >
                    {selectedUser.certificateEnabled ? (
                      <>
                        <XCircle size={16} className="mr-1" />
                        Disable Access
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} className="mr-1" />
                        Enable Access
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <p className={`font-medium ${selectedUser.paymentCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                    {selectedUser.paymentCompleted ? 'Payment Completed' : 'No Payment Received'}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;