import {
    domain,
    jsonHeaders,
    handleJsonResponse,
    getInitStateFromStorage,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer
  } from "./helpers";
  
  const url = domain + "/auth";
  
  const REGISTER = createActions("registeruser");
  export const register = registerData => dispatch => {
    dispatch(REGISTER.START());
  
    return fetch(url + "/register", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(registerData)
    })
      .then(handleJsonResponse)
      .then(result => dispatch(REGISTER.SUCCESS(result)))
      .catch(err => Promise.reject(dispatch(REGISTER.FAIL(err))));
  };
  
  
  export const reducers = {
    register: createReducer(getInitStateFromStorage("registeruser", asyncInitialState), {
      ...asyncCases(REGISTER),
      [REGISTER.SUCCESS.toString()]: (state, action) => asyncInitialState
    })
 
  };