import { Page } from "components/Page/Page";
import styles from "./VAdoptionModalContent.module.scss";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { accountNoQueryOptions } from "api/queryOptions";

export function VAdoptionModalContent() {
  const {
    data: accountNo,
    error,
    isLoading,
  } = useQuery(accountNoQueryOptions());
  const [accountNoCopied, setAccountNoCopied] = useState(false);

  const accountNoDisplay = error ? (
    "Błąd pobierania numeru konta..."
  ) : (
    <>
      Numer konta: <strong>{isLoading ? "Ładowanie..." : accountNo}</strong>
    </>
  );

  const copyText = accountNoCopied
    ? "Numer konta skopiowany!"
    : "Kopiuj numer konta";

  const handleCopyClick = () => {
    navigator.clipboard.writeText(accountNo!);
    setAccountNoCopied(true);
  };

  return (
    <div className={styles["v-adoption-modal-content"]}>
      <Page id="modal-adopcji-wirtualnej" />
      <p className={styles["para"]}>{accountNoDisplay}</p>
      <div className={styles["copy-button-wrapper"]}>
        <button
          disabled={isLoading}
          className={`${styles["copy-button"]} button-link`}
          onClick={handleCopyClick}
          onMouseLeave={() => setAccountNoCopied(false)}
        >
          {copyText}
        </button>
      </div>
    </div>
  );
}
