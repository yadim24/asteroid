'use client';

import { ReactElement, ReactNode, useReducer } from 'react';
import { GlobalStateContext } from '../GlobalStateContext';
import { globalReducer } from './globalReducer';

const initialState = {
  cart: [],
  isLunar: false,
};

export const CartState = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const globalStateWithSetter = useReducer(globalReducer, initialState);

  return (
    <GlobalStateContext.Provider value={globalStateWithSetter}>
      {children}
    </GlobalStateContext.Provider>
  );
};
