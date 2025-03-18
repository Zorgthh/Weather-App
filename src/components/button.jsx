import React from 'react';
import styled from 'styled-components';

const Button = ({onClick, unit}) => {
  return (
    <StyledWrapper>
      <div className="box-button max-w-80 mx-auto ">
        <div className="button" onClick={onClick}><span> Cambiar a {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}</span></div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .box-button {
    cursor: pointer;
    border: 4px solid black;
    background-color: gray;
    padding-bottom: 10px;
    transition: 0.1s ease-in-out;
    user-select: none;
  }

  .button {
    background-color: #dddddd;
    border: 4px solid #fff;
    padding: 3px 8px;
  }

  .button span {
    font-size: 1.2em;
    letter-spacing: 1px;
  }

  .box-button:active {
    padding: 0;
    margin-bottom: 10px;
    transform: translateY(10px);
  }`;

export default Button;
