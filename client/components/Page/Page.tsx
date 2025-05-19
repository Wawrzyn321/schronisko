import { ErrorWrapper, ERROR_PAGE, ERROR_PAGE_NOT_FOUND } from "util/errors";
import { Article } from "../Article/Article";
import { pageQueryOptions } from "api/queryOptions";
import { useQuery } from "@tanstack/react-query";

type PageProps = {
  id: string;
  showTitle?: boolean;
};

export function Page({ id, showTitle = true }: PageProps) {
  const { data: page, error } = useQuery(pageQueryOptions(id));

  return (
    <ErrorWrapper
      isLoaded={!!page}
      error={error}
      errorGeneric={{ ...ERROR_PAGE, showTitle }}
      error404={{ ...ERROR_PAGE_NOT_FOUND, showTitle }}
    >
      {page && (
        <Article
          title={page.title}
          content={page.content}
          showTitle={showTitle}
        />
      )}
    </ErrorWrapper>
  );
}
