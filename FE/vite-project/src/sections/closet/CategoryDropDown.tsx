function CategoryDropDown({ handleDispatch }) {
  const CATEGORY = ["상의", "하의", "아우터", "치마", "바지"];

  const handleClick = (event) => {
    const value = event.target.textContent;
    handleDispatch("updateCategory", value);
  };
  return (
    <ul className="category-dropdown">
      {CATEGORY.map((item) => {
        return (
          <li key={item} onClick={handleClick}>
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export default CategoryDropDown;
