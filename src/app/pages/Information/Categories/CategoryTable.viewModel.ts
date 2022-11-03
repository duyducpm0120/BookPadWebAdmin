import { useGlobalState, strings, useGlobalAlert, useGlobalLoading, CategoryModel } from '@core';
import { useMemo, useState } from 'react';
import type { CategoryTableProps } from './CategoryTable.types';
import { AlertType } from '@core/store';
import { CreateCategory } from '@core/services';

export const useViewModel = (props: CategoryTableProps) => {
  const { refetchCategoriesData } = props;
  const { CURRENT_PAGE_INDEX, CURRENT_PAGE } = useGlobalState();
  const [categoryData, setCategoryData] = useState<CategoryModel>(CategoryModel.instantiate({}));
  const { createCategoryFunc } = CreateCategory();
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const { showAlert } = useGlobalAlert();
  const isAddNewCategoryValid = useMemo(() => {
    return categoryData.CategoryName !== '';
  }, [categoryData.CategoryName]);

  const createCategory = async () => {
    if (!isAddNewCategoryValid) {
      showAlert({
        message: strings.missing_required_fields,
        type: AlertType.ERROR
      });
      return;
    }
    showGlobalLoading();
    try {
      await createCategoryFunc({
        variables: {
          CategoryName: categoryData.CategoryName,
          CategoryDescription: categoryData.CategoryDescription
        }
      });
      showAlert({
        message: strings.success_create_Category,
        type: AlertType.SUCCESS
      });
      await refetchCategoriesData();
    } catch (err) {
      const error: any = err;
      showAlert({
        message: error.message,
        type: AlertType.ERROR
      });
    }
    hideGlobalLoading();
  };

  const resetCategoryData = () => {
    setCategoryData(CategoryModel.instantiate({}));
  };
  return {
    selectors: {
      CURRENT_PAGE,
      CURRENT_PAGE_INDEX,
      categoryData
    },
    handlers: {
      setCategoryData,
      createCategory,
      resetCategoryData
    }
  };
};
