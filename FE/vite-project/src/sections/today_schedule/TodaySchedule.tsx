import { useEffect, useState } from "react";
import styled from "styled-components";
import NoSchedule from "@/sections/today_schedule/NoSchedule";
import HaveSchedule from "@/sections/today_schedule/HaveSchedule";




const TodaySchedule = () => {
    const today:Date = new Date()
    // axios 요청(오늘 날짜 요청)
    // 더미데이터(스케쥴 종류, 코디 정보)
    // 오늘 스케쥴 있을 시
    // const todaySchedule = {isPending: false, isError: false, data:{schedule: '결혼식', outfit_info: [1, 3, 5]}}
    // 오늘 스케줄 없을 시
    const todaySchedule = {isPending: false, isError: false, data:{schedule: '', outfit_info: []}}


    return (
        <Container>
            {(todaySchedule.isPending || todaySchedule.isError) && <p>is Loding...</p>}
            {todaySchedule.data && (todaySchedule.data.schedule ? <HaveSchedule schedule={todaySchedule.data.schedule} outfit={todaySchedule.data.outfit_info}/> : <NoSchedule/>)}
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