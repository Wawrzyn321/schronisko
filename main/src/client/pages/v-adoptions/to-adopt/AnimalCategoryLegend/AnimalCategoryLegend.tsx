import { AnimalCategory } from '.prisma/client';
import styles from './AnimalCategoryLegend.module.scss';

export function AnimalCategoryLegend({
  category: currentCategory,
  setCategory,
}: {
  category: AnimalCategory;
  setCategory: (category: AnimalCategory) => any;
}) {
  const ColorCoder = ({
    color,
    category,
  }: {
    color: string;
    category: AnimalCategory;
  }) => {
    const switchCategory = (category: AnimalCategory) =>
      setCategory(category !== currentCategory ? category : undefined);

    return (
      <button
        onClick={() => switchCategory(category)}
        style={{ backgroundColor: color }}
        className={`${styles['color-coder']} ${
          currentCategory && category !== currentCategory
            ? styles['color-coder--inactive']
            : ''
        }`}
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
