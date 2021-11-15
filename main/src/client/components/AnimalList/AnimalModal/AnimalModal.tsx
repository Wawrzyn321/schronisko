import { Animal, AnimalCategory } from '.prisma/client';
import Modal from 'react-modal';
import { buildAnimalImageUrl } from '_util';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#__next');

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
  close: Function;
}) {
  if (!animal) return null;

  const bwMode = animal.category === AnimalCategory.ZaTeczowymMostem;
  const style = bwMode ? { filter: 'grayscale(1)' } : {};
  const src = buildAnimalImageUrl(animal);

  return (
    <Modal isOpen={isOpen} onRequestClose={close} style={customStyles}>
      <img style={style} src={src} alt="" />
    </Modal>
  );
}
