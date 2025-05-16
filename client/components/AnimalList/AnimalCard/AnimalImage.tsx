import Link from "next/link";
import { buildAnimalImageUrl, buildAnimalUrl } from "api/config";
import { Animal, AnimalCategory } from "@prisma-app/client";
import { isReadonly } from "../isReadonly";

type Props = {
  animal: Animal;
  canNavigate: boolean;
};

export function AnimalImage({ animal, canNavigate }: Props) {
  const bwMode = animal.category === AnimalCategory.ZaTeczowymMostem;
  const imageStyle = bwMode ? { filter: "grayscale(1)" } : {};

  const image = (
    <img
      src={buildAnimalImageUrl(animal)}
      alt={animal.name}
      width="340px"
      height="340px"
      style={imageStyle}
    />
  );

  const canGoToDetails = !isReadonly(animal.category);
  if (canGoToDetails && canNavigate) {
    return (
      <Link href={buildAnimalUrl(animal.id)}>
        <span style={{ cursor: "pointer" }}>{image}</span>
      </Link>
    );
  } else {
    return image;
  }
}
