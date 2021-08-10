import { createContext, useContext, useReducer } from "react";
// import reducer, {initialState} from './reducer'

export const Context = createContext()

export const GlobalState = ({ initialState, reducer, children }) => {
    return (
        <Context.Provider value={useReducer(reducer, initialState)}>
            {children}
        </Context.Provider>
    )
}

export const useGlobalState = () => useContext(Context)
