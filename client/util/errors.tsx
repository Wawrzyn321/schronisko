import { Article, ArticleProps } from "components/Article/Article";
import React from "react";

type ErrorProps = Pick<ArticleProps, "content" | "title">;

export const ERROR_PAGE: ErrorProps = {
  content: "Tak że tego, coś poszło nie tak.",
  title: "Błąd ładowania strony",
};

export const ERROR_PAGE_NOT_FOUND: ErrorProps = {
  content: "Wygląda na to, że podana strona nie istnieje.",
  title: "Błąd ładowania strony",
};

export const ERROR_ANIMAL_NOT_FOUND: ErrorProps = {
  content: "Wygląda na to, że podane zwierzę nie istnieje.",
  title: "Błąd ładowania",
};

export const ERROR_ANIMAL_IMAGES: ErrorProps = {
  content: "",
  title: "Błąd ładowania obrazów",
};

export const ERROR_GENERIC: ErrorProps = {
  content: "Tak że tego, coś poszło nie tak.",
  title: "Błąd ładowania",
};

export const ERROR_NEWS_NOT_FOUND: ErrorProps = {
  content: "Wygląda na to, że podany news nie istnieje.",
  title: "Błąd ładowania",
};

export const ERROR_ANIMAL_LIST: ErrorProps = {
  content: "Tak że tego, coś poszło nie tak.",
  title: "Błąd ładowania listy zwierząt",
};

export const ERROR_VOLUNTEERING_FORM: ErrorProps = {
  content: "Tak że tego, coś poszło nie tak.",
  title: "Błąd ładowania formularza wolontariatu",
};

type ErrorWrapperProps = {
  isLoaded: boolean;
  error: Error | null;
  children: React.ReactNode;
  errorGeneric: ErrorProps & { showTitle?: boolean };
  error404?: ErrorProps & { showTitle?: boolean };
};

export function ErrorWrapper({
  isLoaded,
  error,
  children,
  errorGeneric,
  error404,
}: ErrorWrapperProps): JSX.Element {
  if (error) {
    console.log(Object.keys(error));
    if ("statusCode" in error && error.statusCode === 404 && error404) {
      return <Article {...error404} />;
    } else {
      return <Article {...errorGeneric} />;
    }
  } else if (!isLoaded) {
    return <p>Ładowanie...</p>;
  } else {
    return <>{children}</>;
  }
}
