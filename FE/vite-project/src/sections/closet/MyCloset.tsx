import { testclothesarr } from "../calendar/testclothesarr";
import { Header, ClosetContent, Item, Filter } from "./ClosetStyle";
import { useNavigate } from "react-router-dom";
import { useApi } from "@/hooks/useApi";
import { Loader } from "@/components/Loader";

const CATEGORY = ["전체", "상의", "바지", "스커트", "원피스"];

const SORT = ["최근 등록 순", "오래된 순", "많이 입은 순"];

const MyCloset = () => {
  const navigate = useNavigate();

  const handleDetailClick = (id: number) => {
    navigate(`/closet/${id}`);
  };

  console.log("render");

  // const { isLoading, isError, isSuccess, data } = useApi("get", "clothing");

  // console.log("------------------------------------------");
  // console.log(isError);
  // console.log(isLoading);
  // console.log(isSuccess);
  // console.log(data);
  return (
    <>
      <Header>
        <p className="title">내 옷장</p>
        <Filter>
          <select className="category" name="category">
            <option disabled selected style={{ textAlign: "center" }} hidden>
              카테고리
            </option>
            {CATEGORY.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <select className="category">
            <option disabled selected style={{ textAlign: "center" }} hidden>
              정렬
            </option>
            {SORT.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </Filter>
      </Header>
      {/* {data ? (
        <ClosetContent>
          {data.map((item) => {
            return (
              <Item
                key={item.clothingId}
                onClick={() => handleDetailClick(item.id)}
              >
                <div className="imgarea">
                  <img src={item.clothingImagePath} alt={item.clothingId} />
                </div>
              </Item>
            );
          })}
        </ClosetContent>
      ) : (
        <Loader />
      )} */}

      <ClosetContent>
        {testclothesarr.map((item) => {
          return (
            <Item key={item.id} onClick={() => handleDetailClick(item.id)}>
              <div className="imgarea">
                <img src={item.url} alt={item.url} />
              </div>
            </Item>
          );
        })}
      </ClosetContent>
    </>
  );
};

export default MyCloset;
