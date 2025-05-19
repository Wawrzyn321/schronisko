import { FieldErrors as RHFFieldErrors, FieldValues } from "react-hook-form";
import styles from "./Field.module.scss";

type Props = {
  error: RHFFieldErrors[string];
};

export function FieldErrors({ error }: Props) {
  if (!error) {
    return null;
  }

  const message = (() => {
    switch (error.type) {
      case "required":
        return "Pole jest wymagane";
      case "pattern":
        return "Należy podać adres e-mail";
      case "minLength":
      case "maxLength":
        return "Nieprawidłowa długość";
      default:
        return "Bład";
    }
  })();

  return (
    <p role="alert" className={styles["validation-message"]}>
      {message}
    </p>
  );
}
