import styled from "styled-components";
import NoSchedule from "@/sections/today_info/NoSchedule";
import HaveSchedule from "@/sections/today_info/HaveSchedule";
import { useApi } from "@/hooks/useApi";
import { Loader } from "@/components/Loader";


const TodaySchedule = () => {

    const today:Date = new Date()
    const formattedDate:string = today.toISOString().split('T')[0];
    // const formattedDate:string = '2024-03-30'

    const {
        isLoading: isLoadingDetail,
        isError: isErrorDetail,
        data: dataDetail
    } = useApi(
        "get",
        `calendar/detail?date=${formattedDate}`
    );
    
    const {
        isLoading: isLoadingExists,
        isError: isErrorExists,
        data: dataExists
    } = useApi(
        "get",
        `calendar/exists?date=${formattedDate}`
    );

    if (isLoadingExists || isErrorExists) {
        return (
            <Loader/>
        )
    }

    if (dataExists) {
        if (!dataExists.scheduleExists) {
            return (
                <Container>
                    <NoSchedule/>
                </Container>
            )
        } else {
            
            if (isLoadingDetail || isErrorDetail) {
                return (
                    <Loader/>
                )
            }

            return (
                <Container>
                    {dataDetail && <HaveSchedule schedule={dataDetail.schedule.scheduleCategory} outfit={dataDetail.clothingList}/>}
                </Container>
            )
        }
    }
};

export default TodaySchedule;


const Container = styled.div`
width: 95%;
margin: auto;
background-color: #ffffff;
border-radius: 1rem;
box-sizing: border-box;
height: 30vh;
`