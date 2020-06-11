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

const url = domain + "/auth/google";

const LOGIN = createActions("login");
export const login = loginData => dispatch => {
  dispatch(LOGIN.START());

  return fetch(url + "/login", {
    method: "GET",
    headers: jsonHeaders,
  })
    .then(handleJsonResponse)
    .then(result => dispatch(LOGIN.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(LOGIN.FAIL(err))));
};

export const reducers = {
  login: createReducer(getInitStateFromStorage("login", asyncInitialState), {
    ...asyncCases(LOGIN)
  })
};
