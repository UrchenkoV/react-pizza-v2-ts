export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type FetchPizzaType = {
  category: string;
  order: string;
  orderBy: string;
  search: string;
  currentPage: number;
};

export type PizzaBlockProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  sizes: any[];
  types: any[];
  category_id: number;
};

export interface PizzaSliceState {
  items: PizzaBlockProps[];
  status: Status;
}
