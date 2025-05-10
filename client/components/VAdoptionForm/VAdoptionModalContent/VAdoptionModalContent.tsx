import { Page } from "components/Page/Page";
import styles from "./VAdoptionModalContent.module.scss";

export type AdoptionModalProps = {
  accountNo: string;
  error: Error;
};

export function VAdoptionModalContent({ accountNo, error }: AdoptionModalProps) {
  if (error) {
    return <p>Ups... coś poszło nie tak.</p>;
  }

  return (
    <div className={styles["v-adoption-modal-content"]}>
      <Page id="modal-adopcji-wirtualnej" />
      <p className={styles["para"]}>
        Numer konta: <strong>{accountNo}</strong>
      </p>
      <div className={styles["copy-button-wrapper"]}>
        <button
          className={`${styles["copy-button"]} button-link`}
          onClick={() => navigator.clipboard.writeText(accountNo)}
        >
          Kopiuj numer konta
        </button>
      </div>
    </div>
  );
}
