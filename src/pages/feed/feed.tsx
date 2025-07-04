import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredients';
import { fetchFeed } from '../../services/slices/feed';
import { selectFeedOrders, selectFeedStatus } from '@selectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const status = useSelector(selectFeedStatus);
  /** TODO: взять переменную из стора */

  useEffect(() => {
    if (status === 'idle') {
      Promise.all([dispatch(fetchFeed()), dispatch(fetchIngredients())]);
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed());
      }}
    />
  );
};
