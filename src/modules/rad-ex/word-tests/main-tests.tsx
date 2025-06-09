import type { JSX } from 'react';
import OutputCharsBox from '../pages/main/elements/output-chars-box/output-chars-box';
// import OutputCommentsBox from '../output-comments-box/output-comments-box';; //@TODO - 8JUN2025 - do not erase
// import ScoreDisplay from '../score-display/score-display'; //@TODO - 8JUN2025 - do not erase
// import { tsLiteralType } from '@babel/types';
// import { ReadStream } from "tty";
// import { CodeGenerator } from '@babel/generator';

interface NewInputObj {
  score: [string, number, string[]][];
  rawInput: string;
  strippedInput: string;
}

interface MainTestResults {
  score: [string, number, string[]][];
  meemWord: boolean;
  ALword: boolean;
  verbalNoun: boolean;
  testsRan: string[];
  mainTestOutputComments: string[];
}

// interface FinalResultsObject {
//   rawInput: string;
//   strippedInput: string;
//   ALword: boolean;
//   mainTestOutputComments: string[];
//   meemWord: boolean;
//   testsRan: string[];
//   verbalNoun: boolean;
//   score: [string, number, string[]][];
// }

interface Props {
  newInputObj: NewInputObj;
}

const MainTests = ({ newInputObj }: Props): JSX.Element => {
  const runMainTests = (
    strippedInput: string,
    score: [string, number, string[]][]
  ): MainTestResults => {
    const mainTestResults: MainTestResults = {
      score: score,
      meemWord: false,
      ALword: false,
      verbalNoun: false,
      testsRan: [],
      mainTestOutputComments: [],
    };
    const inputLength = mainTestResults.score.length;
    //This produces variables representing each character and its score which can be useful for some tests //@TODO - 8JUN2025 - temp deactivate
    // if (inputLength !== undefined && inputLength > 0) {
    //   const pos1 = mainTestResults.score[0][0];
    //   const pos1scr = mainTestResults.score[0][1];
    //   if (inputLength > 1) {
    //     const pos2 = score[1][0];
    //     const pos2scr = mainTestResults.score[1][1];
    //     const lastPos = score[inputLength - 1][0];
    //     const lastPosScr = mainTestResults.score[inputLength - 1][1];
    //     if (inputLength > 2) {
    //       const pos3 = score[2][0];
    //       const pos3scr = mainTestResults.score[2][1];
    //       const secFrmEnd = score[inputLength - 2][0];
    //       const secFrmEndScr = mainTestResults.score[inputLength - 2][1];
    //       if (inputLength > 3) {
    //         const pos4 = score[3][0];
    //         const pos4scr = mainTestResults.score[3][1];
    //         const thirdFrmEnd = score[inputLength - 3][0];
    //         const thirdFrmEndScr = mainTestResults.score[inputLength - 3][1];
    //         if (inputLength > 4) {
    //           const pos5 = score[4][0];
    //           const pos5scr = mainTestResults.score[4][1];
    //           const fourthFrmEnd = score[inputLength - 4][0];
    //           const fourthFrmEndScr = mainTestResults.score[inputLength - 4][1];
    //           if (inputLength > 5) {
    //             const pos6 = score[5][0];
    //             const pos6scr = mainTestResults.score[5][1];
    //             const fifthFrmEnd = score[inputLength - 5][0];
    //             const fifthFrmEndScr = mainTestResults.score[inputLength - 5][1];
    //             if (inputLength > 6) {
    //               const pos7 = score[6][0];
    //               const pos7scr = mainTestResults.score[6][1];
    //               const sixthFrmEnd = score[inputLength - 6][0];
    //               const sixthFrmEndScr = mainTestResults.score[inputLength - 6][1];
    //               if (inputLength > 7) {
    //                 const pos8 = score[7][0];
    //                 const pos8scr = mainTestResults.score[7][1];
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    const diff = 100 / inputLength;

    function testFromInitials(score: [string, number, string[]][]) {
      const testsArray: [string, string, string[], number[]][] = [
        ['M1A23', 'M1A23: Form 3', [], []],
        ['LA123', 'LA123: Possible superlative', [], []],
        ['L123', 'LA123: Possible superlative', [], []],
        ['M123', 'M123: A basic meem word', [], []],
        ['MT123', 'MT123: Form 5', [], []],
        ['MT1A23', 'MT1A23: Form 6', [], []],
        ['MN123', 'MN123 Form 7', [], []],
        ['M1T23', 'M1T23: Form 8', [], []],
        ['MST123', 'MST123: Form 10', [], []],
        ['M12A3', 'M12A3: Possibly a Form 1 Noun of Instrument, etc.', [], []],
        ['M12W3', 'M12W3: Possibly a Form 1 Passive Participle', [], []],
        ['M1A2I3', 'M1A2I3 comment: PENDING', [], []],
        ['1A23', '1A23: Form 1 Active Participle', [], []],
        ['12I3', '12I3: Form 1', [], []],
        ['12A3', '12A3: Form 1', [], []],
        ['TM123', 'TM123: Rare', [], []],
        ['12W3', '12W3: Probably Form 1', [], []],
        ['1A2W3', '1A2W3: Like qamus/Dictionary', [], []],
        ['1WA2I3', '1WA2I3: Like the plural Qawamis/Dictionaries', [], []],
        ['T12I3', 'T12I3: Probably a Form 2 Verbal Noun', [], []],
        ['A123', 'A123: This could be lots of things', [], []],
        [
          'A12A3',
          'A12A3: Possibly a Form 4 verbal noun or a plural of something',
          [],
          [],
        ],
        ['T123', 'T123: This could be a number of things', [], []],
        ['T1A23', 'T1A23: Probably Form 3 or 6', [], []],
        ['AN123', 'AN123: Form 7', [], []],
        ['AN12A3', 'Form 7 verbal noun', [], []],
        ['A1T23', 'A1T23 comment: Form 8', [], []],
        ['A1T2A3', 'A1T2A3 comment: Form 8 verbal noun', [], []],
        ['AST123', 'AST123 comment: Form 10', [], []],
        ['AST12A3', 'AST12A3 comment: Form 10 verbal noun', [], []],
        ['AL123', 'AL123 comment: Form 1?', [], []],
        ['AL12I3', 'AL123 comment: Form 1?', [], []],
        // ["AL1234", "AL1234 comment: PENDING"],
        // ["ALT1234", "ALT1234 comment: PENDING"],
        ['AL12A3', 'AL12A3 comment: ', [], []],
        ['AL12W3', 'AL12W3 comment: ', [], []],
        ['AL1A2W3', 'AL1A2W3 comment: ', [], []],
        ['ALT12I3', 'ALT12I3 comment: Form 2 verbal noun', [], []],
        ['ALA123', 'ALA123 comment: Superlative', [], []],
        [
          'ALA12A3',
          'ALA12A3 comment: Form 4 verbal noun or some kind of plural',
          [],
          [],
        ],
        ['ALT123', 'ALT123 comment: Form 5 verbal noun?', [], []],
        ['ALT1A23', 'ALT1A23 comment: Form 6 verbal noun?', [], []],
        ['ALAN12A3', 'ALAN12A3 comment: Form 7 verbal noun?', [], []],
        ['ALA1T2A3', 'ALA1T2A3 comment: Form 8 verbal noun?', [], []],
        ['ALAST12A3', 'ALAST12A3 comment: Form 10 verbal noun', [], []],
        ['LL123', "LL123 comment: 'for the...' ", [], []],
        // ["LL1234", "LL1234 comment: 'for the...'"],
        ['LL12A3', "LL12A3 comment: 'for the...'", [], []],
        ['LL12W3', "LL12W3 comment: 'for the...'", [], []],
        ['LL1A2W3', "LL1A2W3 comment: 'for the...'", [], []],
        ['LL1WA2I3', "LL1WA2I3 comment: 'for the...'", [], []],
        ['LLT12I3', "LLT12I3 comment: 'for the...' Form 2 verbal noun", [], []],
        ['LLA123', "LLA123 comment: 'for the most...(?' ", [], []],
        [
          'LLA12A3',
          "LLA12A3 comment: 'for the...' Form 4 verbal noun or plural ",
          [],
          [],
        ],
        ['LLT1A23', "LLT1A23 comment: 'for the...' Form 6 verbal noun", [], []],
        ['LLAN12A3', 'LLAN12A3 comment: Form 7', [], []],
        ['LLA1T2A3', 'LLA1T2A3 comment: Form 8', [], []],
        // ["LLA123A3", "LLA123A3 comment: PENDING"],
        ['LLAST12A3', 'LLAST12A3 comment: Form 10 ', [], []],
        ['BAL123', 'BAL123 comment: ', [], []],
        ['BAL12A3', 'BAL12A3 comment: ', [], []],
        ['BAL12W3', 'BAL12W3 comment: ', [], []],
        ['BAL1A2W3', 'BAL1A2W3 comment: ', [], []],
        ['BAL1WA2I3', 'BAL1WA2I3 comment: ', [], []],
        ['BALT12I3', 'BALT12I3 comment: Form 2 verbal noun', [], []],
        ['BALA123', 'BALA123 comment: ', [], []],
        ['BALA12A3', 'BALA12A3 comment: ', [], []],
        ['BALT123', 'BALT123 comment: Form 5 verbal noun', [], []],
        ['BAST12A3', 'BALT123 comment: Form 5 verbal noun', [], []],
        ['BALAN12A3', 'BALAN12A3 comment: Form 7', [], []],
        ['BALA1T2A3', 'BALA1T2A3 comment: Form 8', [], []],
        ['FAL123', 'FAL123 comment: ', [], []],
        ['FAL12A3', 'FAL123 comment: ', [], []],
        ['FAL12W3', 'FAL12W3 comment: ', [], []],
        ['BALT1A23', 'BALT1A23 comment: ', [], []],
        ['BALAST12A3', 'BALAST12A3 comment: ', [], []],
        ['BA1T2A3', 'BA1T2A3 comment: ', [], []],
        ['FAL1A2W3', 'FAL1A2W3 comment: ', [], []],
        ['FAL1WA2I3', 'FAL1WA2I3 comment: ', [], []],
        ['FALT12I3', 'FALT12I3 comment: ', [], []],
        ['FALA123', 'FALA123 comment: ', [], []],
        ['FALA12A3', 'FALA12A3 comment: ', [], []],
        ['FALT123', 'FALT123 comment: Form 5', [], []],
        ['FALT1A23', 'FALT1A23 comment: ', [], []],
        ['FALAN12A3', 'FALAN12A3 comment: Form 7', [], []],
        ['FALA1T2A3', 'FALA1T2A3 comment: Form 8', [], []],
        ['FALAST12A3', 'FALAST12A3 comment: Form 10', [], []],
        ['ALM123', 'ALM123 comment: ', [], []],
        ['ALM1A23', 'ALM1A23 comment: ', [], []],
        ['ALMT123', 'ALMT123 comment: Form 5', [], []],
        ['ALMT1A23', 'ALMT1A23 comment: Form 6', [], []],
        ['ALMN123', 'ALMN123 comment: Form 7', [], []],
        ['ALM1T23', 'ALM1T23 comment: Form 8', [], []],
        ['ALMST123', 'ALMST123 comment: Form 10', [], []],
        ['ALM12A3', 'ALM12A3 comment: ', [], []],
        ['ALM12W3', 'ALM12W3 comment: ', [], []],
        ['ALM1A2I3', 'ALM1A2I3 comment: ', [], []],
        ['WAL123', 'WAL123 comment: ', [], []],
        ['WAL12A3', 'WAL12A3 comment: ', [], []],
        ['WAL12W3', 'WAL12W3 comment: ', [], []],
        ['WAL1A2W3', 'WAL1A2W3 comment: ', [], []],
        ['WALT12I3', 'WALT12I3 comment: ', [], []],
        ['WALA123', 'WALA123 comment: ', [], []],
        ['WALA12A3', 'WALA12A3 comment: ', [], []],
        ['WALT123', 'WALT123 comment: ', [], []],
        ['WALT1A23', 'WALT1A23 comment: PENDING', [], []],
        ['WALAN12A3', 'WALAN12A3 comment: PENDING', [], []],
        ['WALA1T2A3', 'WALA1T2A3 comment: PENDING', [], []],
        ['WALAST12A3', 'WALAST12A3 comment: PENDING', [], []],
        ['WALM123', 'WALM123 comment: PENDING', [], []],
        ['WALM1A23', 'WALM1A23 comment: PENDING', [], []],
        ['WALMT123', 'WALMT123 comment: PENDING', [], []],
        ['WALMT1A23', 'WALMT1A23 comment: PENDING', [], []],
        ['WALMN123', 'WALMN123 comment: Form 7', [], []],
        ['WALM1T23', 'WALM1T23 comment: Form 8', [], []],
        ['WALMST123', 'WALMST123 comment: Form 10', [], []],
        ['WALM12A3', 'WALM12A3 comment: PENDING', [], []],
        ['WALM12W3', 'WALM12W3 comment: PENDING', [], []],
        ['WALM1A2I3', 'WALM1A2I3 comment: PENDING', [], []],
        ['W123', 'W123 comment: PENDING', [], []],
        ['WB123', 'WB123 comment: PENDING', [], []],
        ['WLLM123', 'WLLM123 comment: PENDING', [], []],
        ['WBAL123', 'WBAL123 comment: PENDING', [], []],
        ['WLL123', 'WLL123 comment: PENDING', [], []],
        ['WBAL123', 'WBAL123 comment: PENDING', [], []],
        ['WBM123', 'WBM123 comment: PENDING', [], []],
        ['WI123', 'WI123 comment: PENDING', [], []],
        ['WT123', 'WT123 comment: PENDING', [], []],
        ['WN123', "WN123 comment: 'and we...' ", [], []],
        ['LLM123', "LLM123 comment: 'for the...' ", [], []],
        ['LLM1A23', "LLM1A23 comment: 'for the...'", [], []],
        ['LLMT123', "LLMT123 comment: 'for the...'", [], []],
        ['LLMT1A23', "LLMT1A23 comment: 'for the...'", [], []],
        ['LLMN123', "LLMN123 comment: 'for the...'", [], []],
        ['LLM1T23', "LLM1T23 comment: 'for the...'", [], []],
        ['LLMST123', "LLMST123 comment: 'for the...'", [], []],
        ['LLM12A3', "LLM12A3 comment: 'for the...'", [], []],
        ['LLM12W3', "LLM12W3 comment: 'for the...'", [], []],
        ['LLM1A2I3', "LLM1A2I3 comment: 'for the...'", [], []],
        ['BALM123', 'BALM123 comment: PENDING', [], []],
        ['BALM1A23', 'BALM1A23 comment: PENDING', [], []],
        ['BALMT123', 'BALMT123 comment: PENDING', [], []],
        ['BALMT1A23', 'BALMT1A23 comment: PENDING', [], []],
        ['BALMN123', 'BALMN123 comment: PENDING', [], []],
        ['BALM1T23', 'BALM1T23 comment: PENDING', [], []],
        ['BALMST123', 'BALMST123 comment: PENDING', [], []],
        ['BALM12A3', 'BALM12A3 comment: PENDING', [], []],
        ['BALM12W3', 'BALM12W3 comment: PENDING', [], []],
        ['BALM1A2I3', 'BALM1A2I3 comment: PENDING', [], []],
        ['FALM123', 'FALM123 comment: PENDING', [], []],
        ['FALM1A23', 'FALM1A23 comment: PENDING', [], []],
        ['FALMT123', 'FALMT123 comment: PENDING', [], []],
        ['FALMT1A23', 'FALMT1A23 comment: PENDING', [], []],
        ['FALMN123', 'FALMN123 comment: PENDING', [], []],
        ['FALM1T23', 'FALM1T23 comment: PENDING', [], []],
        ['FALMST123', 'FALMST123 comment: PENDING', [], []],
        ['FALM12A3', 'FALM12A3 comment: PENDING', [], []],
        ['FALM12W3', 'FALM12W3 comment: PENDING', [], []],
        ['FALM1A2I3', 'FALM1A2I3 comment: PENDING', [], []],
        ['AT123', 'AT123 comment: Form 5?', [], []],
        ['A1A23', 'A1A23 comment: Form 3', [], []],
        ['AT1A23', 'AT1A23 comment: Form 6', [], []],
        ['TT123', 'TT123 comment: Form 5', [], []],
        ['TT1A23', 'TT1A23 comment: Form 6', [], []],
        ['TN123', 'TN123 comment: Form 7', [], []],
        ['T1T23', 'T1T23 comment: Form 8', [], []],
        ['TST123', 'TST123 comment: Form 10', [], []],
        ['I123', 'I123 comment: PENDING', [], []],
        ['IT123', 'IT123 comment: Form 5', [], []],
        ['I1A23', 'I1A23 comment: Form 3', [], []],
        ['IT1A23', 'IT1A23 comment: Form 6', [], []],
        ['IN123', 'IN123 comment: Form 7', [], []],
        ['I1T23', 'I1T23 comment: Form 8', [], []],
        ['IST123', 'IST123 comment: Form 10', [], []],
        ['N123', 'N123 comment: PENDING', [], []],
        ['N1A23', 'N1A23 comment: Form 3', [], []],
        ['NT123', 'NT123 comment: Form 5', [], []],
        ['NT1A23', 'NT1A23 comment: Form 6', [], []],
        ['NN123', 'NN123 comment: Form 7', [], []],
        ['N1T23', 'N1T23 comment: Form 8', [], []],
        ['NST123', 'NST123 comment: Form 10', [], []],
        ['SA123', 'SA123 comment: I will... ', [], []],
        ['SAT123', 'SAT123 comment: I will... Form 5', [], []],
        ['SA1A23', 'SA1A23 comment: I will.. Form 3', [], []],
        ['SAT1A23', 'SAT1A23 comment: I will ... Form 6', [], []],
        ['SA1T23', 'SA1T23 comment: I will... Form 8', [], []],
        ['SAN123', 'SAN123 comment: I will... Form 7', [], []],
        ['SAST123', 'SAST123 comment: I will Form 10', [], []],
        ['STT123', 'STT123 comment: Form 5', [], []],
        ['STT1A23', 'STT1A23 comment: Form 6', [], []],
        ['STN123', 'STN123 comment: Form 7', [], []],
        ['ST1T23', 'ST1T23 comment: Form 8', [], []],
        ['STST123', 'STST123 comment: Form 10', [], []],
        ['SI123', 'SI123 comment: Future ', [], []],
        ['SIT123', 'SIT123 comment: Form 5', [], []],
        ['SI1A23', 'SI1A23 comment: Form 3', [], []],
        ['SIT1A23', 'SIT1A23 comment: Form 6', [], []],
        ['SIN123', 'SIN123 comment: Form 7', [], []],
        ['SI1T23', 'SI1T23 comment: Form 8', [], []],
        ['SIST123', 'SIST123 comment: Form 10', [], []],
        ['SN123', 'SN123 comment: PENDING', [], []],
        ['SN1A23', 'SN1A23 comment: Form 3', [], []],
        ['SNT123', 'SNT123 comment: Form 5', [], []],
        ['SNT1A23', 'SNT1A23 comment: Form 6', [], []],
        ['SNN123', 'SNN123 comment: Form 7', [], []],
        ['SN1T23', 'SN1T23 comment: Form 8', [], []],
        ['SNST123', 'SNST123 comment: Form 10', [], []],
        ['LN123', 'LN123 comment: PENDING', [], []],
        ['LN1A23', 'LN1A23 comment: Form 3', [], []],
        ['LNT123', 'LNT123 comment: Form 5', [], []],
        ['LNT1A23', 'LNT1A23 comment: Form 6', [], []],
        ['LNN123', 'LNN123 comment: Form 7', [], []],
        ['LN1T23', 'LN1T23 comment: Form 8', [], []],
        ['LNST123', 'LNST123 comment: Form 10', [], []],
        ['FSA123', 'FSA123 comment: PENDING', [], []],
        ['FSAT123', 'FSAT123 comment: Form 5', [], []],
        ['FSA1A23', 'FSA1A23 comment: Form 3', [], []],
        ['FSAT1A23', 'FSAT1A23 comment: Form 6', [], []],
        ['FSA1T23', 'FSA1T23 comment: Form 8', [], []],
        ['FSAN123', 'FSAN123 comment: Form 7', [], []],
        ['FSAST123', 'FSAST123 comment: Form 10', [], []],
        ['FSTT123', 'FSTT123 comment: Form 5', [], []],
        ['FSTT1A23', 'FSTT1A23 comment: Form 6', [], []],
        ['FSTN123', 'FSTN123 comment: Form 7', [], []],
        ['FST1T23', 'FST1T23 comment: Form 8', [], []],
        ['FSTST123', 'FSTST123 comment: Form 10', [], []],
        ['FSI123', 'FSI123 comment: PENDING', [], []],
        ['FSIT123', 'FSIT123 comment: Form 5', [], []],
        ['FSI1A23', 'FSI1A23 comment: Form 3', [], []],
        ['FSIT1A23', 'FSIT1A23 comment: Form 6', [], []],
        ['FSIN123', 'FSIN123 comment: Form 7', [], []],
        ['FSI1T23', 'FSI1T23 comment: Form 8', [], []],
        ['FSIST123', 'FSIST123 comment: Form 10', [], []],
        ['FSN123', 'FSN123 comment: Form 7', [], []],
        ['FSN1A23', 'FSN1A23 comment: Form 3', [], []],
        ['FSNT123', 'FSNT123 comment: Form 5', [], []],
        ['FSNT1A23', 'FSNT1A23 comment: Form 6', [], []],
        ['FSNN123', 'FSNN123 comment: Form 7', [], []],
        ['FSN1T23', 'FSN1T23 comment: Form 8', [], []],
        ['FSNST123', 'FSNST123 comment: Form 10', [], []],
        ['WAN123', 'WAN123 comment: Form 7?', [], []],
        ['AL1A23', 'AL1A23 comment: Form 1 active participle?', [], []],
        [
          'K123',
          'K123 comment: A K at the start of a long term is probably not part of the root',
          [],
          [],
        ],
        [
          'KAL123',
          'KAL123 comment: A K at the start of a long term is probably not part of the root',
          [],
          [],
        ],
        [
          'KT123',
          'KT123 comment: A K at the start of a long term is probably not part of the root',
          [],
          [],
        ],
        [
          'KA123',
          'KA123 comment: A K at the start of a long term is probably not part of the root',
          [],
          [],
        ],
        [
          'KM123',
          'KM123 comment: A K at the start of a long term is probably not part of the root',
          [],
          [],
        ],
        [
          'KT1A23',
          'KT1A23 comment: A K at the start of a long term is probably not part of the root',
          [],
          [],
        ],
        [
          'K1A23',
          'K1A23 comment: A K at the start of a long term is probably not part of the root',
          [],
          [],
        ],
        ['xyzH', 'xyzH comment: ', [], []],
        ['xyzHA', 'xyzHA comment: ', [], []],
        ['xyzHM', 'xyzHM comment: ', [], []],
        ['xyzHN', 'xyzHN comment: ', [], []],
        ['xyzHMA', 'xyzHMA comment: ', [], []],
        ['xyzK', 'xyzK comment: ', [], []],
        ['xyzKM', 'xyzKM comment: ', [], []],
        ['xyzKMA', 'xyzKMA comment: ', [], []],
        ['xyzKN', 'xyzKN comment: ', [], []],
        ['xyzI', 'xyzI comment: ', [], []],
        ['xyzNA', 'xyzNA comment: ', [], []],
        ['xyzTH', 'xyzTH comment: ', [], []],
        ['xyzTHA', 'xyzTHA comment: ', [], []],
        ['xyzTHM', 'xyzTHM comment: ', [], []],
        ['xyzTHN', 'xyzTHN comment: ', [], []],
        ['xyzTHMA', 'xyzTHMA comment: ', [], []],
        ['xyzTK', 'xyzTK comment: ', [], []],
        ['xyzTKM', 'xyzTKM comment: ', [], []],
        ['xyzTKMA', 'xyzTKMA comment: ', [], []],
        ['xyzTKN', 'xyzTKN comment: ', [], []],
        ['xyzTI', 'xyzTI comment: ', [], []],
        ['xyzTNA', 'xyzTNA comment: ', [], []],
        ['xyzATH', 'xyzATH comment: ', [], []],
        ['xyzATHA', 'xyzATHA comment: ', [], []],
        ['xyzATHM', 'xyzATHM comment: ', [], []],
        ['xyzATHN', 'xyzATHN comment: ', [], []],
        ['xyzATHMA', 'xyzATHMA comment: ', [], []],
        ['xyzATK', ' comment: ', [], []],
        ['xyzATKM', ' comment: ', [], []],
        ['xyzATKMA', ' comment: ', [], []],
        ['xyzATKN', ' comment: ', [], []],
        ['xyzATI', ' comment: ', [], []],
        ['xyzATNA', ' comment: ', [], []],
        ['xzyANAT', ' comment: ', [], []],
        ['xyzANATH', ' comment: ', [], []],
        ['xyzANATHA', ' comment: ', [], []],
        ['xyzANATHM', ' comment: ', [], []],
        ['xyzANATHN', ' comment: ', [], []],
        ['xyzANATHMA', ' comment: ', [], []],
        ['xyzANATK', ' comment: ', [], []],
        ['xyzANATKM', ' comment: ', [], []],
        ['xyzANATKMA', ' comment: ', [], []],
        ['xyzANATKN', ' comment: ', [], []],
        ['xyzANATI', ' comment: ', [], []],
        ['xyzANATNA', ' comment: ', [], []],
        ['xzyANH', ' comment: ', [], []],
        ['xyzIATH', ' comment: ', [], []],
        ['xyzIATHA', ' comment: ', [], []],
        ['xyzIATHM', ' comment: ', [], []],
        ['xyzIATHN', ' comment: ', [], []],
        ['xyzIATHMA', ' comment: ', [], []],
        ['xyzIATK', ' comment: ', [], []],
        ['xyzIATKM', ' comment: ', [], []],
        ['xyzIATKMA', ' comment: ', [], []],
        ['xyzIATKN', ' comment: ', [], []],
        ['xyzIATI', ' comment: ', [], []],
        ['xyzIATNA', ' comment: ', [], []],
        ['xyzT', ' comment: ', [], []],
        ['xyzNAH', ' comment: ', [], []],
        ['xyzNAHA', ' comment: ', [], []],
        ['xyzNAHM', ' comment: ', [], []],
        ['xyzNAHN', ' comment: ', [], []],
        ['xyzNAHMA', ' comment: ', [], []],
        ['xyzNAK', ' comment: ', [], []],
        ['xyzNAKM', ' comment: ', [], []],
        ['xyzNAKMA', ' comment: ', [], []],
        ['xyzNAKN', ' comment: ', [], []],
        ['xyzIH', ' comment: ', [], []],
        ['xyzIHA', ' comment: ', [], []],
        ['xyzIHM', ' comment: ', [], []],
        ['xyzIHN', ' comment: ', [], []],
        ['xyzIHMA', ' comment: ', [], []],
        ['xyzIK', ' comment: ', [], []],
        ['xyzIKM', ' comment: ', [], []],
        ['xyzIKMA', ' comment: ', [], []],
        ['xyzIKN', ' comment: ', [], []],
        ['xyzINA', ' comment: ', [], []],
        ['xyzTM', ' comment: ', [], []],
        ['xyzIN', ' comment: ', [], []],
        ['xyzIIN', ' comment: ', [], []],
        ['xzyAN', ' comment: ', [], []],
        ['xzyIAN', ' comment: ', [], []],
        ['xyzWN', ' comment: ', [], []],
        ['xyzIWN', ' comment: ', [], []],
        ['xyzWA', ' comment: ', [], []],
        ['xyzWH', ' comment: ', [], []],
        ['xyzWHM', ' comment: ', [], []],
        ['xyzWKM', ' comment: ', [], []],
        ['xyzWI', ' comment: ', [], []],
        ['xyzWHA', ' comment: ', [], []],
        ['xyzA', ' comment: ', [], []],
        ['xyzIA', ' comment: ', [], []],
        ['xyzIAT', ' comment: ', [], []],
        ['xyzITIN', ' comment: ', [], []],
        ['xyzITAN', ' comment: ', [], []],
        // ["XXXX", "XXXX comment: "],
        // ["XXXX", "XXXX comment: "],
        // ["XXXX", "XXXX comment: "],
      ];

      const conversionKey: [string, string][] = [
        //lower case letters xyz used only for suffix tests
        ['X', 'X'],
        ['x', 'X'],
        ['Y', 'X'],
        ['y', 'X'],
        ['Z', 'X'],
        ['z', 'X'],
        ['M', 'م'],
        ['A', 'ا'],
        ['S', 'س'],
        ['T', 'ت'],
        ['W', 'و'],
        ['H', 'ه'],
        ['?', 'ه'],
        ['I', 'ي'],
        ['L', 'ل'],
        ['B', 'ب'],
        ['F', 'ف'],
        ['N', 'ن'],
        ['K', 'ك'],
        ['1', 'X'],
        ['2', 'X'],
        ['3', 'X'],
        ['4', 'X'],
      ];

      //this is going to be the new array of tests
      const convertedTestsArray: string[][] = [];
      //this cycles though every model and converts the English letters/numbers to the ARabic, etc.
      for (let i = 0; i < testsArray.length; i++) {
        //this selects on of the test models
        const thisTest = testsArray[i][0];
        //this splits the model into an array
        const thisTestArray = thisTest.split('');
        //this cycles through every letter in the model
        const newTestWordArray: string[] = [];
        for (let j = 0; j < thisTestArray.length; j++) {
          //this assigns the letter to a variable
          const thisCharacter = thisTestArray[j][0];
          for (let k = 0; k < conversionKey.length; k++) {
            if (thisCharacter === conversionKey[k][0]) {
              const switchLetter = conversionKey[k][1];
              newTestWordArray.push(switchLetter);
            }
            // console.log("the new test word array is now:")
            // console.log(newTestWordArray)
          }
          // console.log("the rejoined test is:")
          // console.log(rejoinedTest)
        }
        // testsArray[i][0] = rejoinedTest[i]
        convertedTestsArray.push(newTestWordArray);
        // console.log("the convertedTestsArray is:")
        // console.log(convertedTestsArray)
        testsArray[i][2] = convertedTestsArray[i];
        testsArray[i][3] = [];
      }
      console.log('the tests array is now:');
      console.log(convertedTestsArray);
      //End of model conversion

      // console.log("score is:")
      // console.log(score)
      const numberOfTests = testsArray.length;
      // console.log("the number of tests to run is " + numberOfTests)

      //START OF MAIN TEST ROUTINE
      if (score[0] !== undefined) {
        for (let i = 0; i < numberOfTests; i++) {
          const thisTestName = testsArray[i][0];
          let thisTestArray = testsArray[i][2];
          const thisTestScore = testsArray[i][3];
          const thisTestComment = testsArray[i][1];
          //this is primarily trouble shooting mechanism that could be removed.
          mainTestResults.testsRan.push(thisTestName);
          // console.log("the test runnin now is:")
          // console.log(thisTestName)
          // console.log(thisTestComment)
          const thisTestLength = thisTestArray.length;
          // console.log("the length of this test is " + thisTestLength)
          // console.log("the length of the word is " + inputLength)

          //tests are not run if the input is shorter than the model
          if (inputLength >= thisTestLength) {
            // console.log("the input is long enough to be tested against " + thisTestName)
            //this loops through each letter in the model

            // console.log('the score before attempting to reverse is:');
            // console.log(score);
            if (thisTestArray[0] === 'X') {
              // console.log('we have a suffix test!');
              // console.log(thisTestArray);
              thisTestArray = thisTestArray.reverse();
              // console.log(thisTestArray);
              // let normalOrderScore = mainTestResults.score;
              // console.log('the normal score is');
              // console.log(normalOrderScore);
              // let reversedScore = score
              // reversedScore = reversedScore.reverse();
              mainTestResults.score = mainTestResults.score.reverse();
              // console.log('the reversed score is');
              // console.log(score);
            } else {
              // let normalOrderScore: [string, number, string[]][] = [];
            }

            // console.log('the score after reverse is now');
            // console.log(score);

            for (let pos = 0; pos < thisTestLength; pos++) {
              // const character = pos + 1;
              //  console.log("the position is " + character + " and the characters are:")
              //  console.log(thisTestArray[pos])
              //  console.log(score[pos][0])

              //process for suffix tests.
              //if position is 0 and it is an X, then flip order of model and the input
              //note that we later need to reverse this

              //the actual scoring mechanism - for every character match, one point is added
              //the test only passes if there are as many points as the model length
              if (thisTestArray[pos] === 'X') {
                // console.log("the input can be anything so the word gets a point")
                thisTestScore.push(1);
              } else if (thisTestArray[pos] === score[pos][0]) {
                // console.log("the input character matches the test character")
                thisTestScore.push(1);
              } else {
                //  console.log("there is not a match")
              }
              // console.log("the score array for this test is")
              // console.log(thisTestScore)
              if (thisTestScore.length === thisTestLength) {
                //this pushes out the comment
                mainTestResults.mainTestOutputComments.push(thisTestComment);
                //Set new score
                for (let pos = 0; pos < thisTestLength; pos++) {
                  // console.log("now setting score...")
                  if (thisTestArray[pos] === 'X') {
                    // console.log("the input can be anything so there is no change in score")
                  } else if (thisTestArray[pos] === score[pos][0]) {
                    // console.log("the input character matches the test character so it loses points")
                    // console.log("the score was:")
                    console.log(mainTestResults.score[pos][1]);
                    // console.log("now the score is:")
                    mainTestResults.score[pos][1] =
                      mainTestResults.score[pos][1] / diff;
                    console.log(mainTestResults.score[pos][1]);
                  } else {
                    //  console.log("there is not a match so this output shouldn't run")
                  }
                }
              } else {
                // console.log("the term failed the test")
              }
            }

            // if (normalOrderScore.length > 0) {
            //   // console.log('we need to flip that score around!');
            //   // console.log(normalOrderScore);
            //   mainTestResults.score = mainTestResults.score.reverse();
            //   // console.log(score);
            //   normalOrderScore = [];
            //   //this bit may not be needed
            //   thisTestArray = thisTestArray.reverse();
            //   // console.log(thisTestArray);
            // }

            // console.log('the score after going back to noraml is');
            // console.log(score);
          } else {
            // console.log("the input is not long enough to be tested against " + thisTestName)
          }
        }
      }

      //END OF MAIN TEST testFromInitials function
    }
    //THIS RUNS THE ABOVE FUNCTION
    testFromInitials(score);

    //ADITIONAL TESTS ADITIONAL TESTS ADITIONAL TESTS ADITIONAL TESTS ADITIONAL TESTS

    // //TESTNOTE:
    // mainTestResults.testsRan.push(
    //   "AL123"
    //   );
    // if (
    //   inputLength > 4
    //   &&
    //   pos1 === "ا"
    //   &&
    //   pos2 === "ل"
    //   ) {
    //   mainTestResults.score[0][1] = pos1scr / diff;
    //   mainTestResults.score[1][1] = pos2scr / diff;
    //   mainTestResults.mainTestOutputComments.push(
    //       "ال are usually not part of the root"
    //       );
    //   mainTestResults.ALword = true;
    // }

    //TESTNOTE:
    // mainTestResults.testsRan.push(
    //   "xyzHA"
    //   );
    // if (
    //   inputLength > 5
    //   &&
    //   lastPos === "ا"
    //   &&
    //   secFrmEnd === "ه"
    //   ) {
    //   mainTestResults.score[inputLength-1][1] = lastPosScr / diff;
    //   mainTestResults.score[inputLength-2][1] = secFrmEndScr / diff;
    //   mainTestResults.mainTestOutputComments.push(
    //     "A ها at the end of the word is usually a pronoun"
    //       );
    // }

    // END TESTS END TESTS END TESTS END TESTS END TESTS END TESTS END TESTS END TESTS
    // DO NOT ERASE THIS COMMENT  DO NOT ERASE THIS COMMENT  DO NOT ERASE THIS COMMENT  DO NOT ERASE THIS COMMENT
    return mainTestResults;
    //END OF TESTING
  };

  const {
    score,
    // rawInput,
    strippedInput,
  } = newInputObj;
  const mainTestResults = runMainTests(strippedInput, score);
  const {
    // ALword,
    mainTestOutputComments,
    // meemWord, testsRan, verbalNoun
  } = mainTestResults;
  const mainTestScore = mainTestResults.score;
  //this may not be necessary
  // const finalResultsObject: FinalResultsObject = {
  //   rawInput: rawInput,
  //   strippedInput: strippedInput,
  //   ALword: ALword,
  //   mainTestOutputComments: mainTestOutputComments,
  //   meemWord: meemWord,
  //   testsRan: testsRan,
  //   verbalNoun: verbalNoun,
  //   score: mainTestScore,
  // };

  return (
    <div className="">
      <OutputCharsBox
        mainTestScore={mainTestScore}
        mainTestOutputComments={mainTestOutputComments}
      />
      {/* Keep this in case we want to display Score Display for trouble shooting, QC */}
      {/* <ScoreDisplay finalResultsObject={finalResultsObject}/> */}
    </div>
  );
  //end of render
};

export default MainTests;
