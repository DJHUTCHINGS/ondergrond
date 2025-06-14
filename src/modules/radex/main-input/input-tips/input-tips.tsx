import { useState, type JSX } from 'react';
import Button from '../../../../shared/ui/button/Button';

const InputTips = (): JSX.Element => {
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="">
      {showTips && (
        <>
          <h5 className="input-tip">TIP: 1 word only; all spaces ignored.</h5>
          <Button variant="ghost" onClick={() => setShowTips(false)}>
            Hide Tips
          </Button>
        </>
      )}

      {!showTips && (
        <Button variant="ghost" onClick={() => setShowTips(true)}>
          Show Tips
        </Button>
      )}
    </div>
  );
};

export default InputTips;
