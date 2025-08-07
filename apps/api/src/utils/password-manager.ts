import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt';

export const saltRounds = 10;

export async function hashPassword(plainPassword: string) {
  return await bcryptHash(plainPassword, saltRounds);
}

export async function compare(
  hashedPassword: string,
  plainPassword: string
) {
  return await bcryptCompare(plainPassword, hashedPassword);
}
