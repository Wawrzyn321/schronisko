import { LayoutWrapper } from 'components/LayoutWrapper/LayoutWrapper';
import styles from './AnimalCategoryLegend.module.scss';

export function AnimalCategoryLegend() {
  const ColorCoder = ({ color }: { color: string }) => {
    return (
      <span
        style={{ backgroundColor: color }}
        className={styles['color-coder']}
      ></span>
    );
  };

  return (
    <LayoutWrapper>
      <dl className={styles['animal-category-legend']}>
        <dt>
          <ColorCoder color="#ee6f29" />
          Pilnie szukam domu
        </dt>
        <dd>
          &#8211; zwierzak, który źle znosi pobyt w schronisku i jego adopcja
          jest priorytetem
        </dd>
        <br />
        <dt>
          <ColorCoder color="#4bc6df" />
          Najdłużej czekam
        </dt>
        <dd>
          &#8211; zwierzak, który w schronisku przebywa już bardzo długo i nikt
          się nim nie interesuje
        </dd>
      </dl>
    </LayoutWrapper>
  );
}
