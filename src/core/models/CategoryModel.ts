import { safeGetArray, safeGetString } from '@core';
import { size } from 'lodash';
export class CategoryModel {
  CategoryId: string;
  CategoryName: string;

  CategoryDescription: string;

  constructor(CategoryId: string, CategoryName: string, CategoryDescription: string) {
    this.CategoryId = CategoryId;
    this.CategoryName = CategoryName;

    this.CategoryDescription = CategoryDescription;
  }

  public static instantiate = (json: any) => {
    const CategoryId = safeGetString(json, 'CategoryId', '');
    const CategoryName = safeGetString(json, 'CategoryName', '');

    const CategoryDescription = safeGetString(json, 'CategoryDescription', '');
    return new CategoryModel(CategoryId, CategoryName, CategoryDescription);
  };

  public static instantiateArray = (json: any) => {
    const data = safeGetArray(json, 'getAllBookCategories', []);
    if (size(data) === 0) return [];
    return data.map((category: any) => CategoryModel.instantiate(category));
  };
}
