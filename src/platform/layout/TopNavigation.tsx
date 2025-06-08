import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { DeploymentStage } from '../../types/deployment-stage';
import { X } from 'lucide-react';

const TopNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const fullUrl = window.location.href;

  const [stage, setStage] = useState<DeploymentStage | undefined>(undefined);

  const [showStage, setShowStage] = useState(true);

  const checkDeployState = useCallback(() => {
    if (fullUrl.includes('localhost')) {
      setStage('localHost');
    } else if (fullUrl.includes('dev')) {
      setStage('dev');
    } else if (fullUrl.includes('staging')) {
      setStage('staging');
    } else {
      setStage(undefined);
    }
  }, [fullUrl]);

  useEffect(() => {
    checkDeployState();
  }, [fullUrl, checkDeployState]);

  return (
    <nav className="bg-white shadow-sm border-b" data-testid="topnav">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/ondergrond-flag.svg"
              alt="Ondergrond Flag"
              className="h-8 w-auto"
            />
            <img
              src="/ondergrond-wordmark.svg"
              alt="Ondergrond"
              className="h-6 w-auto"
            />
          </Link>

          {stage && showStage && (
            <div className="bg-yellow-200 rounded-md px-3 flex items-center">
              <span>{stage}</span>
              <X
                size={16}
                onClick={() => setShowStage(!showStage)}
                className="ml-2"
              />
            </div>
          )}

          <div className="flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
