import React from 'react';
import styled from 'styled-components';

const BlueDiv = styled.div`
  background:blue;
  font-size: 1.5rem;
  color: white;
  width: 128px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Blue = () => {
  return <BlueDiv>Blue</BlueDiv>;
};

export default Blue;
