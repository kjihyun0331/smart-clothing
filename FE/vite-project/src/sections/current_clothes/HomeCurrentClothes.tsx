import styled from "styled-components";
import ClothesImage from "@/components/CLothesImage";
import IconDelete from "@/assets/ui/IconDelete";
import IconAdd from "@/assets/ui/IconAdd";
import { useCurrentClothesStore } from "@/store/CurrentClothesStore";
import HomeLocate from "../weather_location/HomeLocate";
import { Loader } from "@/components/Loader";
import { useState } from "react";
import AddCurrentClothes from "./AddCurrentClothes";


interface CurrentProps {
    isloading : boolean,
    iserror : boolean
}

interface LastItemProps {
    $isLastItem : boolean
}


const HomeCurrentClothestsx = ({isloading, iserror}: CurrentProps) => {

    const { CurrentClothesList } = useCurrentClothesStore()

    const [addPage, setAddPage] = useState<boolean>(false)


    // 여기는 모달방식 느낌으로 가자
    const moveAddClothes = () => {
        setAddPage(true)
      };
    // 들어올 때 api를 보내거나 응답을 받기

    const testRFIDResponse = {isPending: false, isError: false, data:{outfit_list: [1, 2, 3,]}}

    return (
        <div>
            {
            !addPage ? <div>
                <HomeLocate />
                {(isloading || iserror ) ?  <Loader/> : <Container>
                    <Message>오늘 내가 입은 옷</Message>
                    <InfoContainer>
                        <ClothesList>
                        {testRFIDResponse.isPending && <div>isLoding...</div>}
                        {testRFIDResponse.isError && <div>Error!</div>}
                        {!testRFIDResponse.isPending && !testRFIDResponse.isError && 
                            (
                                CurrentClothesList.map((item, index:number) => {
                                    const isLastItem = (index === testRFIDResponse.data.outfit_list.length - 1)
                                    return (
                                        <Clothes key={index} $isLastItem={isLastItem}>
                                            <ClothesImage clothingId={item.clothingId} clothingImagePath={item.clothingImagePath} clothingName={item.clothingName}/>
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
                    <button>확정하기</button>
                </Container>}
            </div> : 
            <div>
                <AddCurrentClothes/>
            </div>
            }
        </div>
    );
};

export default HomeCurrentClothestsx;


const Container = styled.div`
width: 95%;
margin: auto;
background-color: #ffffff;
border-radius: 1rem;
box-sizing: border-box;
height: 30vh;

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