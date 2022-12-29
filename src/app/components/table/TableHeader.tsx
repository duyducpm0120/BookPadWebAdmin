import { TableHead, TableRow, TableCell, Checkbox } from '@mui/material';
import type { EnhancedTableProps } from './Table.types';
export const EnhancedTableHeader = (props: EnhancedTableProps) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    object,
    hideCheckbox = false
  } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };
  const objectToHeaderCells = (obj: any) => {
    const keys = Object.keys(obj);
    const headerCells = keys.map((key) => {
      return {
        id: key.toLowerCase(),
        numeric: false,
        disablePadding: false,
        label: key
      };
    });
    headerCells.push({
      id: 'action',
      numeric: false,
      disablePadding: false,
      label: 'Action'
    });
    return headerCells;
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {!hideCheckbox ? (
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts'
              }}
            />
          ) : null}
        </TableCell>
        {objectToHeaderCells(object).map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
            scope="row">
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel> */}
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
