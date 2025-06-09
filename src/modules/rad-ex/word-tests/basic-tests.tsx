import type { JSX } from 'react';
import MainTests from './main-tests';

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

interface NewInputObj {
  rawInput: string;
  strippedInput: string;
  strippedInputArray: string[];
  score: [string, number, string[]][];
}

interface Props {
  inputObj: InputObj;
}

type LetterScore = [string, number, string[]];

const BasicTests = ({ inputObj }: Props): JSX.Element => {
  const initialScore = (strippedInputArray: string[]): LetterScore[] => {
    const score: LetterScore[] = [];
    if (strippedInputArray !== undefined) {
      console.log('stripped input array does exist');
      // initial score is set as a percentage based on how many letters there are
      const defaultScore = 100 / strippedInputArray.length;
      if (strippedInputArray.length > 0) {
        // console.log("stripped input length is " + strippedInputArray.length)
        for (let i = 0; i < strippedInputArray.length; i++) {
          const thisCharacter = strippedInputArray[i];
          const emptyCommentArray: string[] = [];
          const letterScoreArray: LetterScore = [
            thisCharacter,
            defaultScore,
            emptyCommentArray,
          ];
          score.push(letterScoreArray);
        }
      }
    }
    return score;
  };

  const basicTest = (strippedInputArray: string[]): LetterScore[] => {
    const score = initialScore(strippedInputArray);
    if (score.length > 0) {
      for (let i = 0; i < strippedInputArray.length; i++) {
        if (score[i][0] === 'ا') {
          score[i][1] = score[i][1] / 2;
          score[i][2] = [
            'An aliph is used for numerous grammatical reasons and usually should not be assumed to be part of the root unless all other options have been ruled out.',
          ];
        }
        if (score[i][0] === 'ب') {
          score[i][1] = score[i][1] * 1.25;
          score[i][2] = [
            'If a ب is at the start of the term, it is probably not part of the root; otherwise it probably is.',
          ];
        }
        if (score[i][0] === 'ج') {
          score[i][1] = score[i][1] * 2;
          score[i][2] = ['A ج is always part of the root.'];
        }
        if (score[i][0] === 'د') {
          score[i][1] = score[i][1] * 1.75;
          score[i][2] = [
            'A د is almost always part of the UNLESS it is substituting for a ت in some rare Form 8 words, in which case it would follow the first radical.',
          ];
        }
        if (score[i][0] === 'ه') {
          score[i][1] = score[i][1] / 1.25;
          score[i][2] = [
            'The ه ـهـ is often found near the end of a word as part of a pronoun; if it is near the front, it is probably part of the root.',
          ];
        }
        if (score[i][0] === 'و') {
          score[i][1] = score[i][1] / 1.75;
          score[i][2] = [
            'The و serves a lot of grammatical functions, but is often part of a root as well, where is sometimes is switched out for an aliph in some forms.',
          ];
        }
        if (score[i][0] === 'ز') {
          score[i][1] = score[i][1] * 2;
          score[i][2] = ['A ز is almost always part of a root.'];
        }
        if (score[i][0] === 'ح') {
          score[i][1] = score[i][1] * 2;
          score[i][2] = ['A ح is always part of a root.'];
        }
        if (score[i][0] === 'ط') {
          score[i][1] = score[i][1] * 1.75;
          score[i][2] = [
            'A ط is almost always of a root, except in certain rare occasions where it substitutes for a ت in Form 8 words, in which case it would follow the first radical.',
          ];
        }
        if (score[i][0] === 'ي') {
          score[i][1] = score[i][1] / 2;
          score[i][2] = [
            'A ي is used for many grammatical functions, but can sometimes be part of a root, where it may switch out with a ا in various forms of the word.',
          ];
        }
        if (score[i][0] === 'ك') {
          score[i][1] = score[i][1] / 1.5;
          score[i][2] = [
            'A ك at the beginning or near the end of a term is probably serving a grammatical purpose.',
          ];
        }
        if (score[i][0] === 'ل') {
          score[i][1] = score[i][1] / 2;
          score[i][2] = [
            'The ل near the beginning of a term often serves a grammatical purpose.',
          ];
        }
        if (score[i][0] === 'م') {
          score[i][1] = score[i][1] / 2;
          score[i][2] = [
            'An م near the start of a word can indicate a meem word, which may be an active or passive participle or noun of place, or noun of instrument or something else; a meem near the end of a word may be part of a pronoun.',
          ];
        }
        if (score[i][0] === 'ن') {
          score[i][1] = score[i][1] / 2;
          score[i][2] = [
            'A ن at the very beginning or end of a term may indicate some kind of verb conjugation; if it is not the first letter, but near the start of the term, it may indicate a Form 7 word.',
          ];
        }
        if (score[i][0] === 'س') {
          score[i][1] = score[i][1] / 1.25;
          score[i][2] = [
            'A س at the very start of a term may indicate the future tense. If it is not the first letter, but is followed by a ت then it may indicate a Form 10 word.',
          ];
        }
        if (score[i][0] === 'ع') {
          score[i][1] = score[i][1] * 2;
          score[i][2] = [
            'An ع is almost always part of the root, but note that it is used in several prepositions.',
          ];
        }
        if (score[i][0] === 'ف') {
          score[i][1] = score[i][1] * 1.25;
          score[i][2] = [
            'A ف at the very start of a term may be a kind of preposition. Otherwise it is probably part of the root.',
          ];
        }
        if (score[i][0] === 'ص') {
          score[i][1] = score[i][1] * 2;
          score[i][2] = ['The ص is essentially always part fo the root.'];
        }
        if (score[i][0] === 'ق') {
          score[i][1] = score[i][1] * 2;
          score[i][2] = ['The ق is always part of the root'];
        }
        if (score[i][0] === 'ر') {
          score[i][1] = score[i][1] * 2;
          score[i][2] = ['The ر is always part of the root.'];
        }
        if (score[i][0] === 'ش') {
          score[i][1] = score[i][1] * 2;
          score[i][2] = ['The ش is always part of the root.'];
        }
        if (score[i][0] === 'ت') {
          score[i][1] = score[i][1] / 2.5;
          score[i][2] = [
            'The ت is used for so many grammatical purposes that it is almost never part of the root.',
          ];
        }
        if (score[i][0] === 'غ') {
          score[i][1] = score[i][1] * 2;
          score[i][2] = ['The غ is always part of the root.'];
        }
        if (score[i][0] === 'ظ') {
          score[i][1] = score[i][1] * 1.75;
          score[i][2] = [
            'The ظ is almost always part of the root, expect when it is sometimes substituted for the ت in some Form 8 words, where it will follow the first radical.',
          ];
        }
        if (score[i][0] === 'ض') {
          score[i][1] = score[i][1] * 1.75;
          score[i][2] = ['The ض is almost always part of the root.'];
        }
        if (score[i][0] === 'ذ') {
          score[i][1] = score[i][1] * 1.75;
          score[i][2] = ['The ذ is essentially always part of the root.'];
        }
        if (score[i][0] === 'خ') {
          score[i][1] = score[i][1] * 2;
          score[i][2] = ['The خ is always part of the root.'];
        }
        if (score[i][0] === 'ث') {
          score[i][1] = score[i][1] * 2;
          score[i][2] = ['The ث is always part of the root.'];
        }
        if (score[i][0] === 'ء') {
          score[i][1] = score[i][1] / 1.5;
          score[i][2] = [
            'The ء is a tricky letter that takes many different forms. It it is in this form and at the  end of it term, it may represent a kind of plural and not be part of the root.',
          ];
        }
        if (score[i][0] === 'ى') {
          score[i][1] = score[i][1] / 1.25;
          score[i][2] = [
            'The aliph maksurah often indicates that it or a regular aliph is part of the root.',
          ];
        }
        if (score[i][0] === 'ؤ') {
          score[i][1] = score[i][1] * 1.5;
          score[i][2] = [
            'A waaw with a hamzah seated on it often indicates that a hamzah or hamzah on an aliph is in the root, but it has been modified for grammatical reasons.',
          ];
        }
        if (score[i][0] === 'ئ') {
          score[i][1] = score[i][1] * 1.5;
          score[i][2] = [
            'A seated hamzah or hamzah on an an aliph maksurah often indicates that a hamzah of some type is part of the root.',
          ];
        }
      }
    }
    return score;
    // end of basic text
  };

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
    // taaMarbutah,
    // anyHamzah,
    // alephHamzahMaddah,
    strippedInput,
    strippedInputArray,
    // score,
  } = inputObj;

  const basicTestScore = basicTest(strippedInputArray);

  const newInputObj: NewInputObj = {
    rawInput: rawInput,
    strippedInput: strippedInput,
    strippedInputArray: strippedInputArray,
    score: basicTestScore,
  };

  return (
    <div className="">
      <MainTests newInputObj={newInputObj} />
    </div>
  );
};

export default BasicTests;
