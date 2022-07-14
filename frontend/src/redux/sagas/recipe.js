// import * as recipesAPI from '../../api/index';
import { getRecipesAPI, getRecipeByIdAPI,createRecipeAPI, updateRecipeAPI, deleteRecipeAPI} from  '../../api/index';
import { allRecipesSlice, addRecipeSlice, updateRecipeSlice, deleteRecipeSlice} from '../slice/recipes';
import  { GET_RECIPES, GET_RECIPE_BY_ID, CREATE_RECIPE, UPDATE_RECIPE_BY_ID, DELETE_RECIPE_BY_ID } from '../types/index';
import { recipeSlice } from '../slice/recipe';
import { put, takeEvery } from 'redux-saga/effects'

export function* getRecipesSaga() {
    // console.log('getSagas')
    const recipes = yield getRecipesAPI()
    // console.log('saga',recipes);
    yield put(allRecipesSlice(recipes.data.recipes))
}

export function* getRecipeByIdSaga(action) {
    yield getRecipeByIdAPI(action.id)
    yield put(recipeSlice(action.id))
}

export function* createRecipeSaga(action){
    console.log('called create recipe', action)
    yield createRecipeAPI(action.recipe)
    yield put(addRecipeSlice(action.recipe))
}

export function* updateRecipeSaga(action) {
    console.log('update',action)
    yield updateRecipeAPI(action.recipe)
    yield put(updateRecipeSlice(action.recipe))
}
export function* deleteRecipeSaga (action) {
    // console.log('delete',action.id)
    yield deleteRecipeAPI(action.id)
    yield put(deleteRecipeSlice(action.id))
}

export function* watchRecipesAsync() {
    yield takeEvery(GET_RECIPES, getRecipesSaga)
    yield takeEvery(GET_RECIPE_BY_ID, getRecipeByIdSaga)
    yield takeEvery(CREATE_RECIPE, createRecipeSaga)
    yield takeEvery( UPDATE_RECIPE_BY_ID, updateRecipeSaga)
    yield takeEvery(DELETE_RECIPE_BY_ID, deleteRecipeSaga)
}