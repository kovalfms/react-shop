import {applyMiddleware, combineReducers, createStore} from "redux";
import {ballsReducer} from "./reducers/ballsReducer";
import {cartReducer} from "./reducers/cartReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    balls: ballsReducer,
    cart: cartReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))