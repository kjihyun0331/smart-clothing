import styled from "styled-components";
import NoSchedule from "@/sections/today_schedule/NoSchedule";
import HaveSchedule from "@/sections/today_schedule/HaveSchedule";
import { useApi } from "@/hooks/useApi";
import { Loader } from "@/components/Loader";


const TodaySchedule = () => {

    const today:Date = new Date()
    // const formattedDate:string = today.toISOString().split('T')[0];
    const formattedDate:string = '2024-02-25'

    const { isLoading, isError, data, error } = useApi(
        "get",
        `calendar/detail?date=${formattedDate}`
    );
    
    if (isLoading) {
        return (
            <Loader/>
        )
    }

    if (isError) {
        console.log('확인', error, error.response.status)
        if (error.response.status == 404) {
            console.log('들어옴')
            return (
                <Container>
                    <NoSchedule/>
                </Container>
            )
        } else {
            return (
                <Loader />
            )
        }
    }

    return (
        <Container>
            {data && <HaveSchedule schedule={data.schedule.scheduleCategory} outfit={data.clothingList}/>}
        </Container>
    );
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