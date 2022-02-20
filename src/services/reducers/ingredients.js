import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/ingredients';

const initialState = {
  ingredients: []
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return state
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients
      }
    case GET_INGREDIENTS_FAILED:
      return state
    default:
      return state
  }
} 
