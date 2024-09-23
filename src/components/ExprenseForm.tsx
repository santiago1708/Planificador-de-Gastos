import { categories } from "../data/category";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, FormEvent, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";



export default function ExprenseForm() {

const [expense, setExpense] = useState<DraftExpense>({
    amount : 0,
    expenseName : '',
    category : '',
    date : new Date()
}) 

const [error, setError] = useState('')
const {dispatch} = useBudget()

const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name , value} = e.target
    const isAmountField = ['amount'].includes(name)
    setExpense({
        ...expense, 
        [name] : isAmountField? +value : value
    })
    
}

const handleChangeDate = ((value : Value)=> {
    setExpense({
        ...expense,
        date: value
    })
})

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    if(Object.values(expense).includes('')) {
        setError('Todos los cambios son obligatorios')
        return
    }
    dispatch({type : 'add-expense', payload: {expense}})
}

    return (
        <form className="space-y-5" onSubmit={ handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">Nuevo gasto</legend>
            <div className="flex flex-col gap-2">

                {error && <ErrorMessage>{error}</ErrorMessage> }
                
                <label htmlFor="expenseName" className="text-xl">Nombre gasto:</label>
                <input 
                    type="text" 
                    id="expenseName" 
                    placeholder="Añade el nombre del gasto" 
                    className="bg-slte-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                    />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Cantidad:</label>
                <input 
                    type="number" 
                    id="amount" 
                    placeholder="Añade la cantidad del gasto: ej.300" 
                    className="bg-slte-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                    />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Categoria:</label>
                <select 
                    id="categry" 
                    className="bg-slte-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">--- Seleeccione ---</option>
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Fecha gasto:</label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input 
                type="submit" 
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={'Registrar gastos'}
            />
        </form>
    )
}
