import { ReactChild } from 'react';
import ReactModal from 'react-modal';

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
ReactModal.setAppElement('#__next');

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactChild;
};

export function Modal({ isOpen, onRequestClose, children }: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      {children}
    </ReactModal>
  );
}
