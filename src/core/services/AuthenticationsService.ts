import { SignInModel } from '@core/models';
import axios from 'axios';
export const signIn = async ({
  email,
  password
}: {
  email: string;
  password: string;
}): Promise<SignInModel> => {
  const response = await axios.post('http://localhost:4000/auth/login', {
    Email: email,
    Password: password
  });

  console.log('response', response);
  return SignInModel.instantiate(response);
};
