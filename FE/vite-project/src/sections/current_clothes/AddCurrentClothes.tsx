import { useApi } from "@/hooks/useApi";
import { Loader } from "@/components/Loader";
import { SimpleClothesResponseDataType } from "@/types/ClothesTypes";
import styled from "styled-components";
import ClothesImage from "@/components/CLothesImage";
import axios from "axios";
import { useEffect } from "react";


const CATEGORY = ["전체", "상의", "하의", "아우터", "치마", "바지"];
const SORT = ["최근 등록 순", "오래된 순", "많이 입은 순"];

interface ApiResponseType {
  isLoading: boolean;
  data: SimpleClothesResponseDataType[];
}

interface NameAreaProps {
    fontSize: string; // 여기에서 fontSize prop의 타입을 명시합니다.
  }


const AddCurrentClothes = () => {
    useEffect(() => {
        console.log('asdfasfd')

        axios({
            method: "post",
            url: 'https://j10s006.p.ssafy.io/ML-api/test',
            headers: {
            userid: 1,
            //   "Content-Type": "multipart/form-data",
            },
            data : {
                rate : 0,
                date : '2024-03-28',
                locate : 223680,
                schedule : '졸업식'
            }
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))

    })
  
    const handleDetailClick = (id: number) => {
      console.log('aaa')
    };
  
    const { isLoading, data }: ApiResponseType = useApi("get", "clothing");
    if (isLoading) return <Loader />;
    const getFontSizeForName = (inputname:string) => {
        // 여기서는 예시로 글자 수를 기준으로 조건을 설정합니다.
        // 실제 애플리케이션에서는 더 정교한 로직을 구현할 수 있습니다.
        const length = inputname.length;
        if (length > 10) { // 길이가 10자를 초과하면 글꼴 크기를 작게 설정
          return "0.5rem";
        } else {
          return "1rem"; // 그렇지 않으면 기본 글꼴 크기
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
                        <ClothesImage clothingId={item.clothingId} clothingImagePath={item.clothingImagePath} clothingName={item.clothingName} backgroundColor="#ffffff"/>
                    </ImgArea>
                    <NameArea fontSize={getFontSizeForName(item.clothingName)}>
                        {item.clothingName}
                    </NameArea>
                </Item>
            );
          })}
        </ClosetContent>


      </>
    );
  };

export default AddCurrentClothes;


const ClosetContent = styled.div`
  padding: 3rem 0.7rem 12dvh 0.7rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
    width: 100%;
    aspect-ratio: 1/0.2;
    font-size: ${(props) => props.fontSize};
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
`;