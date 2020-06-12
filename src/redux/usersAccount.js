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

  const url = domain + `/user/${username}`; 


  const USER_INFO = createActions("getUserInfo");
  export const user = userInfo => dispatch => {
    dispatch(USER_INFO.START());
  
    return fetch(url, {
      method: "GET",
      headers: jsonHeaders,
      body: JSON.stringify(getUserInfo)
    })
      .then(handleJsonResponse)
      .then(result => dispatch(USER_INFO.SUCCESS(result))) // Result will be the object that I see on the Swagger docs under responses section
      .catch(err => Promise.reject(dispatch(USER_INFO.FAIL(err))));
  };

  export const reducers = {
    register: createReducer(getInitStateFromStorage("getUserInfo", asyncInitialState), {
      ...asyncCases(USER_INFO),
      [USER_INFO.SUCCESS.toString()]: (state, action) => asyncInitialState
    })
 
  };
