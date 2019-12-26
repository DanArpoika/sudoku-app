import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import Board from './components/Board';
import Page from './components/Page';
import theme from './styles/theme';
import Intro from './components/Intro';
import Controls from './components/Controls';

import GlobalStyle from './styles/global-style';
import DifficultySelector from './components/DifficultySelector';
import Sudoku from './util/sudoku.class';

const EASY = 1;
const MEDIUM = 2;
const HARD = 3;

const App = () => {
  const [difficulty, setDifficulty] = useState(EASY);
  const [isActive, setActive] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [game, setGame] = useState({});

  const handleNewGame = () => {
    const board = new Sudoku();
    board.newGame();

    setGame(board);
    setActive(true);
    setLoading(true);
  };

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    handleNewGame();
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        <Intro show={!isActive} />
        <Controls
          onNewGame={handleNewGame}
          show={isActive}
        />
        <Board
          show={isActive}
          loading={isLoading}
          game={game}
        />
        <DifficultySelector
          show={!isActive}
          onDiffcultySelect={handleDifficultySelect}
        />
      </Page>
    </ThemeProvider>
  );
};

export default App;
