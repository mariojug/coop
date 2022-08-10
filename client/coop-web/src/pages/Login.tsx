import React, { useState } from "react";

import styled from "styled-components";

import TextInput from "../components/styled/TextInput";
import Button from "../components/styled/Button";
import InlineTextLink from "../components/styled/InlineTextLink";

interface LoginInterface {
  children?: JSX.Element;
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  font-size: 1.25rem;
`;

const TextContainer = styled.div`
  font-size: 1rem;
`;

const LoginWrapper: React.FC<LoginInterface> = (props) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = (e: React.ChangeEvent<HTMLButtonElement>) => {
    console.log("dummy function");
  };

  return (
    <LoginContainer>
      <h1>Welcome back to CoOp!</h1>
      <h2>Log into your account</h2>
      <form>
        <TextInput
          id="email"
          label="Email"
          type="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setEmail(e.target.value)
          }
          placeholder="Enter your email here"
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setPassword(e.target.value)
          }
          placeholder="Enter your password here"
        />

        <div style={{ height: "1rem" }}></div>
        <Button
          onClick={(e: React.ChangeEvent<HTMLButtonElement>) => handleSubmit(e)}
          text="Log in"
        />
      </form>

      <TextContainer>
        <p>
          Don't have an account? Sign up{" "}
          <InlineTextLink href="/signup">here</InlineTextLink>
        </p>
      </TextContainer>
    </LoginContainer>
  );
};

export default LoginWrapper;
