import type { JSX } from 'react';
import './score-display.css';

interface Props {
  mainTestScore: [string, number, string[]][];
  mainTestOutputComments: string[];
}

const ScoreDisplay = ({
  mainTestScore,
  mainTestOutputComments,
}: Props): JSX.Element => {
  const scoreDisplay: JSX.Element[] = [];

  for (let i = 0; i < mainTestScore.length; i++) {
    const char = mainTestScore[i][0];
    const scr = mainTestScore[i][1];
    scoreDisplay.push(
      <li key={i}>
        <span>
          {scr} - {char}
        </span>
      </li>
    );
  }

  const commentsDisplay: JSX.Element[] = [];
  for (let i = 0; i < mainTestOutputComments.length; i++) {
    const comment = mainTestOutputComments[i];
    commentsDisplay.push(
      <li key={i}>
        <p>{comment}</p>
      </li>
    );
  }

  return (
    <div className="score-display">
      <h4>Score Display</h4>
      <p>NOTE: This is for testing purposes only</p>

      <ul className="score-display-score-box">{scoreDisplay}</ul>
      <ul className="score-display-comments-box">{commentsDisplay}</ul>
    </div>
  );
};

export default ScoreDisplay;
