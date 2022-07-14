import React, {shallow} from 'react';
import { render, screen } from '@testing-library/react';
import { configureStore } from "@reduxjs/toolkit";
import Table from './components/Table';
import { Provider } from 'react-redux'
import {RecipesSlice, addRecipeSlice, updateRecipeSlice,  deleteRecipeSlice} from './redux/slice/recipes';
import { Typography } from '@material-ui/core';


const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

test('renders loading', () => {
  const store = configureStore({reducer: {recipes: {RecipesSlice, addRecipeSlice, updateRecipeSlice, deleteRecipeSlice}}});

  const wrapper = ({ children }) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
  );

  render(<Table />, {wrapper});
  const isLoading = screen.getByText("Loading...");
  expect(isLoading).toBeInTheDocument();
});


// test('renders table view', () => {
//   const store = configureStore({reducer: {recipes: {RecipesSlice, addRecipeSlice, updateRecipeSlice, deleteRecipeSlice}}});
//   const wrapper = ({ children }) => (
//     <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
//   );

//     render(<Table/>, {wrapper});
//     // const wrapper2 = shallow(<Table />);
//     expect(wrapper.find('Typography')).toBeInTheDocument();
// });
