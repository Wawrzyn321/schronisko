import { ArticleProps } from "components/Article/Article";

type ErrorProps = Pick<ArticleProps, 'content' | 'title'>

export const ERROR_PAGE: ErrorProps = {
    content: 'Tak że tego, coś poszło nie tak.',
    title: 'Błąd ładowania strony',
};

export const ERROR_PAGE_NOT_FOUND: ErrorProps = {
    content: 'Wygląda na to, że podana strona nie istnieje.',
    title: 'Błąd ładowania strony',
};

export const ERROR_ANIMAL_NOT_FOUND: ErrorProps = {
    content: 'Wygląda na to, że podane zwierzę nie istnieje.',
    title: 'Błąd ładowania',
};

export const ERROR_ANIMAL_IMAGES: ErrorProps = {
    content: '',
    title: 'Błąd ładowania obrazów',
};

export const ERROR_GENERIC: ErrorProps = {
    content: 'Tak że tego, coś poszło nie tak.',
    title: 'Błąd ładowania'
}

export const ERROR_NEWS_NOT_FOUND: ErrorProps = {
    content: 'Wygląda na to, że podany news nie istnieje.',
    title: 'Błąd ładowania'
}

export const ERROR_ANIMAL_LIST: ErrorProps = {
    content: 'Tak że tego, coś poszło nie tak.',
    title: 'Błąd ładowania listy zwierząt',
}
