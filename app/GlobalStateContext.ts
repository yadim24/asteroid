import { createContext } from 'react';
import { ActionType, GlobalState } from './globalReducer';

export type StateContext = [GlobalState, React.Dispatch<ActionType>] | null;

export const GlobalStateContext = createContext<StateContext>(null);
