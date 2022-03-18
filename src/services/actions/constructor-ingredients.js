export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const REDUCE_COUNTER = 'REDUCE_COUNTER';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';

export const addIngredient = item => ({type: ADD_INGREDIENT, item});
export const deleteIngredient = unId => ({type: DELETE_INGREDIENT, unId});
export const increaseCounter = item => ({type: INCREASE_COUNTER, item});
export const reduceCounter = item => ({type: REDUCE_COUNTER, item});
export const moveIngredient = (dragIndex, hoverIndex) => ({type: MOVE_INGREDIENT, dragIndex, hoverIndex});
export const clearIngredients = () => ({type: CLEAR_INGREDIENTS});
