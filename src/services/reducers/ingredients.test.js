import { ingredientsReducer, initialState } from './ingredients';
import * as types from '../constants/ingredients';

describe('ingredients reducer', () => {
  const item = {
    _id: "60666c42cc7b410027a1a9b1",
    name: "Краторная булка N-200i",
    type: "main",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    unId:  0,
    __v: 0
  };

  it('должно возвращать начальное состояние хранилища', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it('должно обработать GET_INGREDIENTS_REQUEST', () => {
    expect(
      ingredientsReducer(initialState, {
        type: types.GET_INGREDIENTS_REQUEST
      })
    ).toEqual({
      ingredients: [],
      ingredientsRequest: true,
      ingredientsFailed: false
    });
  });

  it('должно обработать GET_INGREDIENTS_SUCCESS', () => {
    expect(
      ingredientsReducer(initialState, {
        type: types.GET_INGREDIENTS_SUCCESS,
        ingredients: [item, item]
      })
    ).toEqual({
      ingredients: [item, item],
      ingredientsRequest: false,
      ingredientsFailed: false
    });
  });

  it('должно обработать GET_INGREDIENTS_FAILED', () => {
    expect(
      ingredientsReducer(initialState, {
        type: types.GET_INGREDIENTS_FAILED
      })
    ).toEqual({
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: true
    });
  });
});
