import { Animal, AnimalCategory } from "@prisma-app/client";
import { buildAnimalImageUrl } from "api/config";
import { Modal } from "components/Modal";
import styles from "./AnimalModal.module.scss";

export type AnimalModalData = {
  isOpen: boolean;
  animal: Animal;
};

export function AnimalModal({
  isOpen,
  animal,
  close,
}: {
  isOpen: boolean;
  animal: Animal;
  close: () => void;
}) {
  if (!animal) return null;

  const bwMode = animal.category === AnimalCategory.ZaTeczowymMostem;
  const style = bwMode ? { filter: "grayscale(1)" } : {};
  const src = buildAnimalImageUrl(animal);

  return (
    <Modal isOpen={isOpen} onRequestClose={close}>
      <img style={style} className={styles["image"]} src={src} alt="" />
    </Modal>
  );
}
