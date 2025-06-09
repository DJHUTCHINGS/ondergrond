import type { JSX } from 'react';
import './output-comments-box.css';

interface Props {
  mainTestOutputComments: string[];
}

const OutputCommentsBox = ({ mainTestOutputComments }: Props): JSX.Element => {
  const commentsDisplay: JSX.Element[] = [];
  // console.log(commentsDisplay)
  for (let i = 0; i < mainTestOutputComments.length; i++) {
    const comment = mainTestOutputComments[i];
    commentsDisplay.push(
      <li key={i}>
        <p>{comment}</p>
      </li>
    );
  }

  let OutputDisplay: JSX.Element[] | string = '';
  if (commentsDisplay.length > 0) {
    OutputDisplay = [
      <div key="comments-section">
        <p>Comments:</p>
        <ul>{commentsDisplay}</ul>
      </div>,
    ];
  } else if (commentsDisplay.length === 0) {
    OutputDisplay = '';
  }

  return <div className="OutputCommentsBox">{OutputDisplay}</div>;
};

export default OutputCommentsBox;
