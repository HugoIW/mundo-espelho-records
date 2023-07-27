import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
};

export const isMatchHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
