import { Page as PageModel } from "@prisma-app/client";
import { fetchPage } from "api/api";
import { ErrorWrapper, ERROR_PAGE, ERROR_PAGE_NOT_FOUND } from "errors";
import { PageFetchFn } from "types";
import { Article } from "../Article/Article";
import { useLoadPage } from "./useLoadPage";

type PageProps = {
  id?: string;
  ssrPage: PageModel;
  showTitle?: boolean;
  fetchFn?: PageFetchFn;
};

export function Page({
  id,
  ssrPage,
  fetchFn = fetchPage,
  showTitle = true,
}: PageProps) {
  const { page, error } = useLoadPage({ id, ssrPage, fetchFn });

  return (
    <ErrorWrapper
      isLoaded={!!page}
      error={error}
      errorGeneric={{ ...ERROR_PAGE, showTitle }}
      error404={{ ...ERROR_PAGE_NOT_FOUND, showTitle }}
    >
      <Article
        title={page?.title}
        content={page?.content}
        showTitle={showTitle}
      />
    </ErrorWrapper>
  );
}
