import styled from "styled-components";


interface CoordiProps {
    outfit: number[]; 
}


const CoordiImage = ({outfit}: CoordiProps) => {
    // 옷 리스트를 보내면 여기서 옷 상세정보 api 호출
    return (
        <Container>
            옷 모음            
        </Container>
    );
};

export default CoordiImage;


const Container = styled.div`
background-color: #f5f5f5;
box-sizing: border-box;
width: 100%;
height: 100%;
border-radius: 1rem;

`