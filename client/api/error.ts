export type ZodIssue = {
  code: string;
  message: string;
  path: string[];
  validation: string;
};

export class FetchError extends Error {
  statusCode: number;
  issues: ZodIssue[];

  constructor(message: string, statusCode: number, issues: ZodIssue[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.issues = issues;
  }
}

export function getZodIsses(error: Error) {
  if (error instanceof FetchError && "issues" in error) {
    return error.issues;
  }
  return [];
}
