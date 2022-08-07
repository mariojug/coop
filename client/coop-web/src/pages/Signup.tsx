import React, { useState, useEffect } from "react";
import styled from "styled-components";

import TextInput from "../components/styled/TextInput";
import Button from "../components/styled/Button";

import { ElementColors } from "../constants/styles";

interface WrapperProps {
  children?: JSX.Element;
}

const SignupContainer = styled.div`
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

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
`;

const PasswordErrorContainer = styled.div`
  background-color: ${ElementColors.ERROR_BACKGROUND};
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  margin: 0;
  align-items: center;
  justify-content: center;
  border-radius: 1em;
  font-size: 0.9rem;
`;

const SignupWrapper: React.FC<WrapperProps> = (props) => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log("dummy function");
  };

  useEffect((): void => {
    if (password && confirmPassword) {
      setShowPasswordError(password !== confirmPassword);
    } else if (confirmPassword && !password) {
      setShowPasswordError(true);
    }
  }, [password, confirmPassword]);

  return (
    <SignupContainer>
      <h1>Welcome to CoOp!</h1>
      <h2>Create a new account</h2>
      <form>
        <NameContainer>
          <TextInput
            id="firstName"
            label="First name"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setFirstName(e.target.value)
            }
            placeholder="First name"
          />
          <div style={{ width: "0.5rem" }}></div>
          <TextInput
            id="lastName"
            label="Last name"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setLastName(e.target.value)
            }
            placeholder="Last name"
          />
        </NameContainer>
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
          id="Password"
          label="Password"
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setPassword(e.target.value)
          }
          placeholder="Enter your password here"
        />
        <TextInput
          id="ConfirmPassword"
          label="Confirm Password"
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setConfirmPassword(e.target.value)
          }
          placeholder="Confirm password"
        />
        {showPasswordError ? (
          <>
            <div style={{ height: "1rem" }}></div>{" "}
            <PasswordErrorContainer>
              Passwords do not match.
            </PasswordErrorContainer>
          </>
        ) : (
          <></>
        )}
        <div style={{ height: "1rem" }}></div>

        <Button
          onClick={(e: React.ChangeEvent<HTMLButtonElement>) => handleSubmit()}
          text="Sign up"
        />
      </form>
    </SignupContainer>
  );
};

export default SignupWrapper;
