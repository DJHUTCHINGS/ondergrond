import { LinkTo } from '../../shared/ui/link/LinkTo';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4">
      <div className="text-center space-y-8">
        {/* Large Flag Icon */}
        <div className="flex justify-center">
          <img
            src="/ondergrond-flag.svg"
            alt="Ondergrond Flag"
            className="h-32 w-auto opacity-75"
          />
        </div>

        {/* 404 Message */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Looks like this page has gone underground. <br />
            Let's get you back to the surface.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LinkTo href="/" label="Go Home" variant="primary-button" />
          <LinkTo href="/about" label="Learn More" variant="normal-button" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
