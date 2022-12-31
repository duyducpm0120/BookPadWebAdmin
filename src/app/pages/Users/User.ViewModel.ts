import {
  UserInfoModel,
  strings,
  useAuthToken,
  useGlobalAlert,
  useGlobalLoading,
  useMount
} from '@core';
import { banUser, getUserList, unbanUser } from '@core/services/UserService';
import { AlertType } from '@core/store';
import { useState } from 'react';

export const useViewModel = () => {
  const [userList, setUserList] = useState<UserInfoModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserInfoModel>(UserInfoModel.instantiate({}));
  const { authToken } = useAuthToken();
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const { showAlert } = useGlobalAlert();

  const fetchData = async () => {
    try {
      const userList = await getUserList(authToken);
      setUserList(userList);
      setIsLoading(false);
    } catch (err) {
      console.log('fetch User data failed', err);
    }
  };
  const banSelectedUser = async () => {
    showGlobalLoading();
    try {
      await banUser(authToken, selectedUser.UserId);
      showAlert({
        message: strings.success_ban_user,
        type: AlertType.SUCCESS
      });
      await fetchData();
    } catch (err) {
      const error: any = err;
      showAlert({
        message: error.message,
        type: AlertType.ERROR
      });
    }
    hideGlobalLoading();
  };
  const unbanSelectedUser = async () => {
    showGlobalLoading();
    try {
      await unbanUser(authToken, selectedUser.UserId);
      showAlert({
        message: strings.success_unban_user,
        type: AlertType.SUCCESS
      });
      await fetchData();
    } catch (err) {
      const error: any = err;
      showAlert({
        message: error.message,
        type: AlertType.ERROR
      });
    }
    hideGlobalLoading();
  };

  useMount(() => {
    fetchData();
  });

  return {
    selectors: {
      userList,
      isLoading,
      selectedUser
    },
    handlers: {
      fetchData,
      setUserList,
      setIsLoading,
      setSelectedUser,
      banSelectedUser,
      unbanSelectedUser
    }
  };
};
