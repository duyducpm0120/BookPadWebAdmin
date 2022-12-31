/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { EnhancedTableToolbar } from './TableToolBar';
import { EnhancedTableHeader } from './TableHeader';
import type { BPTableProps, TableRefHandle } from './Table.types';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { IconButton, Tooltip } from '@mui/material';
import _ from 'lodash';
import { BPDrawer } from '../drawer';
import { BlankSpacer } from '../BlankSpacer';
import { SPACE } from '@core';
import type { MutableRefObject } from 'react';
import { useImperativeHandle } from 'react';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: string | any }, b: { [key in Key]: string | any }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  // console.log('stabilizedThis', stabilizedThis.length);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const BPTable = React.forwardRef(
  (
    props: BPTableProps,
    ref:
      | ((instance: TableRefHandle | null) => void)
      | MutableRefObject<TableRefHandle | null>
      | null
  ) => {
    const {
      tableHeader,
      tableData,
      rightDrawerAddNewUIParams,
      rightDrawerViewAndEditUIParams,
      hideColumns = [],
      showViewAndEditUICallBack = () => {},
      hideHeader = false,
      hideCheckbox = false
    } = props;
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('name');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isOpenAddNewDrawer, setIsOpenAddNewDrawer] = React.useState(false);
    const [isOpenViewAndEditDrawer, setIsOpenViewAndEditDrawer] = React.useState(false);
    const tableDataKeys = Object.keys(tableData[0]).filter((key) => !hideColumns.includes(key));
    const getHeaderObject = () => {
      return _.omit(tableData[0], hideColumns);
    };

    const { onClose: onRightDrawerAddNewUIParamsOnClose = () => {} } = rightDrawerAddNewUIParams;
    const { onClose: onRightDrawerViewAndEditUIParamsOnClose = () => {} } =
      rightDrawerViewAndEditUIParams;

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = tableData.map((n) => n[tableDataKeys[0]]);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
    useImperativeHandle(ref, () => ({
      closeAddNewDrawer: () => {
        setIsOpenAddNewDrawer(false);
      },
      closeViewAndEditDrawer: () => {
        setIsOpenViewAndEditDrawer(false);
      }
    }));

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: readonly string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected.includes(name);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          {!hideHeader ? (
            <EnhancedTableToolbar
              numSelected={selected.length}
              tableHeader={tableHeader}
              setIsOpenDrawer={setIsOpenAddNewDrawer}
              isOpenDrawer={isOpenAddNewDrawer}
            />
          ) : (
            <BlankSpacer height={SPACE.spacing12} />
          )}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              style={{
                marginLeft: hideCheckbox ? -20 : 0
              }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}>
              <EnhancedTableHeader
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={tableData.length}
                object={getHeaderObject()}
                hideCheckbox={hideCheckbox}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(tableData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, tableIndex) => {
                    const isItemSelected = isSelected(row[tableDataKeys[0]]);
                    const labelId = `enhanced-table-checkbox-${tableIndex}`;

                    return (
                      <TableRow
                        hover
                        //
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row[tableDataKeys[0]]}
                        selected={isItemSelected}>
                        <TableCell padding="checkbox">
                          {!hideCheckbox ? (
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId
                              }}
                              onClick={(event) => handleClick(event, row[tableDataKeys[0]])}
                            />
                          ) : null}
                        </TableCell>
                        {tableDataKeys.map((key, index) => {
                          return (
                            <TableCell
                              id={labelId}
                              scope="row"
                              padding="none"
                              key={-index}
                              align="center">
                              {row[key]}
                            </TableCell>
                          );
                        })}
                        <TableCell align="center">
                          <Tooltip title="View">
                            <IconButton
                              onClick={() => {
                                showViewAndEditUICallBack({ row: tableIndex });
                                setIsOpenViewAndEditDrawer(true);
                              }}>
                              <RemoveRedEyeRoundedIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows
                    }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
        <BPDrawer
          open={isOpenAddNewDrawer}
          onClose={() => {
            setIsOpenAddNewDrawer(false);
            onRightDrawerAddNewUIParamsOnClose();
          }}
          title={rightDrawerAddNewUIParams.title}
          primaryButtonParams={rightDrawerAddNewUIParams.primaryButtonParams}
          secondaryButtonParams={rightDrawerAddNewUIParams.secondaryButtonParams}>
          {rightDrawerAddNewUIParams.content}
        </BPDrawer>
        <BPDrawer
          title={rightDrawerViewAndEditUIParams.title}
          open={isOpenViewAndEditDrawer}
          onClose={() => {
            setIsOpenViewAndEditDrawer(false);
            onRightDrawerViewAndEditUIParamsOnClose();
          }}
          primaryButtonParams={rightDrawerViewAndEditUIParams.primaryButtonParams}
          secondaryButtonParams={rightDrawerViewAndEditUIParams.secondaryButtonParams}>
          {rightDrawerViewAndEditUIParams.content}
        </BPDrawer>
      </Box>
    );
  }
);
