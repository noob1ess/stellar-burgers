import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { fetchCreateOrder } from '../../services/slices/createOrder';
import { createOrderSlice } from '../../services/slices/createOrder';
import { burgerConstructorSlice } from '../../services/slices/burgerConstructor';
import {} from '../../services/slices/user';
import {
  selectConstructorItems,
  selectOrderModalData,
  selectOrderRequest,
  selectUserData
} from '@selectors';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuth = useSelector(selectUserData).name !== '';
  const constructorItems = useSelector(selectConstructorItems);

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectOrderModalData);

  const onOrderClick = () => {
    if (!userAuth) {
      return navigate('/login', { replace: true });
    }

    if (!constructorItems.bun || orderRequest) return;

    if (constructorItems.bun._id && constructorItems.ingredients.length) {
      const ingredientIds = constructorItems.ingredients.map(
        (item) => item._id
      );
      dispatch(
        fetchCreateOrder([
          constructorItems.bun._id,
          ...ingredientIds,
          constructorItems.bun._id
        ])
      );
    }
  };

  const closeOrderModal = () => {
    dispatch(createOrderSlice.actions.closeOrderModal());
    dispatch(burgerConstructorSlice.actions.clearIngredients());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price! * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
