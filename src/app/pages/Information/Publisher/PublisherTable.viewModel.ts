import { useGlobalState, UpdatePublisher } from '@core';
import React, { useRef } from 'react';
import type { PublisherTableProps } from './PublisherTable.types';
export const useViewModel = (props: PublisherTableProps) => {
  const { publisherData } = props;
  const { CURRENT_PAGE_INDEX, CURRENT_PAGE } = useGlobalState();
  const [publisherName, setPublisherName] = React.useState('');
  const [publisherDescription, setPublisherDescription] = React.useState('');
  const [selectedPublisherIndex, setSelectedPublisherIndex] = React.useState(-1);
  const selectedPublisherNameRef = useRef(null);
  const selectedPublisherDescriptionRef = useRef(null);
  const {
    data: updatePublisherCallbackData,
    loading: updatePublisherCallbackLoading,
    error: updatePublisherCallbackError,
    updatePublisherFunc
  } = UpdatePublisher();
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
    updatePublisherFunc
  };
};
