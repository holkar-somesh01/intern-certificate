import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import { ToastProvider } from '../components/ui/Toaster';

const DashboardLayout = () => {
  const { user } = useAuth();
  
  return (
    <ToastProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
              {user?.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
            </h1>
            <Outlet />
          </div>
        </div>
      </div>
    </ToastProvider>
  );
};

export default DashboardLayout;