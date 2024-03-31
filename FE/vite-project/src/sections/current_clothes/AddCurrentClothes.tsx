import { useApi } from "@/hooks/useApi";
import { Loader } from "@/components/Loader";
import { SimpleClothesResponseDataType } from "@/types/ClothesTypes";
import styled from "styled-components";
import ClothesImage from "@/components/CLothesImage";
import { useCurrentClothesStore } from "@/store/CurrentClothesStore";



const CATEGORY = ["전체", "상의", "하의", "아우터", "치마", "바지"];
const SORT = ["최근 등록 순", "오래된 순", "많이 입은 순"];

interface ApiResponseType {
  isLoading: boolean;
  data: SimpleClothesResponseDataType[];
}

interface NameAreaProps {
    fontSize: string; // 여기에서 fontSize prop의 타입을 명시합니다.
}


interface LastItemProps {
  $isLastItem : boolean
}


const AddCurrentClothes = () => {
    const {AddClothesList} = useCurrentClothesStore()

    const handleDetailClick = (id: number) => {
      console.log('aaa')
    };
  
    const { isLoading, data }: ApiResponseType = useApi("get", "clothing");
    if (isLoading) return <Loader />;
    const getFontSizeForName = (inputname:string) => {
        const length = inputname.length;
        if (length > 7) {
          return "0.8rem";
        } else {
          return "1.2rem";
        }
      };

    return (
      <>

        <Header>
          <p className="title">추가하기</p>
          <Filter>
            <select className="category" name="category">
              <option style={{ textAlign: "center" }} hidden>
                카테고리
              </option>
              {CATEGORY.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            <select className="category">
              <option style={{ textAlign: "center" }} hidden>
                정렬
              </option>
              {SORT.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </Filter>
        </Header>

  
        <ClosetContent>
          {data.map((item) => {
            return (
                <Item
                    key={item.clothingId}
                    onClick={() => handleDetailClick(item.clothingId)}>
                    <ImgArea>
                        <ClothesImage clothingId={item.clothingId} clothingImagePath={item.clothingImagePath} clothingName={item.clothingName} backgroundColor="rgba(69, 186, 140, 0)"/>
                    </ImgArea>
                    <NameArea fontSize={getFontSizeForName(item.clothingName)}>
                        {item.clothingName}
                    </NameArea>
                </Item>
            );
          })}
        </ClosetContent>
        <AddList>
          <Container>
            <Message>오늘 내가 입은 옷</Message>
            <InfoContainer>
                <ClothesList>
                  {
                      AddClothesList.map((item, index:number) => {
                          const isLastItem = (index === testRFIDResponse.data.outfit_list.length - 1)
                          return (
                              <Clothes key={index} $isLastItem={isLastItem}>
                                  <ClothesImage clothingId={item.clothingId} clothingImagePath={item.clothingImagePath} clothingName={item.clothingName}/>
                              </Clothes>
                          )
                      })
                  }
                </ClothesList>
                <AddBox>
                    {/* <IconAdd onClick={moveAddClothes}/> */}
                </AddBox>
            </InfoContainer>
            <button>확정하기</button>
          </Container>
        </AddList>
      </>
    );
  };

export default AddCurrentClothes;

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


const ClosetContent = styled.div`
  padding: 3rem 0.7rem 12dvh 0.7rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: ${(props) => props.theme.colors.backgroundcolor};
  gap: 0.3rem;
`;

const Header = styled.div`
  width: 100%;
  height: 6dvh;
  position: sticky;
  top: 0;
  ${({ theme }) => theme.common.flexCenter};
  background-color: white;
  padding: 10px 8px 0 8px;
  max-width: 450px;
  min-width: 320px;

  .title {
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Item = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1.2;
  border-radius: 10px;

  background-color: ${(props) =>
    `${props.theme.colors.pointcolor
      .replace("rgb", "rgba")
      .replace(")", ", 0.2)")}`};

`
const ImgArea = styled.div`
    width: 100%;
    aspect-ratio: 1/1;
`
const NameArea = styled.div<NameAreaProps>`
  font-weight: 600;
  width: 100%;
  aspect-ratio: 1/0.2;
  font-size: ${(props) => props.fontSize};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align : center;
`


const Filter = styled.div`
  position: absolute;
  top: 6dvh;
  left: 0;

  select {
    margin: 5px 5px;
    padding: 5px 5px;
    border-radius: 4px;
    outline: 0 none;
  }

  select option {
    background: ${(props) => props.theme.colors.backgroundcolor};
    color: grey;
    padding: 3px 0px;
    font-size: 12px;
    border: 1px solid grey;
  }
`

const AddList = styled.div`
  position: fixed;
  bottom: 12dvh;
  width: 100%;
  height: 15vdh;
  background-color: #ffffff;
`