import React from 'react';
import Image from 'next/image';
import styles from './Pagination.module.scss';
import arrow from 'public/site/green arrow.svg';

const makePartitions = (currentPage: number, pagesCount: number) => {
  const radius = 3;
  return new Array(pagesCount)
    .fill(0)
    .map((_, i) => i)
    .filter(
      (i) =>
        i < radius ||
        i > pagesCount - radius - 1 ||
        Math.abs(i - currentPage) <= radius / 2,
    );
};

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
  setCurrentPage: (page: number) => void;
}) {
  const partitions = makePartitions(currentPage, pagesCount);

  return (
    <ul className={styles['pagination']}>
      <button
        className={styles['prev-button']}
        disabled={currentPage === 0}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <Arrow />
      </button>
      {partitions.map((current, index) => (
        <React.Fragment key={index}>
          {index > 0 && current - partitions[index - 1] > 1 && '...'}
          <li>
            <button
              className={
                current === currentPage ? styles['pagination-current-item'] : ''
              }
              onClick={() => setCurrentPage(current)}
            >
              {current + 1}
            </button>
          </li>
        </React.Fragment>
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
