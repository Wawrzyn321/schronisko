import { genSaltSync, hashSync } from "bcryptjs";

export const hashData = (data: string, rounds = 10) => {
  const salt = genSaltSync(rounds);
  return hashSync(data, salt);
};
