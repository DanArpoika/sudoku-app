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

const EASY = 1;
const MEDIUM = 2;
const HARD = 3;

const App = () => {
  const [difficulty, setDifficulty] = useState(EASY);
  const [isActive, setActive] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleNewGame = () => {
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
