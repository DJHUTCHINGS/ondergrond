import type { JSX } from 'react';
import { Routes, Route } from 'react-router-dom';
import OndergrondHome from '../pages/home/Home';
import About from '../pages/about/About';
import NotFound from '../not-found/NotFound';

export const OndergrondRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<OndergrondHome />} />
      <Route path="/about" element={<About />} />
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
