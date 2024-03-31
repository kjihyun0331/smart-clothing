import styled from "styled-components";


interface ClothesProps {
    clothes_id: number; 
}


const ClothesImage = ({clothes_id}: ClothesProps) => {
    // 옷 인덱스 보내면 여기서 옷 상세정보 api 호출
    console.log(clothes_id)
    return (
        <Container>
            옷
        </Container>
    );
};

export default ClothesImage;


const Container = styled.div`
background-color: #f5f5f5;
box-sizing: border-box;
width: 100%;
height: 100%;
border-radius: 1rem;

`
