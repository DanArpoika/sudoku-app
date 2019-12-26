import React from 'react';
import styled from 'styled-components';
import { rem, position } from 'polished';

const StyledNav = styled.nav`
  ${position('absolute', 0, 0, null, 0)}
  padding: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HighScores = styled.span`
  text-transform: uppercase;
  font-size: ${rem(12)};
`;

const Logo = styled.h1`
  text-transform: uppercase;
`;

const Header = () => (
  <StyledNav>
    <Logo>
      sudoku
    </Logo>

    <HighScores>High Scores</HighScores>
  </StyledNav>
);

export default Header;
