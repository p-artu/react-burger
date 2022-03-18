import { BurgersApi } from '../../utils/BurgersApi';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredientsRequest = () => ({type: GET_INGREDIENTS_REQUEST});
export const getIngredientsSuccess = ingredients => ({type: GET_INGREDIENTS_SUCCESS, ingredients});
export const getIngredientsFailed = () => ({type: GET_INGREDIENTS_FAILED});

export function getIngredients() {
  return function(dispatch) {
    dispatch(getIngredientsRequest());
    BurgersApi.getIngredientsRequest()
    .then(res => {
      if (res && res.success) {
        dispatch(getIngredientsSuccess(res.data));
      } else {
        dispatch(getIngredientsFailed());
      }
    })
    .catch(err => {
      dispatch(getIngredientsFailed());
      console.error(err);
    });
  }
}
