import type { JSX } from 'react';
import InputTips from './main-input/input-tips/input-tips';
import { RadExBanner } from './radex-banner/radex-banner';
import RadExSampleText from './sample-text/sample-text';
import RadExInputField from './main-input/input-field/input-field';

export const RadExPage = (): JSX.Element => {
  return (
    <div data-testid="radex-page mt-0">
      <RadExBanner />
      <InputTips />
      <RadExInputField />
      <RadExSampleText />
    </div>
  );
};
