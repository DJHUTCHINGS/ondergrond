import type { JSX } from 'react';
import { useState } from 'react';
import './input-field.css';
import InputValidator from '../input-validator/input-validator';

const RadExInputField = (): JSX.Element => {
  const [rawInput, setRawInput] = useState<string>('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // input is cleared of white space
    const rawInputValue = event.target.value.replace(/\s+/g, '');
    setRawInput(rawInputValue);
  };

  return (
    <div className="">
      <h4 className="input-label">Input:</h4>
      <input
        name="mainInput"
        type="text"
        placeholder="Enter Arabic Text Here"
        className="main-input"
        onChange={handleInput}
      />
      <InputValidator rawInput={rawInput} />
    </div>
  );
};

export default RadExInputField;
