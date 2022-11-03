import { useQuery, useMutation } from '@apollo/client';
import { CategoryModel, CREATE_CATEGORY, GET_ALL_CATEGORIES } from '@core';

export const GetAllCategories = () => {
  const { data, error, loading, refetch } = useQuery(GET_ALL_CATEGORIES);
  const categoriesData = CategoryModel.instantiateArray(data);
  return {
    getAllCategoriesData: categoriesData,
    getAllCategoriesError: error,
    getAllCategoriesLoading: loading,
    getAllCategoriesRefetch: refetch
  };
};

export const CreateCategory = () => {
  const [createCategoryFunc, { data, error, loading }] = useMutation(CREATE_CATEGORY);
  // const { data, error, loading, refetch } = useQuery(CREATE_AUTHOR);
  const categoriesData = CategoryModel.instantiateArray(data);
  return {
    createCategoryData: categoriesData,
    createCategoryError: error,
    createCategoryLoading: loading,
    createCategoryFunc
  };
};
