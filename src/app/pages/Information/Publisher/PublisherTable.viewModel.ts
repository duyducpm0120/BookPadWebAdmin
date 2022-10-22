import { CreatePublisher } from './../../../../core/services/PublisherServices';
import { useGlobalState, UpdatePublisher, safeGetString, strings, useGlobalLoading } from '@core';
import { useGlobalAlert } from '@core/hooks/useGlobalAlert';
import { AlertType } from '@core/store';
import React, { useRef } from 'react';
import type { PublisherTableProps } from './PublisherTable.types';
export const useViewModel = (props: PublisherTableProps) => {
  const { publisherData, reloadPublisherData } = props;
  const { CURRENT_PAGE_INDEX, CURRENT_PAGE } = useGlobalState();
  const [publisherName, setPublisherName] = React.useState('');
  const [publisherDescription, setPublisherDescription] = React.useState('');
  const [selectedPublisherIndex, setSelectedPublisherIndex] = React.useState(-1);
  const selectedPublisherNameRef = useRef(null);
  const selectedPublisherDescriptionRef = useRef(null);
  const newPublisherNameRef = useRef(null);
  const newPublisherDescriptionRef = useRef(null);
  const {
    data: updatePublisherCallbackData,
    loading: updatePublisherCallbackLoading,
    error: updatePublisherCallbackError,
    updatePublisherFunc
  } = UpdatePublisher();
  const {
    data: createPublisherCallbackData,
    loading: createPublisherCallbackLoading,
    error: createPublisherCallbackError,
    createPublisherFunc
  } = CreatePublisher();
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const { showAlert } = useGlobalAlert();
  const updatePublisherData = async () => {
    showGlobalLoading();
    try {
      await updatePublisherFunc({
        variables: {
          PublisherName: safeGetString(selectedPublisherNameRef.current, 'value', ''),
          PublisherDescription: safeGetString(selectedPublisherDescriptionRef.current, 'value', ''),
          PublisherId: Number(publisherData[selectedPublisherIndex].PublisherId)
        }
      });
      showAlert({
        message: strings.success_update_publisher,
        type: AlertType.SUCCESS
      });
      await reloadPublisherData();
    } catch (err) {
      const error: any = err;
      showAlert({
        message: error.message,
        type: AlertType.ERROR
      });
    }
    hideGlobalLoading();
  };
  const createPublisher = async () => {
    showGlobalLoading();
    try {
      await createPublisherFunc({
        variables: {
          PublisherName: safeGetString(newPublisherNameRef.current, 'value', ''),
          PublisherDescription: safeGetString(newPublisherDescriptionRef.current, 'value', '')
        }
      });
      showAlert({
        message: strings.success_update_publisher,
        type: AlertType.SUCCESS
      });
      await reloadPublisherData();
    } catch (err) {
      const error: any = err;
      showAlert({
        message: error.message,
        type: AlertType.ERROR
      });
    }
    hideGlobalLoading();
  };
  return {
    publisherData,
    CURRENT_PAGE,
    CURRENT_PAGE_INDEX,
    publisherName,
    setPublisherName,
    publisherDescription,
    setPublisherDescription,
    selectedPublisherIndex,
    setSelectedPublisherIndex,
    selectedPublisherNameRef,
    selectedPublisherDescriptionRef,
    updatePublisherCallbackData,
    updatePublisherCallbackLoading,
    updatePublisherCallbackError,
    updatePublisherData,
    createPublisher,
    newPublisherNameRef,
    newPublisherDescriptionRef,
    reloadPublisherData
  };
};
