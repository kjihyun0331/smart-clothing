import styled from "styled-components";
import IconBack from "@/assets/ui/IconBack";
import { useNavigate } from "react-router-dom";
import { testclothesarr } from "./testclothesarr";
import { useSelectedItemsStore } from "@/store/ClothesStore";

function Past() {
  const navigate = useNavigate();
  const { setConfirmOutfit } = useSelectedItemsStore();

  return (
    <>
      <Header style={{ height: "8dvh" }}>
        <IconBack onClick={() => navigate("/calendar")} />
        <p className="title">내 과거 코디에서 고르기</p>
      </Header>
      <Content>
        {testclothesarr.map((item) => {
          return (
            <Item
              key={item.id}
              onClick={() => {
                setConfirmOutfit(item.url);
                navigate("/calendar/confirmoutfit");
              }}
            >
              <span className="date">{item.date}</span>
              <div className="keyword">{item.keyword}</div>
              <div className="weather">
                [icon] {item.weatherhigh}°C / {item.weatherlow}°C
              </div>
              <div className="imgarea">
                <img src={item.url} alt={item.keyword} />
              </div>
            </Item>
          );
        })}
      </Content>
    </>
  );
}

export default Past;

const Header = styled.div`
  height: 6dvh;
  ${({ theme }) => theme.common.flexCenter};
  background-color: white;
  padding: 10px 8px 0 8px;

  .title {
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Content = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  background-color: ${(props) => props.theme.colors.backgroundcolor};
`;

const Item = styled.div`
  width: 100%;
  padding: 10px 10px;

  .date {
    font-size: 1.2rem;
    margin-right: 1rem;
  }

  .keyword {
    display: inline-block;
    border-radius: 10px;
    background-color: lightblue;
    padding: 4px 10px;
    color: white;
  }

  .weather {
    font-size: 0.8rem;
    color: gray;
    margin: 0.5rem 0;
  }

  .imgarea {
    width: 100%;
    aspect-ratio: 1/1;
    height: auto;
    border-radius: 10px;
    background-color: #9db49d;

    img {
      width: 100%;
      object-fit: fill;
    }
  }
`;
