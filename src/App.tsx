import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './platform/layout/Layout';
import { trackPageView } from './utils/analytics';
import { OndergrondRoutes } from './platform/routes/OndergrondRoutes';
import { AuthProvider } from './shared/auth/AuthProvider';

// Analytics wrapper component that tracks page views
function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    // Track page view whenever the location changes
    trackPageView(location.pathname);
  }, [location]);

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnalyticsWrapper>
          <Layout>
            <OndergrondRoutes />
          </Layout>
        </AnalyticsWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
