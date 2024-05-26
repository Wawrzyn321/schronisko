import path from "path";

export const GALLERY_PATH =
    "/Users/pw/dev/schronisko/schronisko_sosnowiec_pl/public_html/gallery";
export const THUMBS_PATH = path.join(GALLERY_PATH, "thumbs");
export const NEWS_IMAGES_PATH = path.join(GALLERY_PATH, 'news')

const TARGET_ROOT_PATH = '/Users/pw/dev/schronisko-out'
export const TARGET_NEWS_PATH = path.join(TARGET_ROOT_PATH, 'news');
export const TARGET_ANIMALS_PATH = path.join(TARGET_ROOT_PATH, 'animals');
export const TARGET_ANIMAL_IMAGES_PATH = path.join(TARGET_ANIMALS_PATH, "pics");
