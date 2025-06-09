import type { JSX } from 'react';
// import './main.css';
import RadExInputField from '../input-field/input-field';
import RadExSampleText from '../sample-text/sample-text';

const RadExMainContent = (): JSX.Element => {
  return (
    <div className="main">
      <RadExInputField />
      <RadExSampleText />
    </div>
  );
};

export default RadExMainContent;
