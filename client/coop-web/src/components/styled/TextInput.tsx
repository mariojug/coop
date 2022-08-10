import { ElementColors, Fonts } from "../../constants/styles";
import React from "react";
import styled from "styled-components";

interface TextInputInterface {
  id: string;
  label?: string;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  defaultValue?: string;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  font-size: 0.9rem;
  padding-bottom: 0.5em;
  align-items: center;
`;

const StyledLabel = styled.label`
  /* margin-left: 0.5em; */
  font-weight: bold;
  margin-bottom: -0.25em;
`;

const StyledInput = styled.input`
  font-family: ${Fonts.FONT_FAMILY};
  text-align: center;
  font-weight: 650;
  width: 100%;
  margin: 0.5rem 0rem;
  padding: 0.7rem;
  border-radius: 0.75em;
  border: none;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */

  :focus {
    transition: ease-in-out, width 0.35s ease-in-out;
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    font-weight: 700;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-weight: 700;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    font-weight: 700;
  }
`;

const TextInput: React.FC<TextInputInterface> = (props) => {
  return (
    <InputContainer>
      {props.label ? (
        <StyledLabel htmlFor={props.id}>{props.label}</StyledLabel>
      ) : (
        <></>
      )}
      <StyledInput
        id={props.id}
        type={props.type}
        onChange={(e) => props.onChange(e)}
        placeholder={props.placeholder! || ""}
        defaultValue={props.defaultValue}
      />
    </InputContainer>
  );
};

export default TextInput;
