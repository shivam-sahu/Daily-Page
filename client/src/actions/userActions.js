import { 
  UPDATE_EDITOR_TEXT, 
  ADD_EDITOR, 
  HANDLE_NOTE_CLICK,
  SET_INITIAL_STATE

} from './types';
import axios from 'axios';
import debounce from '../helpers';

export const addEditor =(text)=>async dispatch=>{
  const token = localStorage.jwtToken;
  axios.defaults.headers.common = { 'Authorization': token }
  
  const request = await axios.post("http://localhost:3001/api/note/",{text,token})
  .then(res=>res.data)
  console.log(request);
  dispatch({
    type:ADD_EDITOR,
    payload:request
  })
}


export const setInitalState =()=>async dispatch =>{
  const token = localStorage.jwtToken;
  axios.defaults.headers.common = { 'Authorization': token };
  const request = await axios.get("http://localhost:3001/api/note/")
  .then(res=>res.data)
  // console.log(request);

  return({
    type:SET_INITIAL_STATE,
    payload:null
  })
}

export const updateEditorText =(txt)=> async dispatch=>  {
    // console.log(txt)
    dispatch({
    type: UPDATE_EDITOR_TEXT,
    payload:{
      txt
    }
  })
  update();
}

const update = debounce(() => {
  // this.props.noteUpdate(this.state.id, {
  //   body: this.state.text
  // })
  console.log("sending data to database");
}, 5000);
export const handleNoteClick = (text, index)=>{
  const payload = {
    text,
    index
  }
  return {
    type:HANDLE_NOTE_CLICK,
    payload
  }
}