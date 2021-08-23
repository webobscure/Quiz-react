import axios from 'axios';
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes';

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbcSbGgHGhrcxBK40l1-sWv2xFaxhMwaA';

    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbcSbGgHGhrcxBK40l1-sWv2xFaxhMwaA';
    }

    const response = await axios.post(url, authData);
    const data = response.data;

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  };
}
export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.setItem('token');
  localStorage.setItem('userId');
  localStorage.setItem('expirationDate');
  return {
    type: AUTH_LOGOUT,
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}
