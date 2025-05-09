import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import UserDashboard from '../pages/dashboard/UserDashboard';
import ProjectSteps from '../pages/dashboard/ProjectSteps';
import Certificate from '../pages/dashboard/Certificate';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import ProjectManagement from '../pages/admin/ProjectManagement';
import PageNotFound from '../pages/PageNotFound';

// Protected route component
interface ProtectedRouteProps {
  element: React.ReactNode;
  allowedRoles?: Array<'user' | 'admin'>;
}

const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return <>{element}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Redirect to appropriate dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated && user && (location.pathname === '/login' || location.pathname === '/register')) {
      // Redirect to appropriate dashboard based on role
      window.location.href = user.role === 'admin' ? '/admin' : '/dashboard';
    }
  }, [isAuthenticated, user, location.pathname]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* User routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute
          element={<DashboardLayout />}
          allowedRoles={['user']}
        />
      }>
        <Route index element={<UserDashboard />} />
        <Route path="project" element={<ProjectSteps />} />
        <Route path="certificate" element={<Certificate />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={
        <ProtectedRoute
          element={<DashboardLayout />}
          allowedRoles={['admin']}
        />
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="projects" element={<ProjectManagement />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;