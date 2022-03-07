import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorIngredientsReducer } from './constructor-ingredients';
import { orderReducer } from './order';
import { ingredientModalReducer } from './ingredient-modal';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  order: orderReducer,
  ingredientModal: ingredientModalReducer,
  user: userReducer
})
