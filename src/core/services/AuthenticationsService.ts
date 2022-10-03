import type { AxiosResponse } from 'axios';
import axios from 'axios';
export const signIn = async ({
  email,
  password
}: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => {
  const response = await axios.post('http://localhost:4000/auth/login', {
    Email: email,
    Password: password
  });
  return response;
};
