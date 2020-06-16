
import {
    domain,
    handleJsonResponse,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer,
    jsonHeaders
  } from "../helpers";
  
import { getMessages } from './getMessages';

const url = domain + "/messages";


const NEWMESSAGES = createActions("newMessages");
  export const newMessages = (messageData) => (dispatch, getState) => {
    dispatch(NEWMESSAGES.START());
    dispatch(getMessages());
    const token = getState().auth.login.result.token;
    return fetch(url, {
    method: "POST",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    body: JSON.stringify({ text: messageData })
  })
      .then(handleJsonResponse)
      .then(result => {
        dispatch(getMessages())
        dispatch(NEWMESSAGES.SUCCESS(result))
      })
      .catch(err => Promise.reject(dispatch(NEWMESSAGES.FAIL(err))));
  };
  
  
  export const newMessagesReducer = {
    newMessages: createReducer(asyncInitialState, {
      ...asyncCases(NEWMESSAGES)
    })
  };