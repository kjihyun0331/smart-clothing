import moment from "moment";
import "moment/dist/locale/ko";
import styled from "styled-components";
import { AddSchedule } from "./AddSchedule";
import { useState } from "react";
import { MomentInput } from "moment";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface SchedulePropType {
  date: Value;
}

const Schedule = ({ date }: SchedulePropType) => {
  moment.locale("ko");
  const selected: string | null = moment(date as MomentInput).format(
    "M월 DD일 (dd)"
  );
  const isLoading: boolean = true;

  // const { isCommentLoading, isCommentError, commentState } = useCommentQuery(shopId);
  return (
    <ScheduleWrapper>
      <p>{selected}</p>
      {isLoading ? <NoSchedule selected={selected} /> : <p>일정 있음</p>}
    </ScheduleWrapper>
  );
};

export default Schedule;

const ScheduleWrapper = styled.div`
  margin-top: 0.5rem;
  box-sizing: border-box;
  padding: 1rem 1rem;
  width: 100%;
  background-color: white;
  border-radius: 1rem;
`;

type popupType = boolean;
type NoSchedulePropType = {
  selected: string | null;
};

const NoSchedule = ({ selected }: NoSchedulePropType) => {
  const [popup, setPopup] = useState<popupType>(false);
  return (
    <ContentWrapper>
      <p className="description">아직 등록된 일정이 없습니다.</p>
      <button className="newschedule" onClick={() => setPopup(true)}>
        일정 등록하기
      </button>
      {popup ? <AddSchedule setPopup={setPopup} selected={selected} /> : <></>}
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  position: relative;
  margin-top: 0.5rem;
  box-sizing: border-box;
  padding: 1rem 1rem;
  width: 100%;
  ${({ theme }) => theme.common.flexCenterColumn};

  .description {
    color: ${(props) => props.theme.colors.grey};
    margin-bottom: 1rem;
  }

  .newschedule {
    border: none;
    background-color: ${(props) => props.theme.colors.pointcolor};
    opacity: 0.7;
    box-sizing: border-box;
    padding: 1rem 1rem;
    border-radius: 0.5rem;
    color: white;
  }
`;
