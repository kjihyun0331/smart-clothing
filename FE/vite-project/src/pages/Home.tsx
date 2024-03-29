import Layout from "@/components/Layout";
// import { useEffect, useRef } from "react";
import HomeLocate from '@/sections/weather_location/HomeLocate'
import TodaySchedule from "@/sections/today_schedule/TodaySchedule";
// import { useLocateStore } from "@/store/LocateStore";
// import { useQueryClient } from "@tanstack/react-query";


function Home() {
  // const {LocateInfo} = useLocateStore()
  // const mounted = useRef<boolean>(false)
  // const queryClient = useQueryClient()

  // // 상위 컴포넌트에서 쿼리 캐싱데이터 초기화(위치 정보 바뀔때)
  // useEffect(() => {
  //   if (mounted.current) {
  //     const invalidate = () => {
  //       // 하루 날씨 쿼리문
  //       queryClient.invalidateQueries({queryKey: ['weather1day']})
  //       // 5일 날씨 쿼리문
  //       queryClient.invalidateQueries({queryKey: ['weather5days']})
  //     }
  //     invalidate()
  //   }
  //   mounted.current = true
  // }, [LocateInfo]);
  
  
  // 날이 바뀔 때 schedule API 캐싱데이터 초기화 필요


  return (
    <Layout>
      <HomeLocate/>
      <TodaySchedule/>
    </Layout>
  );
}

export default Home;