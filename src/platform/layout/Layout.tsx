import { type ReactNode } from 'react';
import TopNavigation from './TopNavigation';
import OndergrondFooter from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50" data-testid="layout">
      <TopNavigation />
      <main className="container mx-auto px-0  pb-8">{children}</main>
      <OndergrondFooter />
    </div>
  );
};

export default Layout;
