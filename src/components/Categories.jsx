import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/categorySlice";

export default function Categories() {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.category.categoryId);

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
