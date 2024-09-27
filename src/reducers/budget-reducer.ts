import { DraftExpense, Expense } from './../types/index';
import {v4 as uuidv4} from 'uuid'


export type budgetActions =
    {type : 'add-budget', payload : {budget : number}} | 
    {type : 'show-modal'}  | 
    {type : 'close-modal'}  |
    {type : 'add-expense', payload : {expense : DraftExpense}}  |
    {type : 'remove-expense', payload : {id : Expense['id']}}  |
    {type : 'get-expense-by-id', payload : {id : Expense['id']}} |
    {type : 'update-expense', payload : {expense : Expense}} 

export type budgetState = {
    budget : number
    modal: boolean
    expense : Expense[]
    editingId : Expense['id']
}

export const initialState : budgetState = {
    budget : 0,
    modal: false,
    expense : [],
    editingId : ''
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
            modal : false
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

    return state
}