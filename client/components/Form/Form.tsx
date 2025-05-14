import { useRef, useState } from "react";
import styles from "./Form.module.scss";

export function Form({
  handleSubmit,
  children,
}: {
  handleSubmit: () => void;
  children: (triedSubmitCounter: number) => React.ReactNode;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [triedSubmit, setTriedSubmit] = useState(0);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formRef.current!.checkValidity()) {
      handleSubmit();
      setTriedSubmit(0);
    } else {
      setTriedSubmit(triedSubmit + 1);
    }
    return false;
  };

  return (
    <form
      className={styles["form"]}
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
    >
      <p className={styles["form-required-data-info"]}>* Wymagane informacje</p>
      {children(triedSubmit)}
    </form>
  );
}
