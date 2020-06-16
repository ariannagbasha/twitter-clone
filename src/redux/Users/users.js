import {
    domain,
    jsonHeaders,
    handleJsonResponse,
    getInitStateFromStorage,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer
  } from '../helpers';
  
  
  const url = domain + "/users"; 
  
  const REGISTER = createActions("registeruser");
  export const register = registerData => dispatch => {
    dispatch(REGISTER.START());
  
    return fetch(url, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(registerData)
    })
      .then(handleJsonResponse)
      .then(result => dispatch(REGISTER.SUCCESS(result))) // Result will be the object that I see on the Swagger docs under responses section
      .catch(err => Promise.reject(dispatch(REGISTER.FAIL(err))));
  };
  
  
  export const reducers = {
    register: createReducer(getInitStateFromStorage("registeruser", asyncInitialState), {
      ...asyncCases(REGISTER),
      [REGISTER.SUCCESS.toString()]: (state, action) => asyncInitialState
    })
 
  };