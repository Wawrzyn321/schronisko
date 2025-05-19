import styles from "./AddressInfo.module.scss";

export function AddressInfo() {
  return (
    <address className={styles["address-info"]}>
      <p>Schronisko dla Bezdomnych Zwierząt Miejskiego</p>
      <p>Zakładu Usług Komunalnych</p>
      <p>Baczyńskiego 2B, 41-203 Sosnowiec</p>
    </address>
  );
}
