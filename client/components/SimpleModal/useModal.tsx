import Image, { StaticImageData } from 'next/image';
import { Modal } from 'components/Modal';
import { useState } from 'react';
import styles from './SimpleModal.module.scss';
import ilu_kot from 'public/site/ilu kot.png';

type useSimpleModalProps = {
  text: JSX.Element;
  image: StaticImageData;
  title: string;
};

export function useSimpleModal({
  title,
  text,
  image,
}: useSimpleModalProps): [JSX.Element, () => void] {
  const [showModal, setShowModal] = useState(false);

  const ModalBody = (
    <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
      <div className={styles['bad-captcha-modal']}>
        <div className={styles['bad-captcha-modal__left']}>
          <h1 className={styles['bad-captcha-modal__title']}>{title}</h1>
          <p className={styles['bad-captcha-modal__text']}>{text}</p>
          <button
            className={`${styles['bad-captcha-modal__button']} button-link`}
            onClick={() => setShowModal(false)}
          >
            OK
          </button>
        </div>
        {image && <Image src={image} alt="" />}
      </div>
    </Modal>
  );

  return [ModalBody, () => setShowModal(true)];
}

export function useBadCaptchaModal() {
  return useSimpleModal({
    title: 'Upsss...',
    image: ilu_kot,
    text: (
      <>
        Nieprawidłowa captcha!
        <br />
        Spróbuj ponownie.
      </>
    ),
  });
}
