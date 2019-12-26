import React from 'react';
import styled from 'styled-components';
import { position } from 'polished';
import Git from './icons/Git';

const StyledFooter = styled.footer`
  ${position('absolute', null, 0, 0, 0)}
  padding: 40px;
`;

const Footer = () => (
  <StyledFooter>
    <a href="https://github.com/DanArpoika">
      <Git size={26} />
    </a>
  </StyledFooter>
);

export default Footer;
