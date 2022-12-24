export default function Categories({ value, onClick }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, index) => (
          <li
            key={index}
            className={value === index ? "active" : ""}
            onClick={() => onClick(index)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}
