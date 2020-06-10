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
// Got help from TJ
  const url = (username) => domain + `/users/${username}`; 


  const USER_INFO = createActions("getUserInfo");
  export const user = userData => dispatch => {
    dispatch(USER_INFO.START()); /// What triggers the reducer function to add something to the state
  
    return fetch(url(userData), {
      method: "GET", //Only have to get the information
      headers: jsonHeaders,
    //   body: JSON.stringify(getUserInfo)
    })
      .then(handleJsonResponse)
      .then(result => {
          dispatch(USER_INFO.SUCCESS(result))
            console.log(result)                     
        }) // Result will be the object that I see on the Swagger docs under responses section
      .catch(err => Promise.reject(dispatch(USER_INFO.FAIL(err))));
  };

  export const reducers = {
    user: createReducer(getInitStateFromStorage("getUserInfo", asyncInitialState), {
      ...asyncCases(USER_INFO),
      [USER_INFO.SUCCESS.toString()]: (state, action) => asyncInitialState
    })
 
  };
