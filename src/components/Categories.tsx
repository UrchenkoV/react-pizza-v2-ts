import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilter, setCategoryId } from "../redux/slices/filterSlice";

const categories: string[] = [
  "Все",
  "Мясные",
  "Постная",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector(selectFilter);

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
}

export default Categories