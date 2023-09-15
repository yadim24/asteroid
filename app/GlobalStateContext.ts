import { createContext } from 'react';
import { ActionType, GlobalState } from './_providers/globalReducer';

export type StateContext = [GlobalState, React.Dispatch<ActionType>] | null;

export const GlobalStateContext = createContext<StateContext>(null);
