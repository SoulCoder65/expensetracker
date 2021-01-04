const ContextReducer=(state,action)=>{
    let records;
    switch (action.type) {
        case "ADD_RECORD":
            records=[action.payload,...state]
            localStorage.setItem('records',JSON.stringify(records))
            return records
        
        case "DELETE_RECORD":
            records=state.filter((record)=>record.id!=action.payload);
            localStorage.setItem('records',JSON.stringify(records
                ))
            return records
            
        default:
            return state    
            
    }
    
};
export default ContextReducer;