import { combineReducers } from 'redux';
import {
  GET_INGREDIENTS,
  OPEN_INGREDIENT_MODAL,
  OPEN_ORDER_MODAL,
  CLOSE_MODAL,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  INCREASE_COUNTER,
  REDUCE_COUNTER,
  MOVE_INGREDIENT
} from '../actions/index'

const initialState = {
  ingredients: [],
  draggedIngredients: {
    bun: {},
    content: []
  },
  counterList: {},
  currentIngredient: {},
  modalTitle: '',
  isModalOpen: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients
      }
    case OPEN_INGREDIENT_MODAL:
      return {
        ...state,
        currentIngredient: action.payload.ingredient,
        modalTitle: 'Детали ингредиента',
        isModalOpen: true
      }
      case OPEN_ORDER_MODAL:
        return {
          ...state,
          currentIngredient: {},
          modalTitle: action.orderNumber,
          isModalOpen: true
        }
      case CLOSE_MODAL:
        return {
          ...state,
          currentIngredient: {},
          modalTitle: '',
          isModalOpen: false
        }
      case ADD_INGREDIENT:
        if (action.item.type === 'bun') {
          return {
            ...state,
            counterList: {
              ...state.counterList,
              [action.item._id]: 2,
              [state.draggedIngredients.bun._id]: 0
            },
            draggedIngredients: {
              ...state.draggedIngredients,
              bun: action.item
            }
          }
        }
        return {
          ...state,
          draggedIngredients: {
            ...state.draggedIngredients,
            content: [
              ...state.draggedIngredients.content,
              action.item
            ]
          }
        }
      case MOVE_INGREDIENT:
        let newData = [...state.draggedIngredients.content];
        newData.splice(action.dragIndex, 1);
        newData.splice(action.hoverIndex, 0, state.draggedIngredients.content[action.dragIndex]);
        return {
          ...state,
          draggedIngredients: {
            ...state.draggedIngredients,
            content: newData
          }
        }
      case DELETE_INGREDIENT:
        return {
          ...state,
          draggedIngredients: {
            ...state.draggedIngredients,
            content: [
              ...state.draggedIngredients.content.filter(item => item.unId !== action.unId)
            ]
          }
        }
        case INCREASE_COUNTER:
          return {
            ...state,
            counterList: {
              ...state.counterList,
              [action.item._id]: state.draggedIngredients.content.filter(item => item._id === action.item._id).length
            }
          }
        case REDUCE_COUNTER:
          return {
            ...state,
            counterList: {
              ...state.counterList,
              [action.item._id]: state.draggedIngredients.content.filter(item => item._id === action.item._id).length
            }
          }
    default:
      return state
  }
} 

export const rootReducer = combineReducers({
  reducer
})
