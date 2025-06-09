import type { JSX } from 'react';
// import './output-chars-box.css';
import OutputCommentsBox from '../output-comments-box/output-comments-box';
import ScoreDisplay from '../score-display/score-display';

interface Props {
  mainTestScore: [string, number, string[]][];
  mainTestOutputComments: string[];
}

const OutputCharsBox = ({
  mainTestScore,
  mainTestOutputComments,
}: Props): JSX.Element => {
  if (mainTestScore !== undefined) {
    //this is probably no longer necessary
  }

  //push character comments from the basic tests to main comments
  for (let i = 0; i < mainTestScore.length; i++) {
    console.log('Fix this');
    // const thisComment = mainTestScore[i][2]; //@TODO - 8JUN - Fix this
    // mainTestOutputComments.push(thisComment);//@TODO - 8JUN - Fix this
  }

  //this modifies the scores in preparation for converting them to font sizes
  //it may not actually do much right now
  const scoreDisplay: JSX.Element[] = [];
  let fontSizeBase = 0;
  for (let i = 0; i < mainTestScore.length; i++) {
    fontSizeBase = fontSizeBase + mainTestScore[i][1];
  }

  //Sets up the individual characters and their font size
  for (let i = 0; i < mainTestScore.length; i++) {
    const char = mainTestScore[i][0];
    const scr = mainTestScore[i][1];
    const newsize = (scr / fontSizeBase) * 100 + 15;
    const size = newsize.toString();
    const divStyle = {
      fontSize: `${size}px`,
      color: 'blue',
    };
    //this pushes the JSX that will display the characters to an array
    scoreDisplay.push(
      <span key={i} style={divStyle}>
        {char}{' '}
      </span>
    );
  }

  //this contains any text that we want to appear only if their are characters displayed
  let outputDisplay: JSX.Element[] = [];
  if (mainTestScore.length > 0) {
    outputDisplay = [
      <div key="output-label">
        <p>Output:</p>
      </div>,
    ];
  }

  return (
    <div className="">
      {outputDisplay}
      {scoreDisplay}
      <OutputCommentsBox mainTestOutputComments={mainTestOutputComments} />
      <ScoreDisplay
        mainTestScore={mainTestScore}
        mainTestOutputComments={mainTestOutputComments}
      />
    </div>
  );
};

export default OutputCharsBox;
