import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';
import sec2time from '../util/sec2time';

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  * {
    margin-right: 12px;
  }
`;

const Controls = ({
  isActive,
  show,
  onNewGame,
  onTimeUpdate,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isStarted, setStarted] = useState(false);

  const toggle = () => {
    //setIsActive(!isActive);
  }

  const handleReset = () => {
    setSeconds(0);
    //setIsActive(false);
    setStarted(false);
  }

  const handleNewGame = () => {
    handleReset();

    if (onNewGame) onNewGame();

    setStarted(true);

    toggle();
  }

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (onTimeUpdate) onTimeUpdate(seconds + 1);

        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  if (!show) return null;

  return (
    <Wrap>
      <div>
        <Button onClick={handleNewGame}>New Game</Button>
        {isStarted &&
          <Button onClick={toggle}>{isActive ? 'Pause' : 'Play'}</Button>
        }
      </div>

      <time>{sec2time(seconds)}</time>
    </Wrap>
  );
};

export default Controls;
