import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ToastProvider } from '../components/ui/Toaster';

const MainLayout = () => {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
};

export default MainLayout;