import { genSalt, hash } from "bcryptjs";

const _generateSalt = (rounds = 10): Promise<string> => {
  return new Promise((resolve, reject) => {
    return genSalt(rounds, (error: Error, salt: string) => {
      if (error) reject(error);
      resolve(salt);
    });
  });
};

export const hashData = (data: string, rounds = 10): Promise<string> => {
  return new Promise((resolve, reject) => {
    _generateSalt(rounds).then((salt) => {
      return hash(data, salt, (error: Error, hash: string) => {
        if (error) reject(error);
        resolve(hash);
      });
    });
  });
};
