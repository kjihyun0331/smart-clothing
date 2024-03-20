import { useLocateStore } from '@/store/LocateStore';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocate } from '@/hooks/useCustomQuery';
import { cities } from './LocationInfo';


interface CurrentProps {
    latitude: number;
    longitude: number;
  }


function CurrentLocate(props: CurrentProps) {
    // Sigungun, Sido를 update하기 위한 function
    const {ChangeLocateInfo} = useLocateStore()

    // 좌표를 통한 현재 위치 query
    const locateQuery = useLocate(props.latitude, props.longitude)

    // 쿼리문 요청 변화 hook으로 위치 저장
    useEffect(() => {
        if (locateQuery.data) {
            const newSido:string = locateQuery.data.data.documents[0].address.region_1depth_name
            const newSigungu:string  = locateQuery.data.data.documents[0].address.region_2depth_name.split(" ")[0]
            ChangeLocateInfo(newSido, newSigungu, cities[newSido][newSigungu])
        }
    }, [locateQuery])
    

    if (props.latitude == null ||  props.longitude == null) {
        return (
            <Container>
                로딩중
            </Container>
        )
    }
    else {
        if (locateQuery.isPending) {
            return (
                <Container>
                    로딩중
                </Container>
            )
        } else if (locateQuery.isError) {
            return (
                <Container>
                    에러! 인터넷 확인
                </Container>
            )
        }
    }
}


export default CurrentLocate;


const Container = styled.div`
width: 90%;
height: 55vh;
margin: 0 auto 1rem auto;
padding-top: 3.5rem;
box-sizing: border-box;
background-color: #f2f2f2;
text-align: center;
`
