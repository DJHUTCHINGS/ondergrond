import { type ReactNode } from 'react';
import TopNavigation from './TopNavigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50" data-testid="layout">
      <TopNavigation />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;
