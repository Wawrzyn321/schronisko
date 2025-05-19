import { useFormState } from "react-hook-form";
import styles from "./SubmitButton.module.scss";

export function SubmitButton({ children }: React.PropsWithChildren) {
  const { isValid } = useFormState();

  return (
    <button className={styles["form--button"]} disabled={!isValid}>
      {children}
    </button>
  );
}
