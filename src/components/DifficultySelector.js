import React from 'react';
import styled from 'styled-components';
import Container from './Container';
import Button from './Button';

const StyledSection = styled.section`
  text-align: center;
  padding: 40px 0;
`;

const Levels = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    display: block;
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const DifficultySelector = ({
  show,
  onDiffcultySelect = () => {},
}) => {
  if (!show) return null;

  return (
    <StyledSection>
      <Container>
        <Levels>
          <Button onClick={() => onDiffcultySelect(1)}>Easy</Button>
          <Button onClick={() => onDiffcultySelect(2)}>Medium</Button>
          <Button onClick={() => onDiffcultySelect(3)}>Hard</Button>
        </Levels>
      </Container>
    </StyledSection>
  );
};

export default DifficultySelector;
