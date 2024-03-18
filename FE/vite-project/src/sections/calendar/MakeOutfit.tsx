import { imgarr } from "./testimgarr";
import styled from "styled-components";
import { useSelectedItemsStore } from "@/store/ClothesStore";
import Canvas from "./Canvas";
// import { useState, useEffect } from "react";
// import { Loader } from "@/components/Loader";
import IconBack from "@/assets/ui/IconBack";
import { useNavigate } from "react-router-dom";

const MakeOutfit = () => {
  // const [showCanvas, setShowCanvas] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // 컴포넌트가 마운트된 후 2초 뒤에 showCanvas 상태를 true로 설정
  //   const timer = setTimeout(() => {
  //     setShowCanvas(true);
  //   }, 500);

  //   // 컴포넌트가 언마운트되거나 업데이트되기 전에 타이머를 정리
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []); // 빈 의존성 배열을 전달하여 컴포넌트 마운트 시에만 useEffect가 실행되도록 함

  return (
    <>
      <Header style={{ height: "6dvh" }}>
        <IconBack onClick={() => navigate("/calendar")} />
        <p className="title">옷장에서 코디 고르기</p>
      </Header>
      {/* {showCanvas ? <Canvas /> : <Loader />} */}
      <Canvas />
      <ChooseClothes />
    </>
  );
};

export default MakeOutfit;

const ChooseClothes = () => {
  // const { selectedItems, toggleItem } = useSelectedItemsStore();
  const { selectedItems, toggleItem } = useSelectedItemsStore();

  return (
    <ChooseClothesWrapper>
      {imgarr.map((item) => {
        // 선택된 아이템인지 확인합니다.
        const isSelected = selectedItems.some(
          (selectedItem: { id: string }) => selectedItem.id === item.id
        );

        return (
          <div
            className={`imgarea ${isSelected ? "selected" : ""}`}
            key={item.id}
            onClick={() => toggleItem(item)}
          >
            <img className="clothesimg" src={item.url} alt={item.id} />
            {isSelected && <div className="itemId">{item.id}</div>}
          </div>
        );
      })}
    </ChooseClothesWrapper>
  );
};

const ChooseClothesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: lightgray;
  height: 45dvh;
  gap: 3px;
  align-content: baseline;
  padding: 3px 0 calc(12dvh + 3px) 3px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  .imgarea {
    width: calc((100% / 3 - 3px));
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 10px;
    position: relative;
  }

  .clothesimg {
    width: 90%;
  }

  .imgarea.selected {
    filter: contrast(0.5);
  }

  .itemId {
    /* id 스타일링 */
    position: absolute;
    bottom: 50%; /* 중간에 위치 */
    left: 50%;
    transform: translate(-50%, -50%); /* 정확한 중앙 정렬을 위해 */
    color: black; /* 글자색 */
    font-size: 20px; /* 글자 크기 */
    z-index: 10; /* 이미지 위에 표시 */
  }
`;

/* ${({ theme }) => theme.common.flexCenterColumn}; */

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
