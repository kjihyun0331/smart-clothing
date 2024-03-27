import { Header, UpdateContent } from "./ClosetStyle";
import IconBack from "@/assets/ui/IconBack";
import IconCloseSmall from "@/assets/ui/IconCloseSmall";
import { useEffect, useState, useReducer, useRef } from "react";
import { theme } from "@/styles/theme";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "@/hooks/useApi";
import { Loader } from "@/components/Loader";
import CategoryDropDown from "./CategoryDropDown";
import { DetailClothesResponseDataType } from "@/types/ClothesTypes";
import {
  ACTION_TYPES,
  initialState,
  clothesreducer,
} from "@/reducers/updateClothesReducer";
interface DetailClothesResponseType {
  isLoading: boolean;
  data: DetailClothesResponseDataType;
}

const MONTH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const UpdateClothes = () => {
  const { id } = useParams();
  const [value, dispatch] = useReducer(clothesreducer, initialState);
  const { isLoading, data }: DetailClothesResponseType = useApi(
    "get",
    `clothing/${id}`
  );

  useEffect(() => {
    if (data) {
      dispatch({ type: ACTION_TYPES.set, payload: data });
    }
  }, [data]);

  const [viewCategory, setViewCategory] = useState(false);

  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleKeyUp = (event) => {
    const { value } = event.target;
    const key = event.key;
    switch (key) {
      case "Enter":
        dispatch({ type: ACTION_TYPES.updateClothingName, payload: value });
        break;
      default:
    }
  };

  const handleDispatch = (actionType, value) => {
    dispatch({ type: actionType, payload: value });
  };

  const handleFinish = () => {
    console.log(value);
    navigate(`/closet/${id}`);
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
        <input
          type="text"
          defaultValue={value.clothingName}
          onKeyUp={handleKeyUp}
        />
        <div className="titlearea">
          <span className="title">카테고리</span>
        </div>
        <div
          className="input"
          onClick={() => {
            setViewCategory(!viewCategory);
          }}
        >
          {value.category} <span>{viewCategory ? "▲" : "▼"}</span>
          {viewCategory && <CategoryDropDown handleDispatch={handleDispatch} />}
        </div>

        <div className="titlearea">
          <span className="title">소재</span>
          {value.textures.map((item) => {
            return (
              <span
                key={item}
                className="tag"
                onClick={() => handleDispatch(ACTION_TYPES.deleteTexture, item)}
              >
                {item}
                <IconCloseSmall />
              </span>
            );
          })}
        </div>
        <input type="text" />

        <div className="titlearea">
          <span className="title">월</span>
        </div>
        <div className="month">
          {MONTH.map((item) => {
            const isSelected = value.seasons.some((m) => {
              return item === m;
            });
            return (
              <button
                key={item}
                onClick={() => handleDispatch(ACTION_TYPES.toggleMonth, item)}
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
          <span className="title">스타일</span>{" "}
          {value.styles.map((item) => {
            return (
              <span
                key={item}
                className="tag"
                onClick={() => handleDispatch(ACTION_TYPES.deleteStyle, item)}
              >
                {item}
                <IconCloseSmall />
              </span>
            );
          })}
        </div>
        <input type="text" />

        <div className="titlearea">
          <span className="title">같이 입는 사람</span>{" "}
          {value.sharedUsers.map((item) => {
            return (
              <span key={item.userId} className="tag">
                {item.userName}
                <IconCloseSmall />
              </span>
            );
          })}
        </div>
        <input type="text" />

        <button className="finish" onClick={handleFinish}>
          {" "}
          완료{" "}
        </button>
      </UpdateContent>
    </>
  );
};

export default UpdateClothes;
