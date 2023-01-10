import { RightIcon, LeftIcon } from "../../images/icons/export";

const Pagination = ({ postsPerPage, totalPosts, currentPage, handlePage }) => {
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <div className="pagination__btn" onClick={() => handlePage(Math.ceil(currentPage - 1))}>
        <LeftIcon className="pagination__icon" />
      </div>
      <div className="pagination__info">
        Page {Math.ceil(currentPage)} of{" "}
        {Math.ceil(totalPosts / postsPerPage) < 1 || isNaN(Math.ceil(totalPosts / postsPerPage))
          ? 1
          : Math.ceil(totalPosts / postsPerPage)}
      </div>
      <div className="pagination__btn" onClick={() => handlePage(Math.ceil(currentPage + 1))}>
        <RightIcon className="pagination__icon" />
      </div>
    </div>
  );
};

export default Pagination;
