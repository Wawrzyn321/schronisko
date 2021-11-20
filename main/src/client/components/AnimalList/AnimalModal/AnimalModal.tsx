import { Animal, AnimalCategory } from '.prisma/client';
import { buildAnimalImageUrl } from '_util';
import { Modal } from 'components/Modal';

export interface AnimalModalData {
  isOpen: boolean;
  animal: Animal;
}

export function AnimalModal({
  isOpen,
  animal,
  close,
}: {
  isOpen: boolean;
  animal: Animal;
  close: () => any;
}) {
  if (!animal) return null;

  const bwMode = animal.category === AnimalCategory.ZaTeczowymMostem;
  const style = bwMode ? { filter: 'grayscale(1)' } : {};
  const src = buildAnimalImageUrl(animal);

  return (
    <Modal isOpen={isOpen} onRequestClose={close}>
      <img style={style} src={src} alt="" />
    </Modal>
  );
}
