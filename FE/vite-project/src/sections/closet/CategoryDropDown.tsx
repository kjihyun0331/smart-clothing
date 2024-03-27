function DropDown({ type, handleDispatch }) {
  const CATEGORY = ["상의", "하의", "아우터", "치마", "바지"];
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

  const handleCategoryClick = (event) => {
    const value = event.target.textContent;
    handleDispatch("updateCategory", value);
  };

  const handleTextureClick = (event) => {
    const value = event.target.textContent;
    handleDispatch("updateCategory", value);
  };

  return (
    <ul className="category-dropdown">
      {type === "category"
        ? CATEGORY.map((item) => {
            return (
              <li key={item} onClick={handleCategoryClick}>
                {item}
              </li>
            );
          })
        : TEXTURE.map((item) => {
            return (
              <li key={item} onClick={handleTextureClick}>
                {item}
              </li>
            );
          })}
      {}
    </ul>
  );
}

export default DropDown;
