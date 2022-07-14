import { all } from 'redux-saga/effects';
import { watchRecipesAsync } from './recipe'

export default function* rootSaga() {
    yield all([
        watchRecipesAsync()
    ])
}
