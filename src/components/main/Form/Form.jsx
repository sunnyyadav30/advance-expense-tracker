import React, {useState, useContext} from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import useStyles from './styles'
import {ExpenseTrackerContext} from '../../../context/context'
import { v4 as uuidv4 } from 'uuid'
import {incomeCategories, expenseCategories} from '../../../constants/categories'
import formatDate from '../../../utils/formatDate'

const initialState = {
    amount : '',
    category : '',
    type : 'Income',
    date : formatDate(new Date())
}

const Form = () => {
    const classes = useStyles()
    const {addTransaction} = useContext(ExpenseTrackerContext)
    const [transaction,setTransaction] = useState(initialState)

    const createTransaction = ()=>{
        const newTransaction = {...transaction, amount : Number(transaction.amount), id: uuidv4()}
        addTransaction(newTransaction)
        setTransaction(initialState)
    }
    const selectedCategories = transaction.type == "Income" ? incomeCategories : expenseCategories
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>...</Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={transaction.type} onChange={(e)=>setTransaction({...transaction,type: e.target.value})}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={transaction.category} onChange={(e)=>setTransaction({...transaction,category : e.target.value})}>
                        {
                            selectedCategories.map((c)=><MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={transaction.amount} onChange={(e)=>setTransaction({...transaction,amount : e.target.value})}/>
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth value={transaction.date} onChange={(e)=>setTransaction({...transaction,date : formatDate(e.target.value)})}/>
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form
