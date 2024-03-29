import styled from "styled-components";
import { useSelectedItemsStore } from "@/store/ClothesStore";
import { useSelectedDateStore } from "@/store/DateStore";
import IconBack from "@/assets/ui/IconBack";
import IconCheck from "@/assets/ui/IconCheck";
import { useNavigate } from "react-router-dom";
import HashTag from "./HashTag";

// const saveCanvasImage = async (imageData: string) => {
//   try {
//     // imageData는 'data:image/png;base64,iVBORw0...' 형식의 문자열입니다.
//     // 서버에 전송할 FormData 객체를 생성합니다.
//     const formData = new FormData();
//     // imageData를 Blob으로 변환합니다.
//     const imageBlob = await (await fetch(imageData)).blob();
//     // FormData에 이미지 Blob을 추가합니다. 'image'는 서버에서 해당 파일을 식별하는 키입니다.
//     formData.append("image", imageBlob, "canvas-image.png");

//     // axios를 사용하여 POST 요청을 보냅니다.
//     // 'YOUR_BACKEND_ENDPOINT'는 실제 백엔드 엔드포인트 URL로 대체해야 합니다.
//     const response = await axios.post("YOUR_BACKEND_ENDPOINT", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     console.log("서버 응답:", response.data);
//   } catch (error) {
//     console.error("이미지 저장 중 에러 발생:", error);
//   }
// };

const ConfirmOutfit = () => {
  const navigate = useNavigate();
  const { clearItems, confirmOutfit } = useSelectedItemsStore();
  const { selectedDate } = useSelectedDateStore();

  const date = new Date();
  const fileName = `CanvasImage_${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.png`;
  console.log(fileName);

  return (
    <>
      <Header>
        <IconBack onClick={() => navigate("/calendar/makeoutfit")} />
        <IconCheck
          onClick={() => {
            navigate("/calendar");
            clearItems();
          }}
        />
      </Header>
      <Wrapper>
        <p className="date">{selectedDate}</p>
        <div className="imgarea">
          <img src={confirmOutfit} alt="confirmOutfit" />
        </div>
        <HashTag />
      </Wrapper>
    </>
  );
};

export default ConfirmOutfit;

const Header = styled.div`
  padding: 8px 8px 0 8px;
  height: 7dvh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  margin-left: auto;
  margin-right: auto;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }

  .date {
    font-size: 1rem;
    align-self: self-start;
  }

  .imgarea {
    margin: 1rem 0 0 0;
    width: 80%;
    aspect-ratio: 1 / 1;
    background-color: ${(props) =>
      `${props.theme.colors.pointcolor
        .replace("rgb", "rgba")
        .replace(")", ", 0.3)")}`};

    border-radius: 20px;
    padding: 1rem 1rem;
  }

  img {
    width: 100%;
    object-fit: contain;
  }
`;
