import { Header, UpdateContent } from "./ClosetStyle";
import IconBack from "@/assets/ui/IconBack";
import IconCloseSmall from "@/assets/ui/IconCloseSmall";
import { useEffect, useState, useReducer } from "react";
import { theme } from "@/styles/theme";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "@/hooks/useApi";
import { Loader } from "@/components/Loader";

type DetailClothesResponseDataType = {
  clothingId: 0;
  nowAt: "string";
  clothingName: "string";
  washedAt: "string";
  polluted: 0;
  category: "string";
  styleList: ["string"];
  season: [0];
  clothingImgPath: "string";
  textureList: ["string"];
};

interface DetailClothesResponseType {
  isLoading: boolean;
  data: DetailClothesResponseDataType;
}

const MONTH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ACTION_TYPES = {
  set: "set",
  add: "add",
  delete: "delete",
  updateClothingName: "updateClothingName", // clothingName 업데이트를 위한 액션 타입 추가
};

// 리듀서 함수
const reducer = (state, action) => {
  console.log("reducer가 일을 하는 중", state, action);
  switch (action.type) {
    case ACTION_TYPES.set:
      return { ...state, ...action.payload };
    case ACTION_TYPES.add:
      return state + action.payload;
    case ACTION_TYPES.delete:
      return state - action.payload;
    case ACTION_TYPES.updateClothingName: // clothingName 업데이트 케이스 처리
      return { ...state, clothingName: action.payload };
    default:
      return state;
  }
};

// 초기 상태
const initialState = {
  clothingId: 0,
  nowAt: "",
  clothingName: "",
  washedAt: "",
  polluted: 0,
  category: "",
  styleList: [""],
  season: [],
  clothingImgPath: "",
  textureList: [""],
};

const UpdateClothes = () => {
  const { id } = useParams();
  const [value, dispatch] = useReducer(reducer, initialState);
  const { isLoading, data } = useApi("get", `clothing/${id}`);

  // data 변경 시 상태 업데이트
  useEffect(() => {
    if (data) {
      dispatch({ type: ACTION_TYPES.set, payload: data });
    }
  }, [data]);

  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.back();
  };

  const toggleMonthClick = (item: number) => {
    console.log(item);
  };
  // const toggleMonthClick = (item: number) => {
  //   const isSelected = selectedMonth.some((m) => item === m);
  //   if (isSelected) {
  //     setSelectedMonth(selectedMonth.filter((element) => element !== item));
  //   } else {
  //     setSelectedMonth((prev: number[]) => [...prev, item]);
  //   }
  // };
  const handleChange = (event) => {
    const { value } = event.target;
    dispatch({ type: ACTION_TYPES.updateClothingName, payload: value });
  };
  if (isLoading) return <Loader />;
  return (
    <>
      <Header>
        <IconBack onClick={handleGoBack} />
        <p className="title">옷 정보 수정</p>
      </Header>
      <UpdateContent>
        <div className="titlearea">
          <span className="title">별칭</span>
        </div>
        <input type="text" value={value.clothingName} onChange={handleChange} />
        <div className="titlearea">
          <span className="title">카테고리</span>
          {/* {clothestype.map((item) => {
            return (
              <span key={item} className="tag">
                {item}
                <IconCloseSmall />
              </span>
            );
          })} */}
        </div>
        <input type="text" value={value.category} />

        <div className="titlearea">
          <span className="title">소재</span>
          {value.textureList.map((item) => {
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
            const isSelected = value.season.some((m) => {
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
          {value.styleList.map((item) => {
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
          {["김싸피", "김싸피1"].map((item) => {
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
