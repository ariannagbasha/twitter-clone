import { createBrowserHistory } from "history";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducers as authReducers  } from "./auth";
import { reducers as userReducers  } from "./users";
import { getMessagesReducer } from '../redux/Messages/getMessages';
import { newMessagesReducer } from './Messages/NewMessages';
import { likeunlikeReducers } from './Messages/likeMessages';

export * from "./auth";
export * from "./users";



export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

export const store = configureStore({
  reducer: {
    router: connectRouter(history),
    auth: combineReducers(authReducers),
    users: combineReducers(userReducers),
    messages: combineReducers(getMessagesReducer),
    newMessages: combineReducers(newMessagesReducer),
    likesMessages: combineReducers(likeunlikeReducers)
  },
  preloadedState: {},
  devTools: process.env.NODE_ENV !== "production"
});

store.subscribe(() => {
  localStorage.setItem("login", JSON.stringify(store.getState().auth.login));
});
