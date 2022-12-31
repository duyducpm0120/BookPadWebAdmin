import { END_POINT, UserInfoModel } from '@core';
import axios from 'axios';
const getAllUserEndpoint = END_POINT + '/user/getAllUsers';
const banUserEndpoint = END_POINT + '/user/banUser';
const unbanUserEndpoint = END_POINT + '/user/unbanUser';
export const getUserList = async (token: string) => {
  const response = await axios.post(
    getAllUserEndpoint,
    {
      limit: 100,
      last: 0
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return UserInfoModel.instantiateList(response.data.users);
};

export const banUser = async (token: string, userId: number) => {
  const response = await axios.post(
    banUserEndpoint,
    {
      userId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const unbanUser = async (token: string, userId: number) => {
  const response = await axios.post(
    unbanUserEndpoint,
    {
      userId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};
