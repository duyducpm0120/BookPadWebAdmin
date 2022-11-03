import type { CategoryModel } from '@core';

export interface CategoryTableProps {
  categoriesData: CategoryModel[];
  refetchCategoriesData: () => Promise<void>;
}
