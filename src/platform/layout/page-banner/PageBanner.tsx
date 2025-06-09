import './page-banner.css';

import PageBannerActions from './page-banner-actions/PageBannerActions';

interface Props {
  headerLabel?: string;
}

export const PageBanner = ({ headerLabel }: Props) => {
  return (
    <div className="container mx-auto px-4">
      <header className="-mx-4 -mt-8 mb-8 bg-blue-600 text-white p-8 page-banner">
        <h1 className="text-3xl font-bold">{headerLabel}</h1>
        <p className="text-blue-100">Page description</p>
        <PageBannerActions />
      </header>
    </div>
  );
};
