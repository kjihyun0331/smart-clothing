import styled from "styled-components";
import ClothesImage from "@/components/CLothesImage";
import IconDelete from "@/assets/ui/IconDelete";
import IconAdd from "@/assets/ui/IconAdd";
import { useNavigate } from "react-router-dom";
import { useCurrentClothesStore } from "@/store/CurrentClothesStore";


interface LastItemProps {
    $isLastItem : boolean
}


interface ClothesList {
    clothes: number[]; 
}


const HomeCurrentClothestsx = ({clothes}: ClothesList) => {
    const navigate = useNavigate();
    const moveAddClothes = () => {
        navigate(`/home/addclothes`);
      };
    // 들어올 때 api를 보내거나 응답을 받기

    const testRFIDResponse = {isPending: false, isError: false, data:{outfit_list: [1, 2, 3,]}}

    return (
        <Container>
            <Message>오늘 내가 입은 옷</Message>
            <InfoContainer>
                <ClothesList>
                {testRFIDResponse.isPending && <div>isLoding...</div>}
                {testRFIDResponse.isError && <div>Error!</div>}
                {!testRFIDResponse.isPending && !testRFIDResponse.isError && 
                    (
                        testRFIDResponse.data.outfit_list.map((item:number, index:number) => {
                            const isLastItem = (index === testRFIDResponse.data.outfit_list.length - 1)
                            return (
                                <Clothes key={index} $isLastItem={isLastItem}>
                                    <ClothesImage clothes_id={item}/>
                                </Clothes>
                            )
                        })
                     )
                }
                </ClothesList>
                <AddBox>
                    <IconAdd onClick={moveAddClothes}/>
                </AddBox>
            </InfoContainer>
        </Container>
    );
};

export default HomeCurrentClothestsx;


const Container = styled.div`

`

const Message = styled.div`
text-align:center;
padding: 1rem;
font-size: 1.2rem;
font-weight: bolder;
color: #8d8d8d;
`

const InfoContainer = styled.div`
display: flex;
margin: 0 0.5rem;
`


const ClothesList = styled.div`
display: flex;
max-width: 85%;
margin: 0 auto;
overflow-x: auto
`

const AddBox = styled.div`
padding: 1rem;
flex: 1;
min-width: 15%;
min-height: 15vh;
display: flex;
justify-content: center;
align-items: center;
`



const Clothes = styled.div<LastItemProps>`
  height: 15vh;
  min-width: 15vh;
  margin: 0.5rem ${({ $isLastItem }) => ($isLastItem ? '0' : '1rem')} 0.5rem 0;
`