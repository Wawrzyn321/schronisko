import Image from 'next/image';
import styles from './Pagination.module.scss';
import arrow from 'public/site/green arrow.svg';

export function paginate<T>(
  items: T[],
  pageSize: number,
  currentPage: number,
): T[] {
  const res: T[] = [];
  for (
    let i = pageSize * currentPage;
    i < pageSize * (currentPage + 1) && i < items.length;
    i++
  ) {
    res.push(items[i]);
  }
  return res;
}

function Arrow() {
  const size = '10px';
  return (
    <Image src={arrow} alt="poprzednia strona" width={size} height={size} />
  );
}

export function Pagination({
  currentPage,
  pagesCount,
  setCurrentPage,
}: {
  currentPage: number;
  pagesCount: number;
  setCurrentPage: (page: number) => any;
}) {
  return (
    <ul className={styles['pagination']}>
      <button
        className={styles['prev-button']}
        disabled={currentPage === 0}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <Arrow />
      </button>
      {new Array(pagesCount).fill(null).map((_: null, i) => (
        <li key={i}>
          <button
            className={
              i === currentPage ? styles['pagination-current-item'] : ''
            }
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </button>
        </li>
      ))}
      <button
        disabled={currentPage === pagesCount - 1}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <Arrow />
      </button>
    </ul>
  );
}
