import { createSlice } from '@reduxjs/toolkit';

const dateAdded = () => {
    let count = 0;
    let date;
    
    return (function setDate() {
        if (count === 0){
            count++;
            date = new Date().toDateString()
            return date;
        }else{
            return date;
        } 
    })();
};

const dateModified = () => new Date().toDateString();

const recipe = createSlice({
    name: 'recipe',
    initialState: {
        id: '',
        name: '',
        imageUrl: 'https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=586&q=80',
        ingredients: '',
        instructions: '',
        serving_size: 0,
        category: '',
        notes: '',
        date_added: '',	
        date_modified: ''
    },
    reducers: {
        recipeSlice: (state, action) => {
            state = action.payload
            return {...state, date_added: dateAdded(), date_modified: dateModified()}
        }
    }
});

export const { recipeSlice } = recipe.actions;
export default recipe.reducer;