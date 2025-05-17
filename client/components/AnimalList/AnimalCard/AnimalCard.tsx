import styles from "./AnimalCard.module.scss";
import lupa from "public/site/lupa.svg";
import { Overlay } from "./Overlay";
import { Animal } from "@prisma-app/client";
import { AnimalImage } from "./AnimalImage";
import Image from "next/image";

type AnimalCardProps = {
  animal: Animal;
  showOverlay: boolean;
  openModal: (animal: Animal) => void;
  interactive: boolean;
};

export function AnimalCard({
  animal,
  showOverlay = false,
  openModal,
  interactive,
}: AnimalCardProps) {
  return (
    <li className={styles["animal-card"]}>
      <div className={styles["img-wrapper"]}>
        <AnimalImage animal={animal} canNavigate={interactive} />
        <div className={styles["mag-glass"]}>
          <Image
            src={lupa}
            alt="Powiększ"
            width={20}
            height={20}
            onClick={interactive ? () => openModal(animal) : () => {}}
          />
        </div>
        {showOverlay && <Overlay category={animal.category} />}
      </div>
      <div className={styles["animal-ids"]}>
        <span className={styles["animal-name"]}>{animal.name}</span>
        <span>{animal.refNo}</span>
      </div>
      <dl className={styles["animal-data"]}>
        <dt>Miejsce pobytu:</dt>
        <dd>{animal.location ?? 'Nie podano'}</dd>
        <dt>Opiekun wirtualny:</dt>
        <dd>{animal.virtualCaretakerName || "Brak"}</dd>
      </dl>
    </li>
  );
}
