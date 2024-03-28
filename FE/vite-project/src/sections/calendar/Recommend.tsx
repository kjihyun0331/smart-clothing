import IconBack from "@/assets/ui/IconBack";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelectedDateStore } from "@/store/DateStore";
import { useApi } from "@/hooks/useApi";
import { Loader } from "@/components/Loader";

type userResponseType = {
  age: number;
  gender: string;
};

interface userQuery {
  isLoading: boolean;
  data: userResponseType;
}

function Recommend() {
  const navigate = useNavigate();
  const { selectedDate, selectedKeyword } = useSelectedDateStore();
  const { isLoading, data }: userQuery = useApi("get", "users");

  if (isLoading) return <Loader />;

  const userAge = Math.floor(data.age);
  const userGender = data?.gender;

  return (
    <>
      <Header style={{ height: "8dvh" }}>
        <IconBack onClick={() => navigate("/calendar")} />
        <p className="title">코디 추천</p>
      </Header>
      <RecommendContainer>
        <h2 className="comment">
          <span className="point">{selectedDate}</span> 예상 날씨와 <br />
          <span className="point">{selectedKeyword}</span> 키워드에 맞는 <br />
          <span className="point">{userAge}</span>대인{" "}
          <span className="point">{userGender}</span>를 위한 추천 코디
        </h2>
      </RecommendContainer>
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

const RecommendContainer = styled.div`
  width: 97%;
  box-sizing: border-box;
  padding: 1rem 5px;

  .comment {
    font-size: 1.5rem;
    line-height: 140%;
  }

  .point {
    color: ${(props) => props.theme.colors.pointcolor};
    font-size: 1.7rem;
    font-weight: bold;
  }
`;
