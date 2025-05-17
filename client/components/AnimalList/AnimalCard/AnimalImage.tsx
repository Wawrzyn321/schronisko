import Link from "next/link";
import { buildAnimalImageUrl, buildAnimalUrl } from "api/config";
import { Animal, AnimalCategory } from "@prisma-app/client";
import { isReadonly } from "../isReadonly";
import Image from "next/image";

type Props = {
  animal: Animal;
  canNavigate: boolean;
};

export function AnimalImage({ animal, canNavigate }: Props) {
  const bwMode = animal.category === AnimalCategory.ZaTeczowymMostem;
  const imageStyle = bwMode ? { filter: "grayscale(1)" } : {};

  const image = (
    <Image
      src={buildAnimalImageUrl(animal)}
      alt={animal.name}
      width={340}
      height={340}
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
