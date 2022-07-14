import { createSlice } from '@reduxjs/toolkit';

const recipes = createSlice({
    name: 'recipes',
    initialState: [{
        id: '',
        name: '',
        imageUrl: '',
        ingredients: '',
        instructions: '',
        serving_size: 0,
        category: '',
        notes: '',
        date_added: '',			
        date_modified: ''

    }],
    reducers: {
        allRecipesSlice: (state, action) => {
            state = action.payload
            return state
        },

        addRecipeSlice: (state, action) => {
            // console.log('action',action)
            // console.log('state',state)
            state.push(action.payload)
            return state
        },

        updateRecipeSlice: (state, action) => {
            // console.log('state',state)
            state = state.map(item => item.id === action.payload.id ? action.payload : item)
            return state
        },

        deleteRecipeSlice: (state, action) => {
            state = state.filter(item => item.id !== action.payload)
            return state
        }
    }
});

export const { allRecipesSlice, addRecipeSlice, updateRecipeSlice,  deleteRecipeSlice } = recipes.actions;
export default recipes.reducer;