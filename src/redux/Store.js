import { createStore, applyMiddleware ,combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { carsReducer } from './reducers/carsReducer';
import { alertsReducer } from './reducers/alertsReducer';
import {bookingsReducer} from "../redux/reducers/bookingsReducer"

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const rootReducer=combineReducers({
    carsReducer,
    alertsReducer,
    bookingsReducer
})
const Store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default Store