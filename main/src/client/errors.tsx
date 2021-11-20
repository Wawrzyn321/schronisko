import { FetchError } from 'api';
import { Article, ArticleProps } from 'components/Article/Article';
import { LayoutWrapper } from 'components/LayoutWrapper';
import React from 'react';

type ErrorProps = Pick<ArticleProps, 'content' | 'title'>;

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
  title: 'Błąd ładowania',
};

export const ERROR_NEWS_NOT_FOUND: ErrorProps = {
  content: 'Wygląda na to, że podany news nie istnieje.',
  title: 'Błąd ładowania',
};

export const ERROR_ANIMAL_LIST: ErrorProps = {
  content: 'Tak że tego, coś poszło nie tak.',
  title: 'Błąd ładowania listy zwierząt',
};

type ErrorWrapperProps = {
  isLoaded: boolean;
  error: FetchError;
  children: JSX.Element;
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
  const withLayoutWrapper = (children: React.ReactChild) => (
    <LayoutWrapper>{children}</LayoutWrapper>
  );

  if (error) {
    if (error.statusCode === 404 && error404) {
      return withLayoutWrapper(<Article {...error404} />);
    } else {
      return withLayoutWrapper(<Article {...errorGeneric} />);
    }
  } else if (!isLoaded) {
    return withLayoutWrapper('Ładowanie...');
  } else {
    return withLayoutWrapper(children);
  }
}
