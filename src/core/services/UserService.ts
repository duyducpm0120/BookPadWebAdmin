import { END_POINT, UserInfoModel } from '@core';
import axios from 'axios';

const mockUsers: UserInfoModel[] = [
  new UserInfoModel(
    1,
    true,
    '123-456-7890',
    'admin@example.com',
    true,
    true,
    'Male',
    1,
    'admin',
    'https://example.com/admin.jpg'
  ),
  new UserInfoModel(
    2,
    false,
    '234-567-8901',
    'user1@example.com',
    true,
    true,
    'Female',
    2,
    'user1',
    'https://example.com/user1.jpg'
  ),
  new UserInfoModel(
    3,
    false,
    '345-678-9012',
    'user2@example.com',
    true,
    true,
    'Non-binary',
    3,
    'user2',
    'https://example.com/user2.jpg'
  ),
  new UserInfoModel(
    4,
    false,
    '456-789-0123',
    'user3@example.com',
    false,
    true,
    'Male',
    1,
    'user3',
    'https://example.com/user3.jpg'
  ),
  new UserInfoModel(
    5,
    false,
    '567-890-1234',
    'user4@example.com',
    true,
    false,
    'Female',
    2,
    'user4',
    'https://example.com/user4.jpg'
  ),
  new UserInfoModel(
    6,
    false,
    '678-901-2345',
    'user5@example.com',
    true,
    true,
    'Non-binary',
    3,
    'user5',
    'https://example.com/user5.jpg'
  ),
  new UserInfoModel(
    7,
    false,
    '789-012-3456',
    'user6@example.com',
    true,
    true,
    'Male',
    1,
    'user6',
    'https://example.com/user6.jpg'
  ),
  new UserInfoModel(
    8,
    false,
    '890-123-4567',
    'user7@example.com',
    true,
    true,
    'Female',
    2,
    'user7',
    'https://example.com/user7.jpg'
  ),
  new UserInfoModel(
    9,
    false,
    '901-234-5678',
    'user8@example.com',
    true,
    true,
    'Non-binary',
    3,
    'user8',
    'https://example.com/user8.jpg'
  ),
  new UserInfoModel(
    10,
    false,
    '012-345-6789',
    'user9@example.com',
    true,
    true,
    'Male',
    1,
    'user9',
    'https://example.com/user9.jpg'
  )
];

const getAllUserEndpoint = END_POINT + '/user/getAllUsers';
const banUserEndpoint = END_POINT + '/user/banUser';
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
