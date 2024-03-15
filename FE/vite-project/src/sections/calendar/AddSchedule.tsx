import styled from "styled-components";
import IconClose from "@/assets/ui/IconClose";
import { situation } from "./config-schedule";
import { useState } from "react";
import { theme } from "@/styles/theme";
import { outfitSelectionOptions } from "./config-schedule";
import { useNavigate } from "react-router-dom";

interface propType {
  selected: string | null;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddSchedule = ({ selected, setPopup }: propType) => {
  const navigator = useNavigate();
  const close = () => {
    setPopup(false);
  };
  const [selectedSituations, setSelectedSituations] = useState<string[]>([]);

  const handleButtonClick = (itemName: string) => {
    if (selectedSituations.includes(itemName)) {
      setSelectedSituations(
        selectedSituations.filter((item) => item !== itemName)
      );
    } else {
      setSelectedSituations([...selectedSituations, itemName]);
    }
  };

  const [title, setTitle] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <AddSKEDPopUp>
      <Container>
        <IconClose onClick={close} />
        <p className="date">{selected}</p>
        <div className="buttongroup">
          {situation.map((item) => (
            <button
              className="situation"
              key={item.name} // React의 리스트 렌더링에서 key는 필수입니다.
              onClick={() => handleButtonClick(item.name)}
              style={{
                backgroundColor: selectedSituations.includes(item.name)
                  ? theme.colors.grey
                  : "white",
                color: selectedSituations.includes(item.name)
                  ? "white"
                  : theme.colors.grey,
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <input
          className="forminput"
          type="text"
          placeholder="일정 제목(선택)"
          onChange={handleInputChange}
          value={title}
        />
        {outfitSelectionOptions.map(({ name, path }) => {
          return (
            <GreenButton key={name} onClick={() => navigator(path)}>
              {name}
            </GreenButton>
          );
        })}
      </Container>
    </AddSKEDPopUp>
  );
};

const AddSKEDPopUp = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: visible;
  max-width: 450px;
  min-width: 320px;
  justify-content: center;
  /* align-items: center; */
  ${({ theme }) => theme.common.flexCenterColumn}
`;

const Container = styled.div`
  width: 80%;
  background-color: white;
  box-sizing: border-box;
  padding: 1rem 1rem;
  border-radius: 1rem;
  ${({ theme }) => theme.common.flexCenterColumn}

  .box {
    margin-top: 1rem;
  }

  svg {
    align-self: flex-end;
  }

  .date {
    align-self: baseline;
    font-size: 1.4rem;
  }

  .situation {
    border: 2px solid ${theme.colors.grey};
    border-radius: 1rem;
    margin: 3px 5px;
    box-sizing: border-box;
    padding: 10px 15px;
    border-radius: 1rem;
  }

  input {
    font-size: large;
    margin-top: 1rem;
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid grey;
    transition: border-bottom-width 0.2s ease, border-bottom-color 0.5s ease;
  }

  input::placeholder {
    color: lightgrey;
  }
`;

const GreenButton = styled.button`
  ${({ theme }) => theme.common.PointButton};
  width: 60%;
  height: 2.1rem;
  margin-top: 0.5rem;
`;
