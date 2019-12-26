import React from 'react';
import styled from 'styled-components';
import Container from './Container';
import Header from './Header';
import Footer from './Footer';

const Wrap = styled.div`
  padding: 40px;
  display: flex;
  height: 100vh;
`;

const ChildrenWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Page = ({
  children,
}) => {
  return (
    <Wrap>
      <Header />
      <Container>
        <ChildrenWrap>
          {children}
        </ChildrenWrap>
        <Footer />
      </Container>
    </Wrap>
  );
};

export default Page;
