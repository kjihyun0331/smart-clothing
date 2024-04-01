import styled from "styled-components";
import { usePostRecommendedOutfit } from "@/hooks/usePostRecommendedOutfit";
import { useLocateStore } from "@/store/LocateStore";
import { useState } from "react";
import IconRe from "@/assets/ui/IconRe";
import { Loader } from "@/components/Loader";
import ClothesImage from "@/components/CLothesImage";
import { useEffect } from "react";


interface Clothes {
    clothing_id: number,
    clothing_img_path: string,
    clothing_name: string,
}

interface LastItemProps {
    $isLastItem: boolean
}

type dataType = {
  rate: string;
  date: string;
  locate: string;
  schedule: string;
  count: string;
};


const HaveSchedule = () => {
    // const { recommenddata, mutate, isPending, isError } = usePostRecommendedOutfit();
    const { mutate, isPending, isError } = usePostRecommendedOutfit();
    const {LocateInfo} = useLocateStore()
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        }).replace(/\./g, '-').replace(/\s/g, '').slice(0, -1);
    const [rate, setRate] = useState<number>(0)
    const addRate = () => {
        if (recommenddata.data[0].length != 0) {
            setRate(0)
        } else {
            setRate(rate + 1)
        }
    }
    const recommenddata = {
        "data": [
            [
                {
                    "clothing_id": 1,
                    "clothing_name": "나무지기1",
                    "clothing_img_path": "https://j10s006.p.ssafy.io/images/a0e6c5a0-9e7c-4f87-a2c6-65c5473c8e5f.png"
                },
                {
                    "clothing_id": 1,
                    "clothing_name": "나무지기1",
                    "clothing_img_path": "https://j10s006.p.ssafy.io/images/image-removebg-preview%20(3).png"
                },
                {
                    "clothing_id": 2,
                    "clothing_name": "나무지기1",
                    "clothing_img_path": "https://j10s006.p.ssafy.io/images/a0e6c5a0-9e7c-4f87-a2c6-65c5473c8e5f.png"
                }
            ],
            [
                {
                    "clothing_id": 4,
                    "clothing_name": "아차모1",
                    "clothing_img_path": "https://j10s006.p.ssafy.io/images/d384eaf4-18e3-43fd-b8d7-789b3c9a3017.png"
                },
                {
                    "clothing_id": 4,
                    "clothing_name": "아차모1",
                    "clothing_img_path": "https://j10s006.p.ssafy.io/images/image-removebg-preview%20(4).png"
                },
                {
                    "clothing_id": 7,
                    "clothing_name": "불꽃숭이1",
                    "clothing_img_path": "https://j10s006.p.ssafy.io/images/92e60f21-1533-4a29-bff1-0487d6e00535.png"
                }
            ],
            [
                {
                    "clothing_id": 5,
                    "clothing_name": "물짱이1",
                    "clothing_img_path": "https://j10s006.p.ssafy.io/images/8f4b9b19-6d5c-4e65-b239-3fb7d7d0e501.png"
                },
                {
                    "clothing_id": 5,
                    "clothing_name": "물짱이1",
                    "clothing_img_path": "https://j10s006.p.ssafy.io/images/image-removebg-preview%20(4).png"
                },
                {
                    "clothing_id": 11,
                    "clothing_name": "수댕이1",
                    "clothing_img_path": "https://j10s006.p.ssafy.io/images/c72e1499-d1d5-4c05-9f3f-1756d0a6752a.png"
                }
            ]
        ]
    }
    const example: dataType = {
          rate: rate.toString(),
          date: formattedDate,
          locate: LocateInfo.toString(),
          schedule: "없음",
          count: "1"
        };

    // 여기는 해당 리스트를 가지고 일정 등록하기 이동으로 가자
    const test = () => {
        console.log('bla')
    }
        
    useEffect(() => {
        // 조건을 추가하여 불필요한 호출을 방지
        if (rate >= 0 && LocateInfo) {
        mutate(example);
        }
    }, [rate, LocateInfo]);

    
    if (isPending || isError) {
        return (
            <Loader/>
        )
    } else {
        if (recommenddata) {
            console.log('출력', recommenddata)
            if (recommenddata.data[0].length != 0) {
        const clothesData = recommenddata.data.map(item => item[1])
        return (
        <Container>
            
            <Message>오늘 같은 날씨에 제안합니다
                <Re>
                    <IconRe onClick={addRate}/>
                </Re>
            </Message>
            <CoordiList onClick={test}>
                {(isError || isPending) ? <Loader/> :  
                    (
                        // 
                        clothesData.map((item:Clothes, index:number) => {
                            console.log(clothesData)
                            const isLastItem = (index === recommenddata.data.length - 1)
                            return (
                                <Coordi $isLastItem={isLastItem} key={index}>
                                    <ClothesImage clothingId={item.clothing_id} clothingImagePath={item.clothing_img_path} clothingName={item.clothing_name}/>
                                </Coordi>
                            )
                        })
                     )
                }
            </CoordiList>
            <GreenButton>오늘 일정 등록하기</GreenButton>
 
        </Container>
        )
    } else {
        return (
            <Container>
                <div>dsafsfds</div>
                <Message>오늘 같은 날씨에 제안합니다</Message>
                <CoordiList>
                    <span>충분한 데이터가 없습니다!</span>
                </CoordiList>
                <GreenButton>오늘 일정 등록하기</GreenButton>
    
            </Container>
        )
    }
    }
}
};

export default HaveSchedule;


const Container = styled.div`
position: relative;
height : 100%
    
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

const Re = styled.div`
    position: absolute;
    right: 1rem;
    top: 1rem;
`


const Coordi = styled.div<LastItemProps>`
  height: 15vh;
  min-width: 15vh;
  ${({ $isLastItem }) => $isLastItem ? `margin: 0 0 0.7rem 0;` : `margin: 0 1rem 0.7rem 0;`}
`;

const GreenButton = styled.button`
    border: none;
    background-color: #45ba8c;
    color: white;
    border-radius: 40px;
    box-sizing: border-box;
    opacity: 0.7;
    width: 50%;
    padding: 1rem 1rem;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translate(-50%);
    
`;
