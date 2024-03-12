import { Container, Title, Form, Button } from "@/pages/smartStyle";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handlelogin = (): void => {
    localStorage.setItem("token", "dummyuser");
    navigate("/smarthome");
  };

  return (
    <Container>
      <Title>SmartThings</Title>
      <Form>
        <p className="formtitle">삼성 계정으로 로그인</p>
        <input className="forminput" type="text" placeholder="전화번호" />
        <input className="forminput" type="password" placeholder="비밀번호" />
        <Button onClick={handlelogin}>로그인</Button>
        <p className="extra">ID 찾기 또는 비밀번호 재설정</p>
        <p className="extra">계정 생성</p>
      </Form>
    </Container>
  );
}

export default Login;
