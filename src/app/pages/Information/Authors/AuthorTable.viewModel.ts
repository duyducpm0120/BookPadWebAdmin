import { CreateAuthor } from './../../../../core/services/AuthorServices';
import { useGlobalState, AuthorModel, strings, useGlobalAlert, useGlobalLoading } from '@core';
import { useMemo, useState } from 'react';
import type { AuthorTableProps } from './AuthorTable.types';
import { AlertType } from '@core/store';

export const useViewModel = (props: AuthorTableProps) => {
  const { refetchAuthorsData } = props;
  const { CURRENT_PAGE_INDEX, CURRENT_PAGE } = useGlobalState();
  const [authorData, setAuthorData] = useState<AuthorModel>(AuthorModel.instantiate({}));
  const { createAuthorFunc } = CreateAuthor();
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const { showAlert } = useGlobalAlert();
  const isAddNewAuthorValid = useMemo(() => {
    return authorData.AuthorName !== '';
  }, [authorData.AuthorName]);

  const createAuthor = async () => {
    if (!isAddNewAuthorValid) {
      showAlert({
        message: strings.missing_required_fields,
        type: AlertType.ERROR
      });
      return;
    }
    showGlobalLoading();
    try {
      await createAuthorFunc({
        variables: {
          AuthorName: authorData.AuthorName,
          AuthorDescription: authorData.AuthorDescription,
          AuthorDOB: authorData.AuthorDOB,
          AuthorDOD: authorData.AuthorDOD
        }
      });
      showAlert({
        message: strings.success_create_author,
        type: AlertType.SUCCESS
      });
      await refetchAuthorsData();
    } catch (err) {
      const error: any = err;
      showAlert({
        message: error.message,
        type: AlertType.ERROR
      });
    }
    hideGlobalLoading();
  };
  return {
    selectors: {
      CURRENT_PAGE,
      CURRENT_PAGE_INDEX,
      authorData
    },
    handlers: {
      setAuthorData,
      createAuthor
    }
  };
};
