export interface IApi {
  options: {
    baseUrl: string,
    headers: { [header: string]: string }
  };
  _baseUrl: string;
  _headers: { [header: string]: string };
}
//////////////////////////
type TLocationState = {
  from: ILocation
};
export interface ILocation {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  state: {from: TLocationState;};
  from: ILocation;
}
//////////////////////////
export type TData = {
  content: TIngredient[];
  bun: TIngredient;
};
export type TDataStore = {
  constructorIngredients: {
    draggedIngredients: TData;
  };
};
//////////////////////////
export type TUser = {
  name: string;
  email: string;
};
export type TUserStore = {
  user: {
    user: TUser;
  };
};
//////////////////////////
export type TOrder = {
  orderRequest: boolean;
  orderFailed: boolean;
  orderDetails: null | string;
};
export type TOrderStore = {
  order: TOrder;
};
//////////////////////////
export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  unId: number;
  __v: number;
};
export type TIngredients = {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};
export type TIngredientsStore = {
  ingredients: {
    ingredients: TIngredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
  };
};
export interface IIngredientsElement {
  data: TIngredient;
}
//////////////////////////
export interface ICellEmpty {
  height: string;
}
//////////////////////////
export type TCounterListDataStore = {
  constructorIngredients: {
    counterList: TCounterListData;
  };
};
export type TCounterListData = {
  [name: string]: number;
};
//////////////////////////
export interface IModal {
  closePopup: () => void;
}
//////////////////////////
export interface IToppingElement {
  id: number;
  index: number;
  item: TIngredient;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}
//////////////////////////
export type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';
export type TIconProps = {
    type: TIconTypes;
    onClick?: () => void;
};
export type TICons = {
  ShowIcon: React.FC<TIconProps>;
  HideIcon: React.FC<TIconProps>;
};
