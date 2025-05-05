import Image, { StaticImageData } from "next/image";
import { Modal } from "components/Modal";
import { useState } from "react";
import styles from "./SimpleModal.module.scss";

type useSimpleModalProps = {
  text: JSX.Element;
  image: StaticImageData;
  title: string;
};

export function useSimpleModal({ title, text, image }: useSimpleModalProps) {
  const [showModal, setShowModal] = useState(false);

  const ModalBody = (
    <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
      <div className={styles["simple-modal-modal"]}>
        <div className={styles["simple-modal-modal__left"]}>
          <h1 className={styles["simple-modal-modal__title"]}>{title}</h1>
          <p className={styles["simple-modal-modal__text"]}>{text}</p>
          <button
            className={`${styles["simple-modal-modal__button"]} button-link`}
            onClick={() => setShowModal(false)}
          >
            OK
          </button>
        </div>
        {image && <Image src={image} alt="" />}
      </div>
    </Modal>
  );

  return [ModalBody, () => setShowModal(true)] as const;
}
