import styled from "styled-components";
import CoordiImage from "@/components/CoordiImage";


interface LastItemProps {
    isLastItem: boolean
}


const HaveSchedule = () => {
    // DL server로 api 요청 결과 => [[1, 2, 3], [2, 3, 4]]꼴로 응답
    const testDLResponse = {isPending: false, isError: false, data:{outfit_list: [[1, 2, 3], [3, 4, 5], [5, 6, 7], [7, 8, 9], [9, 10, 11]]}}
    return (
        <Container>
            <Message>오늘 같은 날씨에 제안합니다</Message>
            <CoordiList>
                {testDLResponse.isPending && <div>isLoding...</div>}
                {testDLResponse.isError && <div>Error!</div>}
                {!testDLResponse.isPending && !testDLResponse.isError && 
                    (
                        testDLResponse.data.outfit_list.map((item:number[], index:number) => {
                            const isLastItem = (index === testDLResponse.data.outfit_list.length - 1)
                            return (
                                <Coordi isLastItem={isLastItem}>
                                    <CoordiImage outfit={item}/>
                                </Coordi>
                            )
                        })
                     )
                }
            </CoordiList>
            <button>오늘 일정 등록하기</button>
 
        </Container>
    );
};

export default HaveSchedule;


const Container = styled.div`

`

const Message = styled.div`
text-align:center;
padding: 1rem;
font-size: 1.2rem;
font-weight: bolder;
color: black;
`

const CoordiList = styled.div`
display: flex;
width: 95%;
margin: 0 auto;
overflow-x: auto
`



const Coordi = styled.div<LastItemProps>`
height: 15vh;
min-width: 15vh;
margin: 0 ${({ isLastItem }) => (isLastItem ? '0' : '1rem')} 0.7rem 0;


`