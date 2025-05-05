import { AfterAdoptionAnimal } from "types";
import { AfterAdoptionAnimals } from "./AfterAdoptionAnimals/AfterAdoptionAnimals";
import { AfterAdoptionHeader } from "./AfterAdoptionHeader/AfterAdoptionHeader";
import styles from "./AfterAdoption.module.scss";

export function AfterAdoption({
  afterAdoptionAnimals,
}: {
  afterAdoptionAnimals: AfterAdoptionAnimal[];
}) {
  return (
    <div className={styles["after-adoption-animals"]}>
      <AfterAdoptionHeader />
      <AfterAdoptionAnimals afterAdoptionAnimals={afterAdoptionAnimals} />
    </div>
  );
}
