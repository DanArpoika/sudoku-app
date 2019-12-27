import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import Board from './components/Board';
import Page from './components/Page';
import theme from './styles/theme';
import Intro from './components/Intro';
import Win from './components/Win';
import Controls from './components/Controls';

import GlobalStyle from './styles/global-style';
import DifficultySelector from './components/DifficultySelector';
import Sudoku from './util/sudoku.class';


const App = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [isWon, setWon] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isPaused, setPaused] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [game, setGame] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(null);

  const handleNewGame = () => {
    setLoading(true);

    const board = Sudoku();

    board.setLevel(difficulty - 1);
    board.newGame();

    console.log(board)

    setPaused(false);
    setGame(board);
    setActive(true);
    setLoading(false);

    let t = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    setTimer(t);
  };

  const handleDifficultySelect = (level) => {
    clearInterval(timer);
    setDifficulty(level);
    setSeconds(0);
  }

  const handleReset = () => {
    setDifficulty(null);
    setWon(false);
    setActive(false);
    setLoading(false);
    setGame(null);
  }

  const handleWin = () => {
    clearInterval(timer);
    setActive(false);
    setWon(true);
  }

  useEffect(() => {
    if (!difficulty) return;

    console.log('changed');
    handleNewGame();
  }, [difficulty]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        {!isWon &&
          <React.Fragment>
            <Intro show={!isActive} />
            <Controls
              isActive={isActive}
              onNewGame={handleReset}
              isPaused={isPaused}
              show={isActive}
              seconds={seconds}
            />
            <Board
              show={isActive}
              isPaused={isPaused}
              loading={isLoading}
              game={game}
              onWin={handleWin}
            />
            <DifficultySelector
              show={!isActive}
              onDiffcultySelect={handleDifficultySelect}
            />
          </React.Fragment>
        }

        {isWon &&
          <Win
            difficulty={difficulty}
            seconds={seconds}
            onNewGame={handleReset}
          />

        }
      </Page>
    </ThemeProvider>
  );
};

export default App;
