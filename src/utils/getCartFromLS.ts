import { CartItem } from "../redux/cart/types";

export const getCartFromLS = (): CartItem[] => {
  const data = window.localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

export const calcCart = (items: CartItem[]) => {
  const totalPrice = items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
  const totalCount = items.reduce((sum, obj) => sum + obj.count, 0);
  return {
    totalPrice,
    totalCount,
  };
};
