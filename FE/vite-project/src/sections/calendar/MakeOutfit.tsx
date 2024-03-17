import { useState } from "react";
import { imgarr } from "./testimgarr";
import styled from "styled-components";

const MakeOutfit = () => {
  return (
    <div>
      <p style={{ height: "6dvh", backgroundColor: "pink" }}>옷 고르기~</p>
      <Canvas />
      <ChooseClothes />
    </div>
  );
};

export default MakeOutfit;

const Canvas = () => {
  return (
    <CanvasWrapper>
      <p>canvas</p>
      <div></div>
    </CanvasWrapper>
  );
};

const CanvasWrapper = styled.div`
  width: 100%;
  height: 49dvh;
  background-color: green;
`;

const ChooseClothes = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (item) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id
    );

    if (isSelected) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <ChooseClothesWrapper>
      {imgarr.map((item) => {
        // 선택된 아이템인지 확인
        const isSelected = selectedItems.some(
          (selectedItem) => selectedItem.id === item.id
        );

        return (
          <div
            className={`imgarea ${isSelected ? "selected" : ""}`}
            key={item.id}
            onClick={() => handleItemClick(item)}
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
