import { AfterAdoptionAnimals } from "./AfterAdoptionAnimals/AfterAdoptionAnimals";
import { AfterAdoptionHeader } from "./AfterAdoptionHeader/AfterAdoptionHeader";
import styles from "./AfterAdoption.module.scss";

export function AfterAdoption() {
  return (
    <div className={styles["after-adoption-animals"]}>
      <AfterAdoptionHeader />
      <AfterAdoptionAnimals />
    </div>
  );
}
