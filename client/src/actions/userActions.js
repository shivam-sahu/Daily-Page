import { 
  UPDATE_EDITOR_TEXT, 
  ADD_EDITOR, 
  HANDLE_NOTE_CLICK,
  GET_DATA,
  DONE_CHANGES

} from './types';
import axios from 'axios';
import {debounce} from 'lodash';

//? axios settings

const token = localStorage.jwtToken;
axios.defaults.headers.common = { 'Authorization': token }

export const addEditor =(text)=>async dispatch=>{
  
  const request = await axios.post("http://localhost:3001/api/note/",{text})
  .then(res=>res.data)
  console.log(request);
  dispatch({
    type:ADD_EDITOR,
    payload:request
  })
}

export const doneChanges =(noteID,text)=>async dispatch=>{
  // const note={
  //   noteId,
  //   text
  // }
  // console.log(note.noteId)
  
  const request = await axios.put("http://localhost:3001/api/note/",{noteID, text})
  .then(res=>res.data)
  .catch(err=>{console.log(err)})
  console.log(request);
  dispatch({
    type:DONE_CHANGES,
    payload: request
  })
}


export const getData =()=>async dispatch =>{
  const request = await axios.get("http://localhost:3001/api/note/")
  .then(res=>res.data)
  // console.log(request);

  dispatch({
    type: GET_DATA,
    payload:request
  })
}

export const updateEditorText =(note)=>{
  // const { _id: noteID, text} = note;
  // const payload={
  //   noteID,
  //   text
  // }
  const text= note;
   return({
    type: UPDATE_EDITOR_TEXT,
    payload:text
  })

}

const  update =  debounce(async(note) => {
  const request =await axios.patch("http://localhost:3001/api/note/",note)
  console.log("sending data to database");
}, 2000);

export const handleNoteClick = (text, _id)=>{
  const payload = {
    text,
    _id
  }
  return {
    type:HANDLE_NOTE_CLICK,
    payload
  }
}