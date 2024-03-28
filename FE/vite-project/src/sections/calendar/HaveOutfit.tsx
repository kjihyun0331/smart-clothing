import { MomentInput } from "moment";
import moment from "moment";
import { useApi } from "@/hooks/useApi";
import { Loader } from "@/components/Loader";
import styled from "styled-components";

type OutfitResponseType = {
  schedule: {
    scheduleId: number;
    scheduleName: string;
    scheduleCategory: string;
    date: string;
  };
  clothingList: [
    {
      clothingId: number;
      clothingImage: string;
      x: number;
      y: number;
      width: number;
      height: number;
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
    `calendar/detail?date=${selected}`
  );
  console.log(data);
  if (isLoading) return <Loader />;

  return (
    <HaveOutfitContainer>
      <span className="tag">{data.schedule.scheduleCategory}</span>

      {data.clothingList.map((item) => {
        return (
          <div className="item" key={item.clothingId}>
            <img src={item.clothingImage} alt={item.clothingImage} />
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

  .tag {
    width: 18%;
    background-color: aqua;
    border-radius: 10px;
  }

  .item {
    width: 200px;
    height: 200px;
  }
`;
