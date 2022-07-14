import { Container, Input, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { recipeSlice } from '../redux/slice/recipe';
import { CREATE_RECIPE, UPDATE_RECIPE_BY_ID } from '../redux/types/index';
import { nanoid } from '@reduxjs/toolkit';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const RecipesForm = () => {
    const recipe = useSelector(state => state.recipe);
    const dispatch = useDispatch();
    // console.log('recipeID',recipe.id === 0)
    // console.log('recipe',recipe)
    const navigate = useNavigate();

    const handleChange = (prop) => (event) => {
        dispatch(recipeSlice({...recipe, [prop]: event.target.value}));
    }

    const handleSubmit = () => {
        recipe.id === '' ? dispatch({type: CREATE_RECIPE, recipe: {...recipe, id: nanoid(8)}}) : dispatch({type: UPDATE_RECIPE_BY_ID, recipe})

        dispatch(recipeSlice({
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
        }))

        navigate('/dashboard');

    }
    return <>
        <Container style={{paddingTop: "15px", color: "black"}}className='containers'>
            <FormControl style={{ display: "flex", flexDirection: "row"}} fullWidth>
                <FormLabel
                style={{color:"black", fontSize: "16px", paddingRight: "8px", postion: "relative", top: "10px",}}
                 id="demo-row-radio-buttons-group-label">Category:</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    onChange={handleChange('category')}
                    name="row-radio-buttons-group"
                    value={recipe.category}
                >
                <FormControlLabel value="Breakfast" control={<Radio color="default"/>} label="Breakfast" />
                <FormControlLabel value="Lunch" control={<Radio color="default" />} label="Lunch" />
                <FormControlLabel value="Dinner" control={<Radio color="default" />} label="Dinner" />
                <FormControlLabel value="Snack" control={<Radio color="default"/>} label="Snack" />
                <FormControlLabel
                control={<Radio color="default"/>}
                label="Other"
                />
                </RadioGroup>
            </FormControl>
            <main>
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
             {/* <label>Category:</label>
            <Input onChange={handleChange('category')} placeholder='Enter category (ie lunch, dinner)'value= {recipe.category} fullWidth></Input> */}
            <label>Notes:</label>
            <Input onChange={handleChange('notes')} placeholder='Enter details'value={recipe.notes} fullWidth></Input>
            <Button onClick={() => handleSubmit()} style={{fontSize: "17px", background:"#F98404"}} variant='contained' fullWidth>Submit</Button>
            </main>
        </Container>
   </>
}

export default RecipesForm;