import { isSSR } from "./config";

export class FetchError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export async function doFetch(
  input: string,
  init: RequestInit | null = null,
): Promise<any> {
  function createRequestOptions(): RequestInit | null {
    if (input.startsWith("http://")) {
      return null;
    }
    if (isSSR()) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Agent = (require("https") as any).Agent;
      return {
        agent: new Agent({ rejectUnauthorized: true }),
      } as RequestInit;
    }
    return null;
  }

  const response = await fetch(input, { ...init, ...createRequestOptions() });
  if (response.ok) {
    if (response.headers.get("content-type")?.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  }
  const error = await response.json();
  throw new FetchError(error.message, error.statusCode);
}

export async function doPost(url: string, body: unknown) {
  return await doFetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}
