import IconBack from "@/assets/ui/IconBack";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Recommend() {
  const navigate = useNavigate();

  return (
    <>
      <Header style={{ height: "8dvh" }}>
        <IconBack onClick={() => navigate("/calendar")} />
        <p className="title">코디 추천</p>
      </Header>
    </>
  );
}

export default Recommend;

const Header = styled.div`
  height: 6dvh;
  ${({ theme }) => theme.common.flexCenter};
  background-color: white;
  padding: 8px 8px 0 8px;

  .title {
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
  }
`;
