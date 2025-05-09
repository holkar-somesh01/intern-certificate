import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Award, 
  Settings, 
  LogOut, 
  ListChecks
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const userLinks = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />
    },
    {
      name: 'Project Steps',
      path: '/dashboard/project',
      icon: <ListChecks size={20} />
    },
    {
      name: 'Certificate',
      path: '/dashboard/certificate',
      icon: <Award size={20} />
    }
  ];

  const adminLinks = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard size={20} />
    },
    {
      name: 'User Management',
      path: '/admin/users',
      icon: <Users size={20} />
    },
    {
      name: 'Project Management',
      path: '/admin/projects',
      icon: <FileText size={20} />
    }
  ];

  const links = user?.role === 'admin' ? adminLinks : userLinks;

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-5 border-b border-gray-800">
        <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="text-xl font-bold text-blue-400">
          InternCert
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                isActive(link.path)
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center px-4 py-3 text-sm text-gray-300">
          <div className="flex-1 truncate">
            <div className="font-medium">{user?.name}</div>
            <div className="text-gray-500 truncate">{user?.email}</div>
          </div>
        </div>
        <div className="mt-3 px-4">
          <Link 
            to="/" 
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            className="flex items-center py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
          >
            <LogOut size={20} className="mr-2" />
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;