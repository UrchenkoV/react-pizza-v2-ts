import { useSelector, useDispatch } from "react-redux";
import { selectFilter, setCategoryId } from "../redux/slices/filterSlice";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export default function Categories() {
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
