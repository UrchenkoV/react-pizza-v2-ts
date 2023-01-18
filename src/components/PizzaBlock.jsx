import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, setItems } from "../redux/slices/cartSlice";

export default function PizzaBlock({
  id,
  title,
  price,
  image,
  sizes,
  types,
  category_id,
}) {
  const [typeActive, setTypeActive] = React.useState(1);
  const [sizeActive, setSizeActive] = React.useState(1);

  const { items } = useSelector(selectCart);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      setItems({
        id,
        title,
        price,
        image,
        type: types.find((t) => t.id === typeActive).title,
        size: sizes.find((s) => s.id === sizeActive).value,
      })
    );
  };

  const totalCount = items.find((obj) => obj.id === id)?.count;

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={image} alt={title} />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              onClick={() => setTypeActive(type.id)}
              key={type.id}
              className={typeActive === type.id ? "active" : ""}
            >
              {type.title}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size) => (
            <li
              onClick={() => setSizeActive(size.id)}
              key={size.id}
              className={sizeActive === size.id ? "active" : ""}
            >
              {size.value} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>

        <button
          onClick={addToCart}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            ></path>
          </svg>
          <span>Добавить</span>

          {totalCount > 0 && <i>{totalCount}</i>}
        </button>
      </div>
    </div>
  );
}
