export type SortItemProps = {
  title: string;
  sortProperty: "rating" | "price" | "title" | "-rating" | "-price" | "-title";
};

export type SortItem = {
  title: string;
  sortProperty: string;
};

export interface FilterSliceState {
  categoryId: number;
  sort: SortItemProps;
  currentPage: number;
  searchValue: string;
}
