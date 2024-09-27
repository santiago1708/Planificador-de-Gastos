import { useReducer, createContext, Dispatch, useMemo } from "react"
import { budgetActions, budgetReducer, budgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: budgetState
    dispatch: Dispatch<budgetActions>
    totalExpenses: number
    remainingBudget: number 
}

type BudgetProviderProps = {
    children: React.ReactNode
}


export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider  = ({children} : BudgetProviderProps) => {
    const[state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExpenses = useMemo(() => state.expense.reduce((total, expense) => expense.amount + total, 0), [state.expense])
    const remainingBudget = state.budget - totalExpenses


    return (
        <BudgetContext.Provider
            value={{state, dispatch, totalExpenses, remainingBudget}}
        >
            {children}
        </BudgetContext.Provider>
    )
}