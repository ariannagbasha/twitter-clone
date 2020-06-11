import {
    domain,
    handleJsonResponse,
    getInitStateFromStorage,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer
  } from "../helpers";
  
  const url = domain + "/messages";
  
  const DELETEMESSAGES = createActions("deleteMessages");
  export const deleteMessages = () => dispatch => {
    dispatch(DELETEMESSAGES.START());
  
    return fetch(url)
      .then(handleJsonResponse)
      .then(result => {
        console.log(result)
        result=Object.keys(result.messages).map(key=>result.messages[key])
        console.log(result)
        dispatch(DELETEMESSAGES.SUCCESS(result))
      })
      .catch(err => Promise.reject(dispatch(DELETEMESSAGES.FAIL(err))));
  };
  
  
  export const deleteMessagesReducer = {
    deleteMessages: createReducer(getInitStateFromStorage("deleteMessages", asyncInitialState), {
      ...asyncCases(DELETEMESSAGES),
    }),
  };
  
  