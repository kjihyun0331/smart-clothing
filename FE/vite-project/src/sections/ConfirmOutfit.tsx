import styled from "styled-components";
import { useSelectedItemsStore } from "@/store/ClothesStore";
import { useSelectedDateStore } from "@/store/DateStore";
import IconBack from "@/assets/ui/IconBack";
import IconCheck from "@/assets/ui/IconCheck";
import { useNavigate } from "react-router-dom";

const ConfirmOutfit = () => {
  const navigate = useNavigate();
  const confirmOutfit = useSelectedItemsStore((state) => state.confirmOutfit);
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);

  //   console.log(confirmOutfit);
  //   const clearItems = useSelectedItemsStore((state) => state.clearItems);
  //   clearItems();

  return (
    <>
      <Header>
        <IconBack onClick={() => navigate("/calendar/makeoutfit")} />
        <IconCheck onClick={() => navigate("/calendar")} />
      </Header>
      <Wrapper>
        <p>{selectedDate}</p>
        <div className="imgarea">
          <img src={confirmOutfit} alt="confirmOutfit" />
        </div>
      </Wrapper>
    </>
  );
};

export default ConfirmOutfit;

const Header = styled.div`
  padding: 8px 8px 0 8px;
  height: 6dvh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

const Wrapper = styled.div`
  width: 100%;

  .imgarea {
    margin-top: 1rem;
    width: 80%;
    aspect-ratio: 1 / 1.2;
    background-color: #fcdddd;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    padding: 1rem 1rem;
  }

  img {
    width: 100%;
    object-fit: contain;
  }
`;
