import axios from 'axios'

// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'

axios.defaults.baseURL = 'http://localhost:5000'

export const getRecipesAPI = async () => axios.get('/recipes')

export const getRecipeByIdAPI = async (id) => axios.get(`/recipes/${id}`)

export const createRecipeAPI = async (recipe) => axios.post('/recipes', recipe)

export const updateRecipeAPI = async (recipe) => axios.put(`/recipes/${recipe.id}`, recipe)

export const deleteRecipeAPI = async (id) => axios.delete(`/recipes/${id}`)

