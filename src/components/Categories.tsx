import React from "react";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../redux/filter/slice";

const categories: string[] = [
  "Все",
  "Мясные",
  "Постная",
  "Гриль",
  "Острые",
  "Закрытые",
];

type CategoryIdType = {
  categoryId: number;
}

const Categories: React.FC<CategoryIdType> = React.memo(({categoryId}) => {
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, index) => (
          <li
            key={index}
            className={categoryId === index ? "active" : ""}
            onClick={() => dispatch(setCategoryId(index))}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}) 

export default Categories