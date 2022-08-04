import { useNavigate } from 'react-router-dom';
import { PaginationDirection, PaginationProps } from '../../types';

const Pagination = (props: PaginationProps) => {
  const { setPage, currentPage } = props;
  const navigate = useNavigate();
  const navHandler = (direction: PaginationDirection) => {
    if (direction === 'prev' && currentPage - 1 !== -1) {
      navigate(`/coins/?page=${currentPage - 1}`, { replace: false });
      setPage(currentPage - 1);
    }
    if (direction === 'next' && currentPage - 1 !== 99) {
      navigate(`/coins/?page=${currentPage + 1}`, { replace: false });
      setPage(currentPage + 1);
    }
  };
  return (
    <>
      <button onClick={() => navHandler('prev')}>Previous</button>
      <button onClick={() => navHandler('next')}>Next</button>
    </>
  );
};

export default Pagination;
