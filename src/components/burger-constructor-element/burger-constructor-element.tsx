import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { burgerConstructorSlice } from '../../services/slices/burgerConstructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(
        burgerConstructorSlice.actions.moveIngredient({
          index,
          upper: false
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        burgerConstructorSlice.actions.moveIngredient({
          index,
          upper: true
        })
      );
    };

    const handleClose = () => {
      dispatch(burgerConstructorSlice.actions.removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
