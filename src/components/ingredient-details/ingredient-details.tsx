import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '@selectors';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(selectIngredients);
  const selectIngredientsId = useParams<{ id: string }>();

  /** TODO: взять переменную из стора */
  const ingredientData = ingredients.find(
    (item) => item._id === selectIngredientsId.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
