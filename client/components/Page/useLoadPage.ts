import { FetchError } from "api/api";
import { useEffect, useState } from "react";
import { Page } from "@prisma-app/client";
import { PageFetchFn } from "types";

type Args = {
  id: string;
  ssrPage: Page;
  fetchFn: PageFetchFn;
};

export function useLoadPage({ id, ssrPage, fetchFn }: Args) {
  const [page, setPage] = useState<Page>(ssrPage);
  const [error, setError] = useState<FetchError>();

  useEffect(() => {
    const loadPage = async () => {
      const { data, error } = await fetchFn(id);
      setPage(data);
      setError(error);
    };

    if (!ssrPage && !!id) {
      loadPage();
    }
  }, [fetchFn, id, ssrPage]);

  return { page, error };
}
