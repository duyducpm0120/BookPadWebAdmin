import { BlankSpacer, BPTable, BPTextField } from '@app/components';
import { DeleteIcon, EditIcon, SaveIcon, SPACE, strings } from '@core';
import Add from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useStyles } from './CategoryTable.styles';
import type { CategoryTableProps } from './CategoryTable.types';
import { useViewModel } from './CategoryTable.viewModel';
export const CategoryTable: React.FC<CategoryTableProps> = (props: CategoryTableProps) => {
  const { categoriesData } = props;
  const { selectors, handlers } = useViewModel(props);
  const { CURRENT_PAGE, CURRENT_PAGE_INDEX, categoryData } = selectors;
  const { createCategory, setCategoryData } = handlers;
  const [isEdit, setIsEdit] = useState(false);
  const styles = useStyles();
  const AddNewAuthorUI = () => {
    return (
      <Box className={styles.updatePublisherWrapper}>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.category_name}
          autoFocus
          fullWidth
          value={categoryData.CategoryName}
          onChange={(e) => {
            setCategoryData({ ...categoryData, CategoryName: e.target.value });
          }}
          type="text"
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.category_description}
          fullWidth
          value={categoryData.CategoryDescription}
          onChange={(e) => {
            setCategoryData({ ...categoryData, CategoryDescription: e.target.value });
          }}
          multiline
          numberOfLines={10}
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
      </Box>
    );
  };
  const ViewAndEditAuthorUI = () => {
    return (
      <Box className={styles.updatePublisherWrapper}>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.category_id}
          autoFocus
          fullWidth
          value={categoryData.CategoryId}
          onChange={(e) => {}}
          type="text"
          disabled
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.category_name}
          autoFocus
          fullWidth
          value={categoryData.CategoryName}
          onChange={(e) => {
            setCategoryData({ ...categoryData, CategoryName: e.target.value });
          }}
          type="text"
          disabled={!isEdit}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.category_description}
          fullWidth
          value={categoryData.CategoryDescription}
          onChange={(e) => {
            setCategoryData({ ...categoryData, CategoryDescription: e.target.value });
          }}
          multiline
          numberOfLines={10}
          disabled={!isEdit}
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
      </Box>
    );
  };
  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <BPTable
        tableHeader={CURRENT_PAGE.pages[CURRENT_PAGE_INDEX]}
        tableData={categoriesData}
        rightDrawerAddNewUIParams={{
          content: AddNewAuthorUI(),
          title: strings.add_new_category,
          primaryButtonParams: {
            label: strings.add,
            onClick: async () => {
              await createCategory();
            },
            isShow: true,
            type: 'contained',
            leftIcon: <Add />
            // disabled: !isAddNewPublisherValid
          },
          onClose: () => {
            setIsEdit(false);
          }
        }}
        rightDrawerViewAndEditUIParams={{
          content: <ViewAndEditAuthorUI />,
          title: isEdit ? strings.edit_category : strings.view_category,
          secondaryButtonParams: {
            label: strings.delete,
            onClick: async () => {
              //   if (!isEdit) return;
              //   await updatePublisherData();
              //   setIsEdit(false);
            },
            isShow: true,
            type: 'outlined',
            leftIcon: <DeleteIcon />
          },
          primaryButtonParams: {
            label: isEdit ? strings.save : strings.edit,
            onClick: () => {
              if (!isEdit) setIsEdit(true);
              else {
                //
              }
            },
            isShow: true,
            type: 'contained',
            leftIcon: isEdit ? <SaveIcon /> : <EditIcon />
          }
        }}
        hideColumns={['AuthorDescription']}
        showViewAndEditUICallBack={({ row }) => {
          //   setSelectedPublisherIndex(row);
          setCategoryData(categoriesData[row]);
        }}
      />
    </div>
  );
};
