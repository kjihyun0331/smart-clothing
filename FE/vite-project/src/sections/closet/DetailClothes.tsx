import { Header, DetailContent } from "./ClosetStyle";
import IconBack from "@/assets/ui/IconBack";
import { useNavigate, useParams } from "react-router-dom";

type DetailClothesResponseType = {
  nowAt: string;
  clothingName: string;
  washedAt: string;
  polluted: number;
  category: string;
  style: string;
  season: number[];
  clothingDetail: {
    clothingDetailId: number;
    clothingImgPath: string;
    textureName: string[];
  };
};

const exampledata: DetailClothesResponseType = {
  nowAt: "nowAt",
  clothingName: "옷 이름 예시",
  washedAt: "washedAT 예시",
  polluted: 1,
  category: "니트",
  style: "캐주얼",
  season: [3, 4, 9, 10],
  clothingDetail: {
    clothingDetailId: 1,
    clothingImgPath: "https://cdn-icons-png.flaticon.com/512/2362/2362634.png",
    textureName: ["울", "캐시미어"],
  },
};

const DetailClothes = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleDelete = () => {
    // 삭제 하기
    navigate("/closet");
  };

  return (
    <>
      <Header>
        <IconBack onClick={handleGoBack} />
        <p className="title">옷 상세</p>
      </Header>

      <DetailContent>
        <div className="imgarea">
          <img src={exampledata.clothingDetail.clothingImgPath} alt="" />
        </div>
        <div className="textarea">
          <div className="line">
            <span className="label">타입</span>
            <span className="value">{exampledata.category}</span>
          </div>
          <div className="line">
            <span className="label">소재</span>
            <span className="value">
              {exampledata.clothingDetail.textureName.join(", ")}
            </span>
          </div>
          <div className="line">
            <span className="label">월</span>
            <span className="value">
              {exampledata.season.map((month) => `${month}월 `).join(", ")}
            </span>
          </div>
          <div className="line">
            <span className="label">키워드</span>
            <span className="value">{exampledata.style}</span>
          </div>
          <div className="line">
            <span className="label">같이 입는 사람</span>
            <span className="value">김싸피2, 김싸피3</span>
          </div>
        </div>
        <div className="btnarea">
          <button
            className="btn edit"
            onClick={() => navigate(`/closet/update/${id}`)}
          >
            수정하기
          </button>
          <button className="btn delete" onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      </DetailContent>
    </>
  );
};

export default DetailClothes;
