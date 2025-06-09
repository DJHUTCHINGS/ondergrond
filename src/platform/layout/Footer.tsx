import type { JSX } from 'react';

const OndergrondFooter = (): JSX.Element => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4 mt-8">
      <div className="container mx-auto px-4 text-right text-sm text-gray-600">
        © 2019-{new Date().getFullYear()} David H
      </div>
    </footer>
  );
};

export default OndergrondFooter;
