export interface Data {
  name: string;
  active: boolean;
  action: any;
}
export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface TableProps {
  tableHeader: string;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  tableHeader: string;
}
export type Order = 'asc' | 'desc';
export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
