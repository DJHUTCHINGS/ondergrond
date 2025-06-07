import ReactGA from 'react-ga4';

const TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

export const initGA = () => {
  if (TRACKING_ID && import.meta.env.PROD) {
    ReactGA.initialize(TRACKING_ID);
    console.log('Google Analytics initialized');
  } else {
    console.log(
      'Google Analytics not initialized (development mode or missing tracking ID)'
    );
  }
};

export const trackPageView = (path: string, title?: string) => {
  if (TRACKING_ID && import.meta.env.PROD) {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: title,
    });
  }
};

export const trackEvent = (
  action: string,
  category: string,
  label?: string
) => {
  if (TRACKING_ID && import.meta.env.PROD) {
    ReactGA.event({
      action,
      category,
      label,
    });
  }
};
