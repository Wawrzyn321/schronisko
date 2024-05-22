import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

@Injectable()
export class BcryptService {
  hashData = (data: string, rounds = 10) => {
    const salt = genSaltSync(rounds);
    return hashSync(data, salt);
  };

  compareHash = (data: string, hash: string) => {
    return compareSync(data, hash);
  };
}
