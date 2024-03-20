import { Header, UpdateContent } from "./ClosetStyle";
import IconBack from "@/assets/ui/IconBack";
import IconCloseSmall from "@/assets/ui/IconCloseSmall";
import { useState } from "react";
import { theme } from "@/styles/theme";
import { useNavigate, useParams } from "react-router-dom";

const MONTH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const UpdateClothes = () => {
  const { id } = useParams();
  console.log(`${id} 이용해서 요청보내기`);

  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.back();
  };

  const [clothestype, setclothestype] = useState(["스웨터", "니트", "가디건"]);
  const [selectedMonth, setSelectedMonth] = useState([]);

  const toggleMonthClick = (item: number) => {
    const isSelected = selectedMonth.some((m) => item === m);
    if (isSelected) {
      setSelectedMonth(selectedMonth.filter((element) => element !== item));
    } else {
      setSelectedMonth((prev: number[]) => [...prev, item]);
    }
  };

  return (
    <>
      <Header>
        <IconBack onClick={handleGoBack} />
        <p className="title">옷 정보 수정</p>
      </Header>
      <UpdateContent>
        <div className="titlearea">
          <span className="title">타입</span>{" "}
          {clothestype.map((item) => {
            return (
              <span key={item} className="tag">
                {item}
                <IconCloseSmall />
              </span>
            );
          })}
        </div>
        <input type="text" />

        <div className="titlearea">
          <span className="title">소재</span>{" "}
          {clothestype.map((item) => {
            return (
              <span key={item} className="tag">
                {item}
                <IconCloseSmall />
              </span>
            );
          })}
        </div>
        <input type="text" />

        <div className="titlearea">
          <span className="title">월</span>{" "}
        </div>
        <div className="month">
          {MONTH.map((item) => {
            const isSelected = selectedMonth.some((m) => {
              return item === m;
            });
            return (
              <button
                key={item}
                onClick={() => toggleMonthClick(item)}
                className="month-tag"
                style={{
                  backgroundColor: isSelected
                    ? theme.colors.pointcolor
                    : theme.colors.backgroundcolor,
                  color: isSelected ? "white" : "black",
                }}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="titlearea">
          <span className="title">키워드</span>{" "}
          {clothestype.map((item) => {
            return (
              <span key={item} className="tag">
                {item}
                <IconCloseSmall />
              </span>
            );
          })}
        </div>
        <input type="text" />

        <div className="titlearea">
          <span className="title">같이 입는 사람</span>{" "}
          {clothestype.map((item) => {
            return (
              <span key={item} className="tag">
                {item}
                <IconCloseSmall />
              </span>
            );
          })}
        </div>
        <input type="text" />

        <button className="finish"> 완료 </button>
      </UpdateContent>
    </>
  );
};

export default UpdateClothes;
