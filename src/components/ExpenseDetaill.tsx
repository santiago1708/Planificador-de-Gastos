import { useMemo } from "react"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,

} from "react-swipeable-list"
import 'react-swipeable-list/dist/styles.css';
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/category"
import { useBudget } from "../hooks/useBudget";

type ExpenseDetaillProps = {
    expense: Expense
}



export default function ExpenseDetaill({expense} : ExpenseDetaillProps) {

    const {dispatch} = useBudget()

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0],[expense])
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction 
                onClick={() => dispatch({type : 'get-expense-by-id', payload : {id : expense.id}})}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => dispatch({type : 'remove-expense', payload : {id : expense.id}})}
                destructive = {true}
                
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem 
                maxSwipe={30} /* pixeles que quiero que se recorran */
                leadingActions ={leadingActions()} /* De la izquierda a la derecha */
                trailingActions ={trailingActions()} /* De derecha a izquierda */
            >
                <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        <img 
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt="icono gasto"
                            className="w-20"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>
                    
                    <AmountDisplay
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
