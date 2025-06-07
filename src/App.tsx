import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import About from './pages/about/About';
import { trackPageView } from './utils/analytics';

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
    <Router>
      <AnalyticsWrapper>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </AnalyticsWrapper>
    </Router>
  );
}

export default App;
