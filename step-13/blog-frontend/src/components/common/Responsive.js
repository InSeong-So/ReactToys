import React from 'react';
import styled from 'styled-components';

const StyledResponsive = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto;

  @media(max-width: 1024px){
    width: 768px;
  }

  @media(max-width: 768px){
    width: 100%;
  }
`;

// style, className, onClick, onMouseMove 등의 props를 사용할 수 있게 rest 파라미터로 전달
const Responsive = ({ children, ...rest }) => {
  return <StyledResponsive {...rest}>{children}</StyledResponsive>;
};

export default Responsive;
