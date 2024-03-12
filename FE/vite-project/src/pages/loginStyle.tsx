import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  background: linear-gradient(45deg, #99a1cb, #5f8db8);
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const Form = styled.div`
  background-color: white;
  width: 80%;
  height: 45%;
  border-radius: 10px;
  position: absolute;
  box-sizing: border-box;
  padding: 4rem 2rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  ${({ theme }) => theme.common.flexCenterColumn};
  row-gap: 1rem;

  .formtitle {
    color: ${theme.colors.blue};
    font-size: 1.7rem;
    word-spacing: -0.2rem;
    display: inline-block;
    white-space: nowrap;
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid grey;
    transition: border-bottom-width 0.2s ease, border-bottom-color 0.5s ease;
  }

  input::placeholder {
    color: lightgrey;
  }

  input:focus {
    border-bottom: 1px solid ${theme.colors.blue};
  }

  .extra {
    align-self: baseline;
    font-size: 0.6rem;
    border-bottom: 1px solid #afafaf;
    color: #afafaf;
  }
`;

export const Title = styled.p`
  color: white;
  font-size: 2.2rem;
  align-self: baseline;
  letter-spacing: 0.05rem;
  position: absolute;
  top: 15%;
  left: 30%;
  transform: translate(-50%, -50%);
`;

export const Button = styled.button`
  border: none;
  background-color: ${theme.colors.blue};
  color: white;
  border-radius: 20px;
  width: 80%;
  height: 2.5rem;
  font-size: 1rem;
`;

export const Plus = styled.div`
  font-size: 2.5rem;
  color: white;
  position: absolute;
  top: 15%;
  right: 5%;
  transform: translate(-50%, -50%);
`;
