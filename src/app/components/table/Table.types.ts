export interface TableProps {
  tableHeader: string;
  tableData: any[];
  rightDrawerAddNewUIParams: {
    content: JSX.Element;
    title: string;
  };
  rightDrawerViewAndEditUIParams: { content: JSX.Element; title: string };
  hideColumns?: string[];
  showViewAndEditUICallBack?: ({ row }: { row: number }) => void;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  tableHeader: string;
  isOpenDrawer: boolean;
  setIsOpenDrawer: (isOpenDrawer: boolean) => void;
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
