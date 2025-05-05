import Link from "next/link";
import styles from "./GetInvolved.module.scss";

export function GetInvolved() {
  return (
    <div className={styles["get-involved"]}>
      <span className={styles["get-involved__panel"]}>
        <Link href="/volunteering/dogs">
          Chcesz zapisać się na wolontariat?
        </Link>
      </span>
      <span className={styles["get-involved__panel"]}>
        <Link href="/v-adoptions/how-to">Chcesz inaczej nam pomóc?</Link>
      </span>
    </div>
  );
}
