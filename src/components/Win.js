import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { rem, lighten, position } from 'polished';
import sec2time from '../util/sec2time';
import Button from './Button';
import axios from 'axios';
import Filter from 'bad-words';

const StyledSection = styled.section`
  padding: 40px;
  text-align: center;
`;

const Completed = styled.h2`
  text-transform: uppercase;
  font-size: ${rem(60)};
  letter-spacing: .25em;
`;

const Time = styled.time`
  display: block;
  font-size: ${rem(28)};
  margin: 20px 0;
`;

const Input = styled.input`
  display: block;
  appearance: none;
  padding: 20px 14px;
  margin: 40px auto 0;
  border: 1px solid ${props => props.theme.secondaryAccent};
  background-color: ${props => lighten(.05, props.theme.background)};
  min-width: 300px;
  color: ${props => props.theme.white};
  font-size: ${rem(18)};
  font-family: ${props => props.theme.mainFont};

  ${props => props.sent && css`
  text-align: center;
    border: 0;
    background: transparent;
    width: 100%;
  `}
`;

const InputWrap = styled.div`
  position: relative;
`;

const Error = styled.span`
  ${position('absolute', null, 0, -20, 0)}
  font-size: ${rem(10)};
  color: ${props => props.theme.warning};
`;

const Wrap = styled.div`
  max-width: 300px;
  margin: 40px auto 0;
  display: flex;
  justify-content: ${props => props.sent ? 'center' : 'space-between'};
  align-items: center;

  * {
    margin-right: 12px;
  }
`;

const Win = ({
  seconds,
  difficulty,
  onNewGame = () => {},
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitted, setSubmitted] = useState(false);

  const handleInput = (e) => {
    const { value } = e.target;

    setName(value);
  }

  const handleSubmit = () => {
    const filter = new Filter({ regex: /\*|\.|$/gi });

    if (name === '') {
      return setError('Please enter a name for your score.');
    }

    if (filter.isProfane(name)) {
      return setError('Your name contains inappropriate language.');
    }

    if (error) setError(null);

    setSubmitted(true);

    axios.post('/.netlify/score', { seconds, name, difficulty });
  };

  return (
    <StyledSection>
      <Completed>Completed</Completed>
      <Time>{sec2time(seconds)}</Time>
      <p>Submit your score for your chance at being in the high scores!</p>

      <InputWrap>
        <Input
          value={isSubmitted ? `Score submitted, ${name}!` : name}
          onChange={handleInput}
          disabled={isSubmitted}
          sent={isSubmitted}
        />

        {error &&
          <Error>{error}</Error>
        }
      </InputWrap>

      <Wrap sent={isSubmitted}>
        {!isSubmitted &&
          <Button onClick={handleSubmit}>Submit</Button>
        }
        <Button onClick={onNewGame}>New Game</Button>
      </Wrap>
    </StyledSection>
  );
};

export default Win;
