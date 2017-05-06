import { combineReducers } from 'redux'
import { AUTH_LOGGING_IN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE} from './actions';
import { AppNavigator } from './appnavigator'
import { login } from './utils/api-client';

const authInitialState = {
  isLoggedIn: false,
  jwt: '',
  isRequesting: false
}

function authReducer(state = authInitialState, action) {
  switch (action.type) {
    case AUTH_LOGGING_IN:
      return Object.assign({}, state, {
        isLoggedIn: false,
        jwt: '',
        isRequesting: true
      });
      case AUTH_LOGIN_SUCCESS:
        console.log('login success, setting jwt in redux store');
        return Object.assign({}, state, {
          isLoggedIn: true,
          jwt: action.jwt,
          isRequesting: false
        });
      case AUTH_LOGIN_FAILURE:
        return Object.assign({}, state, {
          isLoggedIn: false,
          jwt: '',
          isRequesting: false
        });
    default:
      return state
  }
}


const secondAction = AppNavigator.router.getActionForPathAndParams('login');
const navInitialState = AppNavigator.router.getStateForAction(secondAction);

function navReducer (state = navInitialState, action) {
  console.log('action is ');
  console.log(action);
  const nextState = AppNavigator.router.getStateForAction(action, state);
  // let nextState;
  // switch (action.type) {
  //   case 'login':
  //     nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
  //     break;
  //   default:
  //      nextState = AppNavigator.router.getStateForAction(action, state);
  //      break;
  // }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const worrywortClientReducer = combineReducers({
  auth: authReducer,
  nav: navReducer,
  //batchList: batchListReducer,
});
export default worrywortClientReducer;
