import { Header, DetailContent } from "./ClosetStyle";
import IconBack from "@/assets/ui/IconBack";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "@/hooks/useApi";
import { Loader } from "@/components/Loader";

type DetailClothesResponseDataType = {
  clothingId: 0;
  nowAt: "string";
  clothingName: "string";
  washedAt: "string";
  polluted: 0;
  category: "string";
  styleList: ["string"];
  season: [0];
  clothingImgPath: "string";
  textureList: ["string"];
};

interface DetailClothesResponseType {
  isLoading: boolean;
  data: DetailClothesResponseDataType;
}

const DetailClothes = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, data }: DetailClothesResponseType = useApi(
    "get",
    `clothing/${id}`
  );

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
      {isLoading ? (
        <Loader />
      ) : (
        <DetailContent>
          <div className="imgarea">
            <img src={data.clothingImgPath} alt="" />
          </div>
          <div className="textarea">
            <div className="line">
              <span className="label">별칭</span>
              <span className="value">{data.clothingName}</span>
            </div>
            <div className="line">
              <span className="label">카테고리</span>
              <span className="value">{data.category}</span>
            </div>
            <div className="line">
              <span className="label">소재</span>
              <span className="value">{data.textureList.join(", ")}</span>
            </div>
            <div className="line">
              <span className="label">월</span>
              <span className="value">
                {data.season.map((month) => `${month}월 `).join(", ")}
              </span>
            </div>
            <div className="line">
              <span className="label">키워드</span>
              <span className="value">
                {data.styleList.map((keyword) => `${keyword}`).join(", ")}
              </span>
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
      )}
    </>
  );
};

export default DetailClothes;
