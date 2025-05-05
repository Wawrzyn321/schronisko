import styles from "./HeaderContactInfo.module.scss";

function Tel({ tel }: { tel: string }) {
  return (
    <strong>
      <a href={`tel:${tel}`}>{tel}</a>
    </strong>
  );
}

export function HeaderContactInfo() {
  return (
    <div className={styles["header-contact-info"]}>
      Biuro (7:00-14:00): <Tel tel="32 293 75 56" />
      <br />
      <span style={{ color: "red" }} className="important">
        Zgłoszenia 24 h:
      </span>{" "}
      <Tel tel="655 734 532" />
    </div>
  );
}
