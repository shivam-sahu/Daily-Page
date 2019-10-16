import {TEST_DISPATCH} from './types';
import {GET_ERRORS} from './types';
import {LOGGED_IN} from './types';
import axios from 'axios';
export const registerUser = (userData,history) => dispatch => {
  axios
    .post('/api/user/register',userData)
    .then(res => history.push("/login"))
    .catch(err =>
      console.log({
        type : GET_ERRORS,
        msg : err.response.msg 
      })
       )
  return {
    type: GET_ERRORS,
    payload: userData

  };

};

export const loginUser = (userData,history) => dispatch => {

  axios
    .post('/api/user/login',userData)
    .then(res => {

      const token = res.token;
      localStorage.setItem("jwtToken",token);
      history.push("/")
      return {
        type : LOGGED_IN,
        token
      }
      })
    .catch(err =>
      console.log({
        type : GET_ERRORS,
        msg : err.response.msg,
        userData
      })
       )
  return {
    type: GET_ERRORS,
    payload: userData

  };

};