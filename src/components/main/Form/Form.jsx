import React, {useState, useContext, useEffect} from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import useStyles from './styles'
import {ExpenseTrackerContext} from '../../../context/context'
import { v4 as uuidv4 } from 'uuid'
import {incomeCategories, expenseCategories} from '../../../constants/categories'
import CustomizedSnackBar from '../../SnackBar/SnackBar'
import formatDate from '../../../utils/formatDate'
import { useSpeechContext } from '@speechly/react-client'

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
    const { segment } = useSpeechContext()
    const [open, setOpen] = useState(false)

    const createTransaction = ()=>{
        if(Number.isNaN(Number(transaction.amount)) || !transaction.date.includes('-')) return;
        const newTransaction = {...transaction, amount : Number(transaction.amount), id: uuidv4()}
        setOpen(true)
        addTransaction(newTransaction)
        setTransaction(initialState)
    }

    useEffect(()=>{
        console.log(segment)
        if(segment){
            console.log(segment.intent.intent)
            if(segment.intent.intent === "add_expense"){
                setTransaction({...transaction,type: "Expense"})
            }
            else if(segment.intent.intent === "add_income"){
                setTransaction({...transaction,type: "Income"})
            }
            else if(segment.isFinal && segment.intent.intent === "create_transaction"){
                return createTransaction()
            }
            else if(segment.isFinal && segment.intent.intent === "cancel_transaction"){
                return setTransaction(initialState)
            }

            segment.entities.forEach(e=>{
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                console.log(category)
                switch (e.type) {
                    case "amount":
                        setTransaction({...transaction,amount:e.value})
                        break;
                    case "category":
                        if(incomeCategories.map(iC=>iC.type).includes(category)){
                            setTransaction({...transaction,type: "Income", category: category})
                        }
                        else if(expenseCategories.map(iC=>iC.type).includes(category)){
                            setTransaction({...transaction,type: "Expense", category: category})
                        }
                        break;
                    case "date":
                        setTransaction({...transaction,date:e.value})
                        break;
                    default:
                        break;
                }
            })

            if(segment.isFinal && transaction.amount && transaction.category && transaction.date && transaction.type){
                createTransaction()
            }
        }
    },[segment])

    const selectedCategories = transaction.type == "Income" ? incomeCategories : expenseCategories
    return (
        <Grid container spacing={2}>
            <CustomizedSnackBar open={open} setOpen={setOpen}/>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment && segment.words.map(w=>w.value).join(" ")}
                </Typography>
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
