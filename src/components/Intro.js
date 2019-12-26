import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  padding: 0 8px;
  text-align: center;
`;

const Intro = ({
  show,
}) => {
  if (!show) return null;

  return (
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </Text>
  )
};

export default Intro;
