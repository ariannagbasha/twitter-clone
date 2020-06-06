import {
    domain,
    handleJsonResponse,
    getInitStateFromStorage,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer
  } from "../helpers";
  
  const url = domain + "/messages?limit=200";
  
  const GETMESSAGES = createActions("getMessages");
  export const getMessages = () => dispatch => {
    dispatch(GETMESSAGES.START());
  
    return fetch(url)
      .then(handleJsonResponse)
      .then(result => {
        console.log(result)
        result=Object.keys(result.messages).map(key=>result.messages[key])
        console.log(result)
        dispatch(GETMESSAGES.SUCCESS(result))
      })
      .catch(err => Promise.reject(dispatch(GETMESSAGES.FAIL(err))));
  };
  
  
  export const getMessagesReducer = {
    getMessages: createReducer(getInitStateFromStorage("getMessages", asyncInitialState), {
      ...asyncCases(GETMESSAGES),
    }),
  };
  