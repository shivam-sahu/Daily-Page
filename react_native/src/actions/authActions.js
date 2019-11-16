import {TEST_DISPATCH} from './types';
import {GET_ERRORS} from './types';
import {LOGGED_IN} from './types';
import axios from '../utils/axios';
import AsyncStorage from '@react-native-community/async-storage';

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

export const loginUser =  (userData) => async dispatch => {

  await axios.post('/api/user/login',userData)
    .then(async res => {
      const token = res.data.token;
      await AsyncStorage.setItem("jwtToken",token);
      console.log(token);
      // history.push("/")
      dispatch ({
        type : "LOGGED_IN",
        token
      })
      })
    .catch(err =>
      // console.log("err yaha hai")
      console.log({
        type : GET_ERRORS,
        // msg : err.response.msg,
        msg:err,
        userData
      })
       )
  return {
    type: GET_ERRORS,
    payload: userData
  };
};