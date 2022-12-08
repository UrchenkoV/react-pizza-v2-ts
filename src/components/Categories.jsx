import React from "react";

export default function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onChangeCategoryActive = () => {};

  console.log(activeIndex);
  return (
    <div className="categories">
      <ul>
        {categories.map((cat, index) => (
          <li
            key={index}
            className={activeIndex === index ? "active" : ""}
            onClick={() => setActiveIndex(index)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}
