import axios from 'axios';
import { Token } from '../types';

export const getTokens = async (): Promise<Token[]> => {
  const { data } = await axios.get<Token[]>('/api/tokens');

  return data;
};

export const updateToken = async (token: Token): Promise<Token> => {
  const { data } = await axios.put<Token>(`/api/tokens/${token.id}`, { token });

  return data;
};
