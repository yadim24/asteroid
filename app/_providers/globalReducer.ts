import { AsteroidDataType } from '../_rest-api/getAsteroidList';

export type GlobalState = {
  cart: AsteroidDataType[];
  isLunar: boolean;
};

export type ActionType =
  | {
      type: 'toKm' | 'toLunar' | 'resetCart';
    }
  | { type: 'addedToCart'; asteroid: AsteroidDataType };

export function globalReducer(
  globalState: GlobalState,
  action: ActionType,
): GlobalState {
  switch (action.type) {
    case 'toKm': {
      return {
        ...globalState,
        isLunar: false,
      };
    }

    case 'toLunar': {
      return {
        ...globalState,
        isLunar: true,
      };
    }

    case 'addedToCart': {
      return {
        ...globalState,
        cart: [...globalState.cart, action.asteroid],
      };
    }

    case 'resetCart': {
      return {
        ...globalState,
        cart: [],
      };
    }

    default: {
      const exhaustiveValue: never = action;

      return exhaustiveValue;
    }
  }
}
