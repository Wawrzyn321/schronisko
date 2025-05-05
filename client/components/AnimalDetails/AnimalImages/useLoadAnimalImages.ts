import { fetchAnimalImages } from "api/api";
import { useEffect, useState } from "react";
import { AnimalImage } from '@prisma-app/client';

export function useLoadAnimalImages(id: string) {
    const [images, setImages] = useState<AnimalImage[]>([]);

    useEffect(() => {
        const loadImages = async () => {
            const { data } = await fetchAnimalImages(id);
            setImages(data);
        };

        if (images.length === 0) {
            loadImages();
        }
    }, [id, images.length]);

    return images;
}