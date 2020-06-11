import {
    domain,
    handleJsonResponse,
    getInitStateFromStorage,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer,
    jsonHeaders
  } from "../helpers";
  import { getMessages } from './getMessages';
  const url = domain + "/messages/";
  
  const DELETEMESSAGES = createActions("deleteMessages");
  export const deleteMessages = (e, messageID) => (dispatch, getState) => {
    dispatch(DELETEMESSAGES.START());
    const token = getState().auth.login.result.token;
    return fetch(url + messageID, {
      method: "DELETE", 
      headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    })
      .then(handleJsonResponse)
      .then(result => {
        console.log(result)
        dispatch(getMessages())
        dispatch(DELETEMESSAGES.SUCCESS(result))
      })
      .catch(err => Promise.reject(dispatch(DELETEMESSAGES.FAIL(err))));
  };
  
  
  export const deleteMessagesReducer = {
    deleteMessages: createReducer(getInitStateFromStorage("deleteMessages", asyncInitialState), {
      ...asyncCases(DELETEMESSAGES),
    }),
  };
  
  