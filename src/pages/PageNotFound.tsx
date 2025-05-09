import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mt-4">Page not found</h2>
        <p className="mt-4 text-lg text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button size="lg">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;