import type { JSX } from 'react';
import RadExInputCommentsBox from '../input-comments-box/input-comments-box';
import BasicTests from '../../word-tests/basic-tests';

interface Props {
  rawInput: string;
}

interface InputObj {
  rawInput: string;
  rawInputArray: string[];
  rawInputLength: number;
  arabicUniBlock: boolean;
  arabicWithDiacritics: boolean;
  diacritics: boolean;
  validInput: boolean;
  arabicOnlyArray: string[];
  taaMarbutah: boolean;
  anyHamzah: boolean;
  alephHamzahMaddah: boolean;
  strippedInput: string;
  strippedInputArray: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  score: any[];
}

const InputValidator = ({ rawInput }: Props): JSX.Element => {
  const mainValidation = (rawInput: string): InputObj => {
    let rawInputArray: string[] = [];
    let rawInputLength: number = 0;
    const arabicOnlyArray: string[] = [];
    let strippedInputArray: string[] = [];
    let strippedInput: string = '';
    let taaMarbutah: boolean = false;
    let anyHamzah: boolean = false;
    let alephHamzahMaddah: boolean = false;

    if (rawInput !== undefined) {
      rawInputLength = rawInput.length;
      if (rawInput.length > 0) {
        rawInputArray = rawInput.split('');

        // test each letter for arabic
        for (let i = 0; i < rawInputArray.length; i++) {
          const character = rawInputArray[i];
          // arabic test
          if (/[\u0600-\u06ff]/.test(character)) {
            arabicOnlyArray.push(character);
          }
          // end of Arabic stripper
        }

        // strip diacritics
        const inputNoDiacritics: string[] = [];
        for (let i = 0; i < arabicOnlyArray.length; i++) {
          if (/[\u064B-\u0652]|[\u0670]/.test(arabicOnlyArray[i])) {
            console.log('ignoring a diacritic');
          } else {
            inputNoDiacritics.push(arabicOnlyArray[i]);
          }
        }

        // strip taa marbutah
        const inputNoTaaMarbutah: string[] = [];
        for (let i = 0; i < inputNoDiacritics.length; i++) {
          if (/ة/.test(inputNoDiacritics[i])) {
            taaMarbutah = true;
          } else {
            inputNoTaaMarbutah.push(inputNoDiacritics[i]);
          }
        }

        // normalize hamzah
        const inputNormalizedHamzah: string[] = [];
        for (let i = 0; i < inputNoTaaMarbutah.length; i++) {
          if (/[\u0622-\u0623]|[\u0625]/.test(inputNoTaaMarbutah[i])) {
            inputNormalizedHamzah.push('ا');
            anyHamzah = true;
            alephHamzahMaddah = true;
          } else {
            inputNormalizedHamzah.push(inputNoTaaMarbutah[i]);
          }
        }

        strippedInputArray = inputNormalizedHamzah;
        strippedInput = strippedInputArray.join('');
      }
    }

    const inputObj: InputObj = {
      rawInput: rawInput,
      rawInputArray: rawInputArray,
      rawInputLength: rawInputLength,
      arabicUniBlock: false,
      arabicWithDiacritics: false,
      diacritics: false,
      validInput: false,
      arabicOnlyArray: arabicOnlyArray,
      taaMarbutah: taaMarbutah,
      anyHamzah: anyHamzah,
      alephHamzahMaddah: alephHamzahMaddah,
      strippedInput: strippedInput,
      strippedInputArray: strippedInputArray,
      score: [],
    };

    return inputObj;
  };

  const inputObj = mainValidation(rawInput);

  return (
    <div className="">
      <RadExInputCommentsBox inputObj={inputObj} />
      <BasicTests inputObj={inputObj} />
    </div>
  );
};

export default InputValidator;
