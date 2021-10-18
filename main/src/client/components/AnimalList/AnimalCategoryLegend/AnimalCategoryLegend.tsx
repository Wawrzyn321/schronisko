import { AnimalCategory } from '.prisma/client';
import styles from './AnimalCategoryLegend.module.scss';

interface AnimalCategoryLegendProps {
  category: AnimalCategory;
  setCategory: (category: AnimalCategory) => any;
}

interface ColorCoderProps {
  color: string;
  category: AnimalCategory;
}

export function AnimalCategoryLegend({
  category: currentCategory,
  setCategory,
}: AnimalCategoryLegendProps) {
  const ColorCoder = ({ color, category }: ColorCoderProps) => {
    const switchCategory = (category: AnimalCategory) =>
      setCategory(category !== currentCategory ? category : undefined);

    const className = `${styles['color-coder']} ${
      currentCategory && category !== currentCategory
        ? styles['color-coder--inactive']
        : ''
    }`;

    return (
      <button
        onClick={() => switchCategory(category)}
        style={{ backgroundColor: color }}
        className={className}
      ></button>
    );
  };

  return (
    <dl className={styles['animal-category-legend']}>
      <dt>
        <ColorCoder
          color="#ee6f29"
          category={AnimalCategory.PilniePotrzebuja}
        />
        Pilnie szukam domu
      </dt>
      <dd>
        &#8211; zwierzak, który źle znosi pobyt w schronisku i jego adopcja jest
        priorytetem
      </dd>
      <br />
      <dt>
        <ColorCoder color="#4bc6df" category={AnimalCategory.Weterani} />
        Najdłużej czekam
      </dt>
      <dd>
        &#8211; zwierzak, który w schronisku przebywa już bardzo długo i nikt
        się nim nie interesuje
      </dd>
    </dl>
  );
}
