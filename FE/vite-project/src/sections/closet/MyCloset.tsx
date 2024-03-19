import { testclothesarr } from "../calendar/testclothesarr";
import { Header, Filter, Content, Item } from "./ClosetStyle";
import { useNavigate } from "react-router-dom";

const MyCloset = () => {
  const navigate = useNavigate();

  const handleDetailClick = (id: number) => {
    navigate(`/closet/${id}`);
  };

  return (
    <>
      <Header>
        <p className="title">내 옷장</p>
        <Filter>카테고리, 정렬</Filter>
      </Header>

      <Content>
        {testclothesarr.map((item) => {
          return (
            <Item key={item.id} onClick={() => handleDetailClick(item.id)}>
              <div className="imgarea">
                <img src={item.url} alt={item.keyword} />
              </div>
              <div className="keyword">{item.keyword}</div>
            </Item>
          );
        })}
      </Content>
    </>
  );
};

export default MyCloset;
