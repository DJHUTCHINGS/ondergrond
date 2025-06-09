import type { JSX } from 'react';
// import './input-comments-box.css';

interface InputObj {
  rawInput: string;
  rawInputArray: string[];
  rawInputLength: number;
  arabicUniBlock: boolean;
  arabicWithDiacritics: boolean;
  diacritics: boolean;
  validInput: boolean;
  arabicOnly?: boolean;
  arabicOnlyArray: string[];
  taaMarbutah: boolean;
  anyHamzah: boolean;
  alephHamzahMaddah: boolean;
  strippedInput: string;
  strippedInputArray: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  score: any[];
}

interface Props {
  inputObj: InputObj;
}

const RadExInputCommentsBox = ({ inputObj }: Props): JSX.Element => {
  const {
    rawInput,
    // rawInputArray,
    // rawInputLength,
    // arabicUniBlock,
    // arabicWithDiacritics,
    // diacritics,
    // validInput,
    // arabicOnly,
    // arabicOnlyArray,
    taaMarbutah,
    // anyHamzah,
    alephHamzahMaddah,
    strippedInput,
    // strippedInputArray,
    // score,
  } = inputObj;

  console.log('testng the inputs comment box');
  console.log(strippedInput);
  console.log(taaMarbutah);

  // DISPLAY
  let rawInputDisplay: JSX.Element[] = [];
  if (rawInput !== '') {
    rawInputDisplay = [
      <div key="raw-input">
        <h4>Notes about the input:</h4>
        <p>This original input is: {rawInput}.</p>
      </div>,
    ];
  }

  let assessedInputDisplay: JSX.Element[] = [];
  if (strippedInput !== undefined && strippedInput !== '') {
    assessedInputDisplay = [
      <p key="assessed-input">
        This input to be assessed is: {strippedInput}.
      </p>,
    ];
  } else if (strippedInput === '') {
    assessedInputDisplay = [
      <p key="invalid-input">
        This input appears to not be valid Arabic characters.
      </p>,
    ];
  }

  const inputComments: string[] = [];
  if (strippedInput !== undefined && strippedInput !== '') {
    if (taaMarbutah === true) {
      inputComments.push(
        'The input contains a Taa Marbutah, which is never part of the root so it has been removed.'
      );
    }
    if (alephHamzahMaddah === true) {
      inputComments.push(
        'The input contains an aliph that had a hamzah or a maddah on it. Because written Arabic is inconsistent on the rendering of these marks, they have been removed from this analysis. In general a hamzah at the start of the a word is not part of the root, but if it is in the middle of the word, it might be.'
      );
    }
  }

  const inputCommentsDisplay: JSX.Element[] = [];
  if (inputComments !== undefined) {
    for (let i = 0; i < inputComments.length; i++) {
      inputCommentsDisplay.push(<li key={i}>{inputComments[i]}</li>);
    }
  }

  return (
    <div className="">
      {rawInputDisplay}
      {assessedInputDisplay}
      <ul>{inputCommentsDisplay}</ul>
    </div>
  );
};

export default RadExInputCommentsBox;
