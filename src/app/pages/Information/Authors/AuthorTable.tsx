import { BlankSpacer, BPTable, BPTextField } from '@app/components';
import { EditIcon, SaveIcon, SPACE, strings } from '@core';
import Add from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useStyles } from './AuthorTable.styles';
import type { AuthorTableProps } from './AuthorTable.types';
import { useViewModel } from './AuthorTable.viewModel';
export const AuthorTable: React.FC<AuthorTableProps> = (props: AuthorTableProps) => {
  const { authorsData } = props;
  const { selectors, handlers } = useViewModel(props);
  const { CURRENT_PAGE, CURRENT_PAGE_INDEX, authorData } = selectors;
  const { setAuthorData, createAuthor, resetAuthorData } = handlers;
  const [isEdit, setIsEdit] = useState(false);
  const styles = useStyles();
  const AddNewAuthorUI = () => {
    return (
      <Box className={styles.updatePublisherWrapper}>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.author_name}
          autoFocus
          fullWidth
          value={authorData.AuthorName}
          onChange={(e) => {
            setAuthorData({ ...authorData, AuthorName: e.target.value });
          }}
          type="text"
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.author_date_of_birth}
          fullWidth
          value={authorData.AuthorDOB}
          type="datetime-local"
          onChange={(e) => {
            setAuthorData({ ...authorData, AuthorDOB: e.target.value });
          }}
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.author_date_of_death}
          fullWidth
          value={authorData.AuthorDOD}
          onChange={(e) => {
            setAuthorData({ ...authorData, AuthorDOD: e.target.value });
          }}
          type="datetime-local"
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.author_description}
          fullWidth
          value={authorData.AuthorDescription}
          onChange={(e) => {
            setAuthorData({ ...authorData, AuthorDescription: e.target.value });
          }}
          multiline
          numberOfLines={10}
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
        {/* <Box className={styles.buttonWrapper}>
          <BPButton
            type="outlined"
            isShowLeftIcon={true}
            leftIcon={<AddIcon />}
            label={'ADD'}
            onClick={async () => {
              await createPublisher();
            }}></BPButton>
        </Box> */}
      </Box>
    );
  };
  const ViewAndEditAuthorUI = () => {
    return (
      <Box className={styles.updatePublisherWrapper}>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.author_name}
          autoFocus
          fullWidth
          value={authorData.AuthorName}
          onChange={(e) => {
            setAuthorData({ ...authorData, AuthorName: e.target.value });
          }}
          type="text"
          disabled={!isEdit}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.author_date_of_birth}
          fullWidth
          value={authorData.AuthorDOB}
          type="datetime-local"
          onChange={(e) => {
            setAuthorData({ ...authorData, AuthorDOB: e.target.value });
          }}
          disabled={!isEdit}
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.author_date_of_death}
          fullWidth
          value={authorData.AuthorDOD}
          onChange={(e) => {
            setAuthorData({ ...authorData, AuthorDOD: e.target.value });
          }}
          type="datetime-local"
          disabled={!isEdit}
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.author_description}
          fullWidth
          value={authorData.AuthorDescription}
          onChange={(e) => {
            setAuthorData({ ...authorData, AuthorDescription: e.target.value });
          }}
          multiline
          numberOfLines={10}
          disabled={!isEdit}
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
        {/* <Box className={styles.buttonWrapper}>
          <BPButton
            type="outlined"
            isShowLeftIcon={true}
            leftIcon={<AddIcon />}
            label={'ADD'}
            onClick={async () => {
              await createPublisher();
            }}></BPButton>
        </Box> */}
      </Box>
    );
  };
  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <BPTable
        tableHeader={CURRENT_PAGE.pages[CURRENT_PAGE_INDEX]}
        tableData={authorsData}
        rightDrawerAddNewUIParams={{
          content: AddNewAuthorUI(),
          title: strings.add_new_author,
          primaryButtonParams: {
            label: strings.add,
            onClick: async () => {
              await createAuthor();
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
          title: isEdit ? strings.edit_author : strings.view_author,
          secondaryButtonParams: {
            label: strings.save,
            onClick: async () => {
              //   if (!isEdit) return;
              //   await updatePublisherData();
              //   setIsEdit(false);
            },
            isShow: true,
            type: 'outlined',
            leftIcon: <SaveIcon />,
            disabled: !isEdit
          },
          primaryButtonParams: {
            label: strings.edit,
            onClick: () => {
              setIsEdit(true);
            },
            isShow: true,
            type: 'contained',
            leftIcon: <EditIcon />
          },
          onClose: () => {
            setIsEdit(false);
          }
        }}
        hideColumns={['AuthorDescription']}
        showViewAndEditUICallBack={({ row }) => {
          //   setSelectedPublisherIndex(row);
          setAuthorData(authorsData[row]);
        }}
      />
    </div>
  );
};
