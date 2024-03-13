import Layout from "@/components/Layout";
import styled from "styled-components";

function Calendar() {
  return (
    <Layout>
      <Test>Calendar</Test>
    </Layout>
  );
}

export default Calendar;

const Test = styled.div`
  width: 100%;
  height: 200dvh;
  background-color: lightcoral;
`;
