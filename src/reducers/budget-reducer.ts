import { category, DraftExpense, Expense } from './../types/index';
import {v4 as uuidv4} from 'uuid'


export type budgetActions =
    {type : 'add-budget', payload : {budget : number}} | 
    {type : 'show-modal'}  | 
    {type : 'close-modal'}  |
    {type : 'add-expense', payload : {expense : DraftExpense}}  |
    {type : 'remove-expense', payload : {id : Expense['id']}}  |
    {type : 'get-expense-by-id', payload : {id : Expense['id']}} |
    {type : 'update-expense', payload : {expense : Expense}} |
    {type : 'reset-expense'} |
    {type : 'app-filter-category', payload : {id : category['id']}} 

export type budgetState = {
    budget : number
    modal: boolean
    expense : Expense[]
    editingId : Expense['id']
    currentCategory: category['id']
}

const initialExpense = () : Expense[] => {
    const localstorageExpense = localStorage.getItem('expense')
    return localstorageExpense ? JSON.parse(localstorageExpense) : [] 
}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget? +localStorageBudget : 0
}

export const initialState : budgetState = {
    budget : initialBudget(),
    modal: false,
    expense : initialExpense(),
    editingId : '',
    currentCategory: ''
}

const createExpense = (draftExpense : DraftExpense) : Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = 
(   state : budgetState = initialState, 
    action : budgetActions
) => { 
    if(action.type === 'add-budget') {

        return {
            ...state,
            budget : action.payload.budget
        }
    }

    if(action.type === 'show-modal') {
        return {
            ...state,
            modal : true
        }
    }
    if(action.type === 'close-modal') {
        return {
            ...state,
            modal : false,
            editingId: ''
        }
    }
    if(action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expense : [...state.expense, expense],
            modal: false
        }
    }
    if(action.type === 'remove-expense') {
        return {
            ...state,
            expense : state.expense.filter(expense => expense.id !== action.payload.id)
        }
    }
    if(action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId : action.payload.id,
            modal: true
        }
    }
    if(action.type === 'update-expense') {
        return {
            ...state,
            expense : state.expense.map(expense => expense.id === action.payload.expense.id? action.payload.expense : expense),
            modal: false,
            editingId : ''
        }
    }
    if(action.type === 'reset-expense') {
        return {
            ...state,
            budget : 0,
            expense : [],
        }
    }
    if(action.type === 'app-filter-category') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state
}