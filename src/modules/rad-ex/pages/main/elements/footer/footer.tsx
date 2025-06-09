import type { JSX } from 'react';
import './footer.css';

const RadExFooter = (): JSX.Element => {
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <span className="copyright">© David H {year}</span>
    </div>
  );
};

export default RadExFooter;
