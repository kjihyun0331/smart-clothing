import styled from "styled-components";
import SamsungLogo from "@/assets/ui/samsungLogo";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function Agreement() {
  const navigate = useNavigate();
  return (
    <Container>
      <SamsungLogo />

      <ButtonGroup>
        <Button1>취소</Button1>
        <Button2 onClick={() => navigate("/home")}>동의</Button2>
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: white;
  box-sizing: border-box;
  padding: 2rem 2rem;
`;

const ButtonGroup = styled.div`
  height: 20dvh;
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 1rem;
`;

const Button1 = styled.button`
  width: 20%;
  background-color: #e8e8e8;
  border: none;
  color: black;
  border-radius: 20px;
  height: 2.5rem;
  font-size: 0.8rem;
  font-weight: bold;
`;

const Button2 = styled.button`
  width: 70%;
  border: none;
  background-color: ${theme.colors.blue};
  color: white;
  border-radius: 20px;
  height: 2.5rem;
  font-size: 0.8rem;
  font-weight: bold;
`;
