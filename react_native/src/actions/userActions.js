import { 
  UPDATE_EDITOR_TEXT, 
  ADD_EDITOR, 
  DELETE_NOTE,
  HANDLE_NOTE_CLICK,
  GET_DATA,
  CLOSE_EDITOR,
  DONE_CHANGES,
  GET_CONTACTS,
  ADD_CONTACT,
  CLOSE_CONTACT,
  DELETE_CONTACT,
  SAVE_CONTACT,
  HANDLE_CONTACT_CLICK,
  UPDATE_CONTACT,
  ADD_REMINDER,
  ADD_REMINDER_BTN,
  CLOSE_REMINDER,
  DELETE_REMINDER,
  SAVE_REMINDER,
  GET_REMINDER,
  HANDLE_DAY_PRESS,
  HANDLE_REMINDER_CLICK,
  UPDATE_REMINDER
} from './types';
import axios from '../utils/axios';
import AsyncStorage from '@react-native-community/async-storage';
import {debounce} from 'lodash';
import NavigationService from '../../NavigationService';

//? axios settings

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('jwtToken')
    if (value !== null) {
      // console.log(value)
      const token = value;
      axios.defaults.headers.common = { 'Authorization': token }
    }
  } catch (e) {
    // error reading value
    console.log("login error")
    throw (e)
  }
}
getToken();

//? contact actions 

export const addContact = () => {
  return ({
    type: ADD_CONTACT,
    payload: null
  })
}

export const closeContact = ()=>{
  return{
    type:CLOSE_CONTACT,
    payload:null
  }
}

export const deleteContact = (contactID)=>async dispatch=>{
  const request = await axios.delete('/api/contact/', { data: { contactID } })
    .then(res => res.data)
    .catch(e => console.log("note not deleted!"));
  dispatch({
    type:DELETE_CONTACT,
    payload: request
  })
}

export const getContacts=()=>async dispatch=>{
  
  await getToken();
  const request = await axios.get("/api/contact/")
  .then(res=>res.data)
  .catch(err=>{
    console.log("cannot fetch contacts")
  // throw(err)
  })

  dispatch({
    type:GET_CONTACTS,
    payload:request
  })
}

export const handleContactClick=(contact)=>{
  return {
    type:HANDLE_CONTACT_CLICK,
    payload: contact
  }
}

export const saveContacts=(contacts)=>async dispatch=>{
  const request = await axios.post("/api/contact",{...contacts})
  .then(res=>res.data)
  .catch(err=>{console.log("something went wrong while saving contact")})

  dispatch({
    type: SAVE_CONTACT,
    payload:null
  })
}

export const updateContact = (contacts)=>async dispatch=>{
  const request = await axios.put("/api/contact", {...contacts})
  .then(res=>res.data)
  .catch(err=>{console.log("something went wrong while updataing contacts")})
  console.log(request)
  dispatch({
    type:UPDATE_CONTACT,
    payload:{
      request,
      data:contacts,
      _id: contacts.contactID
    }
  })
}

//? Editor actions
export const addEditor =(text)=>async dispatch=>{
  
  const request = await axios.post("/api/note/",{text})
  .then(res=>res.data)
  // console.log(request);
  dispatch({
    type:ADD_EDITOR,
    payload:request
  })
}

export const closeEditor =()=>{
  return {
    type: CLOSE_EDITOR,
    payload:null
  };
}
export const deleteNotes = (noteID)=>async dispatch=>{
  // console.log(noteID)
  const request = await axios.delete("/api/note/",{data:{noteID}})
  .then(res=>res.data)
  .catch(err=>{console.log(err)})

  dispatch({
    type:DELETE_NOTE,
    payload:request
  })
}
export const doneChanges =(noteID,text)=>async dispatch=>{  
  const request = await axios.put("/api/note/",{noteID, text})
  .then(res=>res.data)
  .catch(err=>{console.log(err)})
  // NavigationService.navigate('User');
  dispatch({
    type:DONE_CHANGES,
    payload: request
  })
}


export const getData =()=>async dispatch =>{
  await getToken();
  const request = await axios.get("/api/note/")
  .then(res=>res.data)
  .catch(err=>{console.log('cant fetch notes')})
  // console.log(request);

  dispatch({
    type: GET_DATA,
    payload:request
  })
}

export const handleNoteClick = (text, _id) => {
  const payload = {
    text,
    _id
  }
  return {
    type: HANDLE_NOTE_CLICK,
    payload
  }
}

export const updateEditorText =(note)=>{
  const text= note;
   return({
    type: UPDATE_EDITOR_TEXT,
    payload:text
  })

}



//? Remainder actions

export const addReminder = (text) => async dispatch => {

  // const request = await axios.post("/api/reminder/", { text })
  //   .then(res => res.data).catch(console.log("can't hit reminder"))
  // // console.log(request);
  // dispatch({
  //   type: ADD_REMINDER,
  //   payload: request
  // })
  return {
    type:ADD_REMINDER_BTN,
    payload:null
  }
}

export const saveReminder = (text,seletedDate) => async dispatch => {

  const timestamp = seletedDate;

  const request = await axios.post("/api/reminder/", {text,timestamp })
    .then(res => res.data)
    .catch(err => { console.log("went wrong while saving reminder") })
    console.log(request)
  dispatch({
    type: SAVE_REMINDER,
    payload: request
  })
}


export const closeReminder =()=>{
  return {
    type:CLOSE_REMINDER,
    payload:null
  }
}

export const deleteReminder =(_id)=>async dispatch=>{
  const reminderID = _id;
  const request = await axios.delete('/api/reminder/', { data:{reminderID}})
    .then(res=>res.data)
    .catch(e=>console.log("note not deleted!"))
  ;
  dispatch({
    type:DELETE_REMINDER,
    payload:request
  })
}

export const handleDayPress = (dateString)=>async dispatch=>{
  // const {dateString} = day;
  // console.log(day)
  const request = await axios
    .get("/api/reminder", { params: { dateString } })
    .then(res => res.data)
    .catch(err => {
      console.log("cant fetch reminders");
    });
  dispatch ({
    type: HANDLE_DAY_PRESS,
    payload:{dateString,arr:request.arr}
  })
}

export const handleReminderClick = (reminder) => {
  const payload = {
    reminder
  }
  return {
    type: HANDLE_REMINDER_CLICK,
    payload
  }
}

export const updateReminder = (reminder) =>async dispatch=> {
  const data = {
    reminderID:reminder._id,
    text:reminder.text,
    date:reminder.date
  }
  const request = await axios.put('/api/reminder',{...data})
  .then(res=>res.data)
  .catch(e=>console.log('reminder not updated'))
  dispatch ({
    type: UPDATE_REMINDER,
    payload: request
  })
}