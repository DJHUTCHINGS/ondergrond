import { useState, type JSX } from 'react';
import { sampleWords } from './sample-words';
import Button from '../../../shared/ui/button/Button';

const RadExSampleText = (): JSX.Element => {
  const [showWords, setShowWords] = useState(false);

  return (
    <div className="sample-text">
      <h4>Free samples!</h4>
      {!showWords && (
        <Button variant="ghost" onClick={() => setShowWords(true)}>
          Show
        </Button>
      )}

      {showWords && (
        <>
          <p>Don't know any Arabic? Try these words:</p>
          <p>
            (Some of these words are loan words and will not produce accurate
            results.)
          </p>
          <div className="p-4 flex flex-wrap">
            {sampleWords.map((word, index) => (
              <span key={index} className="mr-2 mb-1">
                {word.arabic}
              </span>
            ))}
          </div>
          <Button variant="ghost" onClick={() => setShowWords(false)}>
            Hide
          </Button>
        </>
      )}
    </div>
  );
};

export default RadExSampleText;
