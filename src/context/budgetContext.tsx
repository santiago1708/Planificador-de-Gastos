import { useReducer, createContext, Dispatch } from "react"
import { budgetActions, budgetReducer, budgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: budgetState
    dispatch: Dispatch<budgetActions>
}

type BudgetProviderProps = {
    children: React.ReactNode
}


export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider  = ({children} : BudgetProviderProps) => {

    const[state, dispatch] = useReducer(budgetReducer, initialState)

    return (
        <BudgetContext.Provider
            value={{state, dispatch}}
        >
            {children}
        </BudgetContext.Provider>
    )
}