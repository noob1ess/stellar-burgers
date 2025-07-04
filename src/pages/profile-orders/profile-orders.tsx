import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrdersUser } from '../../services/slices/ordersUser';
import { fetchIngredients } from '../../services/slices/ingredients';
import { selectUserOrders, selectUserOrdersStatus } from '@selectors';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const status = useSelector(selectUserOrdersStatus);

  useEffect(() => {
    Promise.all([dispatch(fetchOrdersUser()), dispatch(fetchIngredients())]);
  }, []);

  const orders: TOrder[] = useSelector(selectUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
