import React from "react";
import styled from "styled-components";
import { ElementColors, Fonts } from "../../constants/styles";

interface InlineTextProps {
  href?: string | "#";
  children?: JSX.Element;
}

const TextLinkStyled = styled.a`
  color: ${ElementColors.LINK_TEXT_DARK_MODE};
  :hover {
    color: ${ElementColors.LINK_TEXT_HOVER_DARK_MODE};
  }
  :visited {
    color: ${ElementColors.LINK_TEXT_DARK_MODE};
  }
`;

const TextLink: React.FC<InlineTextProps> = (props) => {
  return <TextLinkStyled href={props.href}>{props.children}</TextLinkStyled>;
};

export default TextLinkStyled;
