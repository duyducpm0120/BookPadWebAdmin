import type { AuthorModel } from '@core';

export interface AuthorTableProps {
  authorsData: AuthorModel[];
  refetchAuthorsData: () => Promise<void>;
}
