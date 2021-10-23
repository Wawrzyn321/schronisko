import Modal from 'react-modal';

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

export function AnimalModal({
  isOpen,
  src,
  close,
  bwMode,
}: {
  isOpen: boolean;
  src: string;
  close: Function;
  bwMode: boolean;
}) {
  const style = bwMode ? { filter: 'grayscale(1)' } : {};
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <img style={style} src={src} alt="" />
    </Modal>
  );
}
