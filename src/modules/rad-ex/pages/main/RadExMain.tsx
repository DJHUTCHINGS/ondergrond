import type { JSX } from 'react';

import InputTips from './elements/input-tips/input-tips';
import RadExFooter from './elements/footer/footer';
import { RadExHeader } from './elements/header/header';
import RadExMainContent from './elements/main-content/main-content';

export const RadExPage = (): JSX.Element => {
  return (
    <div>
      <RadExHeader />
      <InputTips />
      <RadExMainContent />
      <RadExFooter />
    </div>
  );
};
