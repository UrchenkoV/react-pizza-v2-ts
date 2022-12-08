import React from "react";

export default function Categories() {
  const [categoryIndex, setCategoryIndex] = React.useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onChangeCategoryActive = () => {};

  console.log(categoryIndex);
  return (
    <div className="categories">
      <ul>
        {categories.map((cat, index) => (
          <li
            key={index}
            className={categoryIndex === index ? "active" : ""}
            onClick={() => setCategoryIndex(index)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}
