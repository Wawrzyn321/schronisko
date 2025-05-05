import Image from "next/image";
import nadziejaLogo from "public/site/nadzieja_logo.gif";
import styles from "./LeadBy.module.scss";

export function LeadBy() {
  return (
    <div className={styles["lead-by"]}>
      <span>Strona prowadzona społecznie przez:</span>
      <a
        href="https://nadziejanadom.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          width={150}
          height={82}
          src={nadziejaLogo}
          alt="nadzieja na dom link"
        ></Image>
      </a>
    </div>
  );
}
