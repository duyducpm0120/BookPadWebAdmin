export interface TableProps {
  tableHeader: string;
  tableData: any[];
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  tableHeader: string;
}
export type Order = 'asc' | 'desc';
export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  object: Object;
}
