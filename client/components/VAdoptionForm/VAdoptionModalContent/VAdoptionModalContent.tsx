import { Page as PageModel } from "@prisma-app/client";
import { FetchError } from "api/api";
import { Page } from "components/Page/Page";
import styles from "./VAdoptionModalContent.module.scss";

const copyToClipboard = (
  value: string,
  successfully = () => null,
  failure = () => null,
) => {
  const clipboard = navigator.clipboard;
  if (clipboard !== undefined) {
    navigator.clipboard.writeText(value).then(successfully, failure);
  } else {
    if (document.execCommand) {
      const el = document.createElement("input");
      el.value = value;
      document.body.append(el);

      el.select();
      el.setSelectionRange(0, value.length);

      if (document.execCommand("copy")) {
        successfully();
      }

      el.remove();
    } else {
      failure();
    }
  }
};

export type AdoptionModalProps = {
  data: {
    page: PageModel;
    accountNo: string;
  };
  error: FetchError;
};

export function VAdoptionModalContent({ data, error }: AdoptionModalProps) {
  const { page, accountNo } = data;

  if (error) {
    return <p>Ups... coś poszło nie tak.</p>;
  }

  return (
    <div className={styles["v-adoption-modal-content"]}>
      <Page id="modal-adopcji-wirtualnej" ssrPage={page} />
      <p className={styles["para"]}>
        Numer konta: <strong>{accountNo}</strong>
      </p>
      <div className={styles["copy-button-wrapper"]}>
        <button
          className={`${styles["copy-button"]} button-link`}
          onClick={() => copyToClipboard(accountNo)}
        >
          Kopiuj numer konta
        </button>
      </div>
    </div>
  );
}
