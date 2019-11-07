import {LOGGED_IN} from "../actions/types";


const initialState = {
  isAuthenticated : false,
  token : null,
  user : {}
};

const authReducer = (state = initialState, action) => {

  const {type, token} = action;
  switch(type) {
    
    case ("LOGGED_IN"):
    { 
      return { ...state, isAuthenticated : true, token};
    }
    default :
    {
      return state;
    }
  }


};

export default authReducer;