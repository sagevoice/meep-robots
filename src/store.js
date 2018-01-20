// @flow
import {combineReducers, createStore, applyMiddleware, compose} from 'redux'
import game from './game'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = {
  game,
}

// for explanation of the following types, see:
// https://blog.callstack.io/type-checking-react-and-redux-thunk-with-flow-part-2-206ce5f6e705
type Reducers = typeof reducers
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V
export type State = $ObjMap<Reducers, $ExtractFunctionReturn>
export type GetState = () => State

const combinedReducers = combineReducers(reducers)

const store = createStore(combinedReducers, composeEnhancers(applyMiddleware()))

export default store
