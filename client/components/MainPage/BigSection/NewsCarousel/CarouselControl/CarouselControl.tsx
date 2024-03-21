import Image from 'next/image';
import whiteArrow from 'public/site/main/white arrow.svg';
import styles from './CarouselControl.module.scss';

export function CarouselControl({
  index, total, setIndex,
}: {
  index: number;
  total: number;
  setIndex: (i: number) => void;
}) {
  const inc = () => setIndex((index + 1) % total);

  const dec = () => setIndex(index - 1 < 0 ? total - 1 : index - 1);

  return (
    <>
      <div className={styles['carousel__left-right']}>
        <Image src={whiteArrow} alt="lewo" onClick={dec} />
        <Image src={whiteArrow} alt="prawo" onClick={inc} />
      </div>
      <ul className={styles['carousel__bottom']}>
        {new Array(total).fill(null).map((_: null, i) => (
          <li
            className={index === i ? styles['carousel--current'] : ''}
            key={i}
            onClick={() => setIndex(i)} />
        ))}
      </ul>
    </>
  );
}
