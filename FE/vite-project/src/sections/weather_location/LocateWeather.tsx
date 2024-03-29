import styled from 'styled-components';
import LocateSelectModal from './LocateSelectModal';
import { useState, useRef } from 'react';
import { useLocateStore } from '@/store/LocateStore';
import IconLocate from '@/assets/ui/IconLocate';
// import { useTodayWeather } from '@/hooks/useCustomQuery';
import { useApi } from '@/hooks/useApi';



function LocateWeather() {
    // 상태관리
    const { Sido, Sigungu, LocateInfo } = useLocateStore()
    // modal 관리
    const [selectLocate, setSelectLocate] = useState<boolean>(false)
    // 시계 변수
    let today:Date = new Date()

    const date:string = today.toISOString().split('T')[0];

    const hours = useRef<number>(0)
    const AMPM = useRef<string>('AM')
    const [minutes, setMinutes] = useState<string>('00')

    const locatekey = LocateInfo

    // 날씨 API
    const { isLoading, isError, data } = useApi(
        "get",
        `weather?locationKey=${locatekey}&date=${date}`
    );

    if (data) {
        console.log('호가인',data)
    }


    // modal controll
    const turnOn = () => {
        setSelectLocate(true)
      }
    
    const turnOff = () => {
        setSelectLocate(false)
    }

    // 시계
    setInterval(() => {
        today = new Date()
        hours.current = today.getHours() % 12
        if (today.getHours() >= 12) {
            AMPM.current = 'PM'
        } else {
            AMPM.current = 'AM'
        }
        setMinutes(today.getMinutes().toString().padStart(2, '0'))
    }, 100);

    
    
    return (
        <Container>

            {/* icon 영역 */}
            <IconContainer>
                {isError || isLoading ? '--' : data.WeatherIcon}
            </IconContainer>

            {/* 현재 위치 */}
            <LocateContainer onClick={turnOn}>
                <span>{Sido}</span>
                <span>{Sigungu}</span>
                <span><IconLocate/></span>
            </LocateContainer>

            {/*  위치 변경 모달 */}
            {selectLocate && <LocateSelectModal onClick={turnOff}/>}

            {/* 현재 온도 */}
            <SimpleWeahterContainer>
                {isError || isLoading ? '--' : data.highestTemperature + '°' + '\u00a0\u00a0' + data.lowestTemperature + '°'}
            </SimpleWeahterContainer>

            {/* 날씨 세부사항 */}
            <DetailWeahterContainer>

                {/* 현재 시간 */}
                <div>
                    <DetailWeahterHeader>Time</DetailWeahterHeader>
                    <DetailWeahterInfo>{hours.current}:{minutes}{AMPM.current}</DetailWeahterInfo>
                </div>

                {/* UV */}
                <div>
                    <DetailWeahterHeader>UV</DetailWeahterHeader>
                    <DetailWeahterInfo>
                        {isError || isLoading ? '--' : data.UV}
                        <span>{isError || isLoading ? '' : '(' + data.UVMessage + ')'}</span>
                    </DetailWeahterInfo>
                </div>

                {/* 현재 강수량 */}
                <div>
                    <DetailWeahterHeader>%RAIN</DetailWeahterHeader>
                    <DetailWeahterInfo>{isError || isLoading ? '--' : data.precipitation}</DetailWeahterInfo>
                </div>

                {/* 체감온도 */}
                <div>
                    <DetailWeahterHeader>체감온도</DetailWeahterHeader>
                    <DetailWeahterInfo>{isError || isLoading ? '--' : data.highestRealFeelingTemperature+ '°/' + data.lowestRealFeelingTemperature + '°'}</DetailWeahterInfo>
                </div>
            </DetailWeahterContainer>
        </Container>
    )

}


export default LocateWeather;


const Container = styled.div`
width: 90%;
height: 50vh;
margin: 0 auto 1rem auto;
padding-top: 3.5rem;
box-sizing: border-box;
background-color: #f2f2f2;
text-align: center;
`

const IconContainer = styled.div`
width: 100%;
height: 40%;
margin: 0 auto 1rem auto;
box-sizing: border-box;
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
border: hevy;
`
const LocateContainer = styled.div`
width: 100%;
height: 10%;
margin: 0 auto 0 auto;
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: center;
font-weight: bolder;
font-size: 1.5rem;
span {
    margin-left: 0.5rem;
  }
`

const SimpleWeahterContainer = styled.div`
width: 100%;
height: 20%;
margin-bottom: 1rem;
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: center;
font-weight: bolder;
font-size: 3rem;
`

const DetailWeahterContainer = styled.div`
width: 100%;
height: 15%;
box-sizing: border-box;
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: space-around;
border-radius: 0.5rem;
padding: 0.5rem;
`
const DetailWeahterHeader = styled.div`
font-size: 0.8rem;
color: #ababab;
`

const DetailWeahterInfo = styled.div`
font-size: 0.9rem;
margin-top: 0.5rem;
color: #000000;
span {
    font-size: 0.7rem;
  }
`