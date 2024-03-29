import { MomentInput } from "moment";
import moment from "moment";
import { useApi } from "@/hooks/useApi";
import { Loader } from "@/components/Loader";
import styled from "styled-components";
import { situationcolor, stateColor } from "./config-schedule";

type OutfitResponseType = {
  scheduleId: number;
  scheduleCategory: string;
  scheduleName: string;
  outfitImagePath: string;
  clothing: [
    {
      clothingId: 0;
      clothingName: string;
      clothingImagePath: string;
      state: string;
    }
  ];
};

interface OutfitQuery {
  isLoading: boolean;
  data: OutfitResponseType;
}

const HaveOutfit = ({ date }) => {
  const selected = moment(date as MomentInput).format("YYYY-MM-DD");
  const { isLoading, data }: OutfitQuery = useApi(
    "get",
    `calendar/date?date=${selected}`
  );

  if (isLoading) return <Loader />;

  console.log(data);

  return (
    <HaveOutfitContainer>
      <span
        className="tag"
        style={{
          backgroundColor: situationcolor[data.scheduleCategory],
        }}
      >
        {data.scheduleCategory}
      </span>

      <div className="coordarea">
        <img src={data.outfitImagePath} alt={data.scheduleName} />
      </div>

      {data.clothing.map((item) => {
        return (
          <div className="item" key={item.clothingId}>
            <div className="imgarea">
              <img src={item.clothingImagePath} alt={item.clothingImagePath} />
            </div>
            <div className="textarea">
              <p className="clothingname">{item.clothingName}</p>
              <p
                style={{
                  color: stateColor[item.state],
                }}
              >
                {item.state}
              </p>
            </div>
          </div>
        );
      })}
    </HaveOutfitContainer>
  );
};

export default HaveOutfit;

const HaveOutfitContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 10px;
  display: flex;
  flex-direction: column;
  padding-bottom: 12dvh;

  .tag {
    width: 20%;
    padding: 5px 5px;
    border-radius: 10px;
    text-align: center;
    color: #acacac;
    font-weight: bold;
  }

  .coordarea {
    margin-top: 1rem;
    width: 95%;
    box-sizing: border-box;
    padding: 1rem 1rem;
    border-radius: 20px;
    aspect-ratio: 1 / 1;
    margin-left: auto;
    margin-right: auto;
    background-color: ${(props) =>
      `${props.theme.colors.pointcolor
        .replace("rgb", "rgba")
        .replace(")", ", 0.4)")}`};

    img {
      width: 100%;
      height: 100%;
    }
  }

  .item {
    width: 100%;
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    column-gap: 10px;
  }

  .imgarea {
    border-radius: 10px;
    height: 100px;
    width: 100px;
    background-color: ${(props) => props.theme.colors.backgroundcolor};

    /* background-color: ${(props) =>
      `${props.theme.colors.pointcolor
        .replace("rgb", "rgba")
        .replace(")", ", 0.2)")}`}; */

    img {
      width: 100px;
      height: 100px;
      object-fit: contain;
    }
  }

  .textarea {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 1rem;
  }

  .clothingname {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;
