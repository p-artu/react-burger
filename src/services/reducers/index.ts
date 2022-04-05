import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorIngredientsReducer } from './constructor-ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';
import { passwordChangeReducer } from './password-change';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  order: orderReducer,
  user: userReducer,
  passwordChange: passwordChangeReducer
})
