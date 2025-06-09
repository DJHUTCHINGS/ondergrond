import type { JSX } from 'react';
import { Routes, Route } from 'react-router-dom';
import OndergrondHome from '../pages/home/Home';
import About from '../pages/about/About';
import NotFound from '../not-found/NotFound';
import { UnfinishedProjects } from '../pages/projects/Projects';
import { RadExPage } from '../../modules/rad-ex/pages/main/RadExMain';

export const OndergrondRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<OndergrondHome />} />
      <Route path="/about" element={<About />} />
      <Route path="/redacted/radEx" element={<RadExPage />} />
      <Route path="/redacted" element={<UnfinishedProjects />} />

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
