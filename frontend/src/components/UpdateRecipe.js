import React from 'react';
import { Container, Input, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { recipeSlice } from '../redux/slice/recipe';
import { CREATE_RECIPE, UPDATE_RECIPE_BY_ID } from '../redux/types/index';


const UpdateRecipe = () => {
    const recipe = useSelector(state => state.recipe);
    const dispatch = useDispatch();
    // console.log('recipeID',recipe.id === 0)
    // console.log('recipe',recipe)
    const navigate = useNavigate();

    const handleChange = (prop) => (event) => {
        dispatch(recipeSlice({...recipe, [prop]: event.target.value}));
    }

    const handleSubmit = () => {
        // console.log('handlesubmit')
        // console.log('id', recipe.id)
        // recipe.id === 0 ? dispatch(addRecipeSlice({...recipe, id: nanoid(8)})) : dispatch(updateRecipeSlice(recipe))
        recipe.id === 0 ? dispatch({type: CREATE_RECIPE, recipe: {...recipe, id: ''}}) : dispatch({type: UPDATE_RECIPE_BY_ID, recipe})

        dispatch(recipeSlice({
            id: 0,
            name: '',
            imageUrl: 'https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=586&q=80',
            ingredients: '',
            instructions: '',
            serving_size: 0,
            category: '',
            notes: '',
            date_added: '',			
            date_modified: ''
        }))

        navigate('/dashboard');
    }

  return (
    <Container>
            <label>Name:</label>
            <Input onChange={handleChange('name')} placeholder='Enter name' value={recipe.name} fullWidth></Input>
            <label>Image URL:</label>
            <Input onChange={handleChange('imageUrl')} placeholder='Enter url' value={recipe.imageUrl} fullWidth></Input>
            <label>Serving Size:</label>
            <Input onChange={handleChange('serving_size')} placeholder='Enter serving size'value={recipe.serving_size} fullWidth></Input>
            <label>Ingredients:</label>
            <Input onChange={handleChange('ingredients')} placeholder='Enter ingredients'value={recipe.ingredients} fullWidth></Input>
            <label>Instructions:</label>
            <Input onChange={handleChange('instructions')} placeholder='Enter instructions'value={recipe.instructions} fullWidth></Input>
             <label>Category:</label>
            <Input onChange={handleChange('category')} placeholder='Enter category (ie lunch, dinner)'value= {recipe.category} fullWidth></Input>
            <label>Notes:</label>
            <Input onChange={handleChange('notes')} placeholder='Enter details'value={recipe.notes} fullWidth></Input>
            <Button onClick={() => handleSubmit()} variant='contained' fullWidth>Submit</Button>
        </Container>
  )
}

export default UpdateRecipe;