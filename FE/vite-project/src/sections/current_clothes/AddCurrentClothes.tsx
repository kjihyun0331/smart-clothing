import styled from "styled-components";
import HomeCurrentClothestsx from "./HomeCurrentClothes.tsx";



const CurrentClothes = () => {
    // axios 요청
    // 혹은 데이터 받기?
    // 더미데이터(옷 종류)
    const todayClothes = {isPending: false, isError: false, data:{clothes: [1, 2, 3, 4]}}


    return (
        <Container>
            {(todayClothes.isPending || todayClothes.isError) && <p>is Loding...</p>}
            {todayClothes.data && <HomeCurrentClothestsx clothes={todayClothes.data.clothes}/>}
        </Container>
    );
}; 

export default CurrentClothes;


const Container = styled.div`
width: 95%;
margin: auto;
background-color: #ffffff;
border-radius: 1rem;
box-sizing: border-box;
height: 30vh;
`
