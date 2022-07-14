import { configureStore } from '@reduxjs/toolkit';
import recipe from './redux/slice/recipe';
import recipes from './redux/slice/recipes'
import createSagaMiddleware from '@redux-saga/core';
import rootSaga  from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        recipe,
        recipes
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);


export default store;