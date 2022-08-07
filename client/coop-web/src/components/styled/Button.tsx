import React from "react";
import styled from "styled-components";
import { ElementColors, Fonts } from "../../constants/styles";

interface ButtonProps {
  onClick: Function;
  text: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const Btn = styled.button`
    background-color: ${ElementColors.BUTTON_DARK_MODE};
    color: ${ElementColors.BUTTON_TEXT_DARK_MODE};
    font-family: ${Fonts.FONT_FAMILY};
    text-align: center;
    font-weight: 650;
    width: 100%;
    margin: 0.25rem 0rem;
    padding: 0.5rem;
    border-radius: 1em;
    border: none;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box; /* Firefox, other Gecko */
    box-sizing: border-box; /* Opera/IE 8+ */
  `;
  return <Btn onClick={(e) => props.onClick(e)}>{props.text}</Btn>;
};

export default Button;
