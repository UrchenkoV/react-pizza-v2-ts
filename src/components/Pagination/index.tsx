import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/slices/filterSlice";

import styles from "./Pagination.module.scss";

type PaginationProps = {
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  const { currentPage } = useSelector(selectFilter);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  );
};

export default Pagination;
