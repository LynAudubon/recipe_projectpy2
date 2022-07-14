import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './components/AppContext'
import RecipesForm from './components/RecipesForm';
import Table from './components/Table';
import RecipeCard from './components/RecipeCard';
import UpdateRecipe from './components/UpdateRecipe';
import NavBar from './components/NavBar';
import { Provider } from 'react-redux';
import store from './store';
import SignIn from './components/SignIn';
import './App.css';
import './css/global.css';

const App = () => { 
    return <>
    <NavBar />
      <Provider store={store}>
        <AppProvider>
          <Routes>
            <Route path='/dashboard' element={<Table/>} />
            <Route path='/add-recipe' element={<RecipesForm/>} />
            <Route path='/update-recipe/:id' element={<UpdateRecipe/>} />
            <Route path='/recipe/:id' element={<RecipeCard/>} />
            <Route path='/signIn' element={<SignIn/>} />
            <Route path='*' element={<Table/>} />
          </Routes>
        </AppProvider>
      </Provider>
  </>
}
export default App;

