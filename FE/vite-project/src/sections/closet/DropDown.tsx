const CATEGORY = ["전체", "상의", "하의", "치마", "아우터"];
const TEXTURE = [
  "면",
  "폴리에스테르",
  "레이온",
  "기모",
  "텐셀",
  "아크릴",
  "울",
  "캐시미어",
  "쉬폰",
  "코듀로이",
  "옥스포드",
  "트위드",
];

const STYLE = ["캐주얼", "러블리", "빈티지"];

const ARR = {
  category: CATEGORY,
  texture: TEXTURE,
  style: STYLE,
};

function DropDown({ type, handleDispatch }) {
  const handleClick = (event) => {
    const value = event.target.textContent;
    console.log(value);
    if (type === "category") {
      handleDispatch("updateCategory", value);
      return;
    } else if (type === "texture") {
      handleDispatch("updateTexture", value);
      return;
    } else {
      handleDispatch("updateStyle", value);
    }
  };

  return (
    <ul className="category-dropdown">
      {ARR[type].map((item) => {
        return (
          <li key={item} onClick={handleClick}>
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export default DropDown;
