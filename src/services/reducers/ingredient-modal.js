import {
  OPEN_INGREDIENT_MODAL,
  CLOSE_INGREDIENT_MODAL,
} from '../actions/ingredient-modal';

const initialState = {
  currentIngredient: null
};

export const ingredientModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL:
      return {
        ...state,
        currentIngredient: action.payload.ingredient
      }
    case CLOSE_INGREDIENT_MODAL:
      return {
        ...state,
        currentIngredient: null
      }
    default:
      return state
  }
} 
