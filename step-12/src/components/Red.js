import React from 'react';
import styled from 'styled-components';

const RedDiv = styled.div`
  background:red;
  font-size: 1.5rem;
  color: white;
  width: 128px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Red = () => {
  return <RedDiv>Red</RedDiv>;
};

export default Red;
