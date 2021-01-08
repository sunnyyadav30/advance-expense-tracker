const contextReducer = (state, action) => {
    console.log(state)
    console.log(action)
    switch(action.type){
        case "ADD_TRANSACTION":
            return [action.payload,...state]
        case "DELETE_TRANSACTION":
            const transactions = state.filter(transaction=>transaction.id != action.payload)
            return transactions
        default:
            return state
    }
}

export default contextReducer