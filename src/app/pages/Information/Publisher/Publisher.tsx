import React from 'react';
import type { PublisherPageProps } from './Publisher.types';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';

export const Publisher: React.FC<PublisherPageProps> = (props: PublisherPageProps) => {
  const { publisherData } = props;
  console.log('publisherData', publisherData);

  const mapData = () => {
    const tableData: any[] = [];
    publisherData.forEach((item) => {
      tableData.push({
        name: item.PublisherName,
        active: true,
        id: item.PublisherId
      });
    });
    console.log('tableData', tableData);
    return tableData;
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 300, editable: true },
    { field: 'active', headerName: 'Active', width: 100, editable: true },
    { field: 'action', headerName: 'Action', width: 300, sortable: false }
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={mapData()}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onSelectionModelChange={(newSelection) => {
          console.log('newSelection', newSelection);
        }}
        checkboxSelection
        editMode="row"
      />
    </div>
  );
};
