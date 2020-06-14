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

// Finished Login fixed by Vince

const LOGIN = createActions("login");
export const login = loginData => dispatch => {
  dispatch(LOGIN.START());

  return fetch(url + "/login", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(loginData)
  })
    .then(handleJsonResponse)
    .then(result => dispatch(LOGIN.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(LOGIN.FAIL(err))));
};

export const googleLogin = loginData => (dispatch) => {
  dispatch(LOGIN.SUCCESS(loginData));
};

const LOGOUT = createActions("logout");
export const logout = () => (dispatch, getState) => {
  dispatch(LOGOUT.START());

  const token = getState().auth.login.result.token;
  dispatch(LOGOUT.SUCCESS({}))
  return fetch(url + "/logout", {
    method: "GET",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders }
  })
    .then(handleJsonResponse)
    .catch( () => {
      localStorage.clear()
    } );
};

export const reducers = {
  login: createReducer(getInitStateFromStorage("login", asyncInitialState), {
    ...asyncCases(LOGIN),
    [LOGOUT.SUCCESS.toString()]: (state, action) => asyncInitialState
  }),
  logout: createReducer(asyncInitialState, {
    ...asyncCases(LOGOUT)
  })
};
