import { constructorIngredientsReducer, initialState } from './constructor-ingredients';
import * as types from '../constants/constructor-ingredients';

describe('constructor-ingredients reducer', () => {
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
    expect(constructorIngredientsReducer(undefined, {})).toEqual(initialState);
  });

  it('должно обработать ADD_INGREDIENT', () => {
    expect(
      constructorIngredientsReducer(initialState, {
        type: types.ADD_INGREDIENT,
        item
      })
    ).toEqual({
        draggedIngredients: {
          bun: null,
          content: [
            item
          ]
        },
        counterList: {}
    });

    expect(
      constructorIngredientsReducer(initialState, {
        type: types.ADD_INGREDIENT,
        item: {...item, type: 'bun'}
      })
    ).toEqual({
        counterList: {
          [{...item, type: 'bun'}._id]: 2
        },
        draggedIngredients: {
          bun: {...item, type: 'bun'},
          content: []
        }
    });

    expect(
      constructorIngredientsReducer({
        counterList: {
          [item._id]: 2
        },
        draggedIngredients: {
          bun: item,
          content: []
        }
      }, {
        type: types.ADD_INGREDIENT,
        item: {...item, type: 'bun', _id: '123'}
      })
    ).toEqual({
        counterList: {
          [item._id]: 0,
          [{...item, type: 'bun', _id: '123'}._id]: 2
        },
        draggedIngredients: {
          bun: {...item, type: 'bun', _id: '123'},
          content: []
        }
    });

    expect(
      constructorIngredientsReducer({
          draggedIngredients: {
            bun: null,
            content: [
              item
            ]
          },
          counterList: {}
        }, {
          type: types.ADD_INGREDIENT,
          item: {...item, _id: '123'}
        }
      )
    ).toEqual({
      draggedIngredients: {
        bun: null,
        content: [
          item,
          {...item, _id: '123'}
        ]
      },
      counterList: {}
    });
  });

  it('должно обработать MOVE_INGREDIENT', () => {
    expect(
      constructorIngredientsReducer({
        draggedIngredients: {
          bun: null,
          content: [
            item,
            {...item, _id: '123'}
          ]
        },
        counterList: {}
      }, {
        type: types.MOVE_INGREDIENT,
        dragIndex: 0,
        hoverIndex: 1
      })
    ).toEqual({
        draggedIngredients: {
          bun: null,
          content: [
            {...item, _id: '123'},
            item
          ]
        },
        counterList: {}
    });
  });

  it('должно обработать DELETE_INGREDIENT', () => {
    expect(
      constructorIngredientsReducer({
        draggedIngredients: {
          bun: null,
          content: [
            item,
            {...item, unId: 1},
            {...item, unId: 2}
          ]
        },
        counterList: {}
      }, {
        type: types.DELETE_INGREDIENT,
        unId: 1
      })
    ).toEqual({
        draggedIngredients: {
          bun: null,
          content: [
            item,
            {...item, unId: 2}
          ]
        },
        counterList: {}
    });
  });

  it('должно обработать INCREASE_COUNTER', () => {
    expect(
      constructorIngredientsReducer({
        draggedIngredients: {
          bun: null,
          content: [
            item,
            {...item, _id: '1'},
            {...item, _id: '2'},
            item,
            item
          ]
        },
        counterList: {}
      }, {
        type: types.INCREASE_COUNTER,
        item
      })
    ).toEqual({
        draggedIngredients: {
          bun: null,
          content: [
            item,
            {...item, _id: '1'},
            {...item, _id: '2'},
            item,
            item
          ]
        },
        counterList: {
          [item._id]: 3
        }
    });
  });

  it('должно обработать REDUCE_COUNTER', () => {
    expect(
      constructorIngredientsReducer({
        draggedIngredients: {
          bun: null,
          content: [
            item,
            {...item, _id: '1'},
            {...item, _id: '2'},
            item,
            item
          ]
        },
        counterList: {}
      }, {
        type: types.REDUCE_COUNTER,
        item
      })
    ).toEqual({
        draggedIngredients: {
          bun: null,
          content: [
            item,
            {...item, _id: '1'},
            {...item, _id: '2'},
            item,
            item
          ]
        },
        counterList: {
          [item._id]: 3
        }
    });
  });

  it('должно обработать CLEAR_INGREDIENTS', () => {
    expect(
      constructorIngredientsReducer({
        draggedIngredients: {
          bun: {...item, type: 'bun'},
          content: [
            item,
            {...item, _id: '1'},
            {...item, _id: '2'},
            item,
            item
          ]
        },
        counterList: {
          [item._id]: 3
        }
      }, {
        type: types.CLEAR_INGREDIENTS
      })
    ).toEqual({
        draggedIngredients: {
          bun: null,
          content: []
        },
        counterList: {}
    });
  });
});
