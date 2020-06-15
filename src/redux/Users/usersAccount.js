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

// Got help from TJ
  const url = (username) => domain + `/users/${username}`; 

  
  const USER_INFO = createActions("getUsersInfoTo");
  export const user = () => (dispatch, getState) => {
    dispatch(USER_INFO.START()); /// What triggers the reducer function to add something to the state
    // console.log(userData.username)
    let username = getState().auth.login.result.username;
    return fetch(url(username), {
      method: "GET", //Only have to get the information
      headers: jsonHeaders,
    })
      .then(handleJsonResponse)
      .then(result => {
        dispatch(USER_INFO.SUCCESS(result))
            console.log(result) 
            console.log("Hello", result)
            
            result=result.user
            console.log(result)   
            dispatch(USER_INFO.SUCCESS(result))               
        }) // Result will be the object that I see on the Swagger docs under responses section
      .catch(err => Promise.reject(dispatch(USER_INFO.FAIL(err))));
  };
  export const reducers = {
    user: createReducer(getInitStateFromStorage("getUsersInfoTo", asyncInitialState), {
      ...asyncCases(USER_INFO),
    })
 
  };
