import React from "react";
import styled from "styled-components";
import { Fonts } from "../../constants/styles";

interface CheckboxInputInterface {
  id: string;
  name: string;
  checked: boolean;
  onChange: Function;
}

const CheckboxStyled = styled.input`
  font-family: ${Fonts.FONT_FAMILY};
`;

const LabelStyled = styled.label`
  margin-left: 0.5em;
`;

const CheckboxInput: React.FC<CheckboxInputInterface> = (props) => {
  return (
    <div>
      <CheckboxStyled
        id={props.id}
        type="checkbox"
        name={props.name}
        onChange={(e: React.FormEvent<HTMLInputElement>) => props.onChange(e)}
      />
      <LabelStyled htmlFor={props.id}>{props.name}</LabelStyled>
    </div>
  );
};

export default CheckboxInput;
