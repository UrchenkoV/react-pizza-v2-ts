export type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  type: string;
  size: string;
  count: number;
};

export interface CartSliceState {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
}
