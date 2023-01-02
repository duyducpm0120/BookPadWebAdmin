import {
  RatingModel,
  getAllRating,
  hideRating,
  unhideRating,
  useAuthToken,
  useGlobalAlert,
  useGlobalLoading,
  useMount
} from '@core';
import { AlertType } from '@core/store';
import { useState } from 'react';

export const useViewModel = () => {
  const [ratingList, setRatingList] = useState<RatingModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState<RatingModel>(RatingModel.instantiate({}));
  const { authToken } = useAuthToken();
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const { showAlert } = useGlobalAlert();

  const fetchData = async () => {
    try {
      const userList = await getAllRating({
        token: authToken,
        limit: 100,
        last: 0
      });
      setRatingList(userList);
      setIsLoading(false);
    } catch (err) {
      console.log('fetch User data failed', err);
    }
  };

  const hideReview = async () => {
    try {
      showGlobalLoading();
      const hideReview = await hideRating({
        token: authToken,
        ratingId: selectedRating.BookReviewId
      });
      await fetchData();
      hideGlobalLoading();
      showAlert({
        message: 'Hide Review Success',
        type: AlertType.SUCCESS
      });
    } catch (err) {
      hideGlobalLoading();
      showAlert({
        message: 'Hide Review Fail',
        type: AlertType.ERROR
      });
    }
  };
  const unhideReview = async () => {
    try {
      showGlobalLoading();
      const hideReview = await unhideRating({
        token: authToken,
        ratingId: selectedRating.BookReviewId
      });
      await fetchData();
      hideGlobalLoading();
      showAlert({
        message: 'Unhide Review Success',
        type: AlertType.SUCCESS
      });
    } catch (err) {
      hideGlobalLoading();
      showAlert({
        message: 'Unhide Review Fail',
        type: AlertType.ERROR
      });
    }
  };

  useMount(() => {
    fetchData();
  });

  return {
    selectors: {
      ratingList,
      isLoading,
      selectedRating
    },
    handlers: {
      fetchData,
      setRatingList,
      setIsLoading,
      setSelectedRating,
      hideReview,
      unhideReview
    }
  };
};
