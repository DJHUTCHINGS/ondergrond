import type { JSX } from 'react';
// import './nav-bar.css';

//@TODO - Turn this into a reusable slot for page-level buttons in banner

const PageBannerActions = (): JSX.Element => {
  return (
    <div className="nav-button">
      {/* Note that the classname test allows this to be turned off */}
      <h4 className="test">About</h4>
    </div>
  );
};

export default PageBannerActions;
