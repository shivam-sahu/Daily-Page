import {LOGGED_IN} from "../actions/types";


const initialState = {
  isAutheticated : false,
  user : {}
};

const authReducer = (state = initialState, action) => {

  switch(action.type) {

    case LOGGED_IN:
      return {...state, isAutheticated : true, token : action.token};
    default : 
      return state;
  }


};

export default authReducer;