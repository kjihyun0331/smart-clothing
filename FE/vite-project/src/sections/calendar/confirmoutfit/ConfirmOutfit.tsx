import styled from "styled-components";
import { useSelectedItemsStore } from "@/store/ClothesStore";
import { useSelectedDateStore } from "@/store/DateStore";
import IconBack from "@/assets/ui/IconBack";
import IconCheck from "@/assets/ui/IconCheck";
import { useNavigate } from "react-router-dom";
import HashTag from "./HashTag";

const ConfirmOutfit = () => {
  const navigate = useNavigate();
  const { clearItems, confirmOutfit } = useSelectedItemsStore();
  const { selectedDate } = useSelectedDateStore();

  //   console.log(confirmOutfit);
  //   const clearItems = useSelectedItemsStore((state) => state.clearItems);
  //   clearItems();

  return (
    <>
      <Header>
        <IconBack onClick={() => navigate("/calendar/makeoutfit")} />
        <IconCheck
          onClick={() => {
            navigate("/calendar");
            clearItems();
          }}
        />
      </Header>
      <Wrapper>
        <p className="date">{selectedDate}</p>
        <div className="imgarea">
          <img src={confirmOutfit} alt="confirmOutfit" />
        </div>
        <HashTag />
      </Wrapper>
    </>
  );
};

export default ConfirmOutfit;

const Header = styled.div`
  padding: 8px 8px 0 8px;
  height: 7dvh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  margin-left: auto;
  margin-right: auto;
  overflow-y: auto;

  .date {
    font-size: 1rem;
    align-self: self-start;
  }

  .imgarea {
    margin: 1rem 0 0 0;
    width: 80%;
    aspect-ratio: 1 / 1;
    background-color: #fcdddd;
    border-radius: 20px;
    padding: 1rem 1rem;
  }

  img {
    width: 100%;
    object-fit: contain;
  }
`;
