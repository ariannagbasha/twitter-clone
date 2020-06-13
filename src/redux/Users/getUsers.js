import {
    domain,
    handleJsonResponse,
    getInitStateFromStorage,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer
  } from '../helpers';
  
  const url = domain + "/users?limit=10";
  
  const GETUSERS = createActions("getUsers");
  export const getUsers = () => dispatch => {
    dispatch(GETUSERS.START());
  
    return fetch(url)
      .then(handleJsonResponse)
      .then(result => {
        console.log(result)
        result=Object.keys(result.users).map(key=>result.users[key])
        console.log(result)
        dispatch(GETUSERS.SUCCESS(result))
      })
      .catch(err => Promise.reject(dispatch(GETUSERS.FAIL(err))));
  };
  
  
  export const getUsersReducer = {
    getUsers: createReducer(getInitStateFromStorage("getUsers", asyncInitialState), {
      ...asyncCases(GETUSERS),
    }),
  };