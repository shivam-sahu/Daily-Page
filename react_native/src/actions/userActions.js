import { 
  UPDATE_EDITOR_TEXT, 
  ADD_EDITOR, 
  HANDLE_NOTE_CLICK,
  GET_DATA,
  DONE_CHANGES,
  GET_CONTACTS,
  ADD_CONTACT,
  CLOSE_CONTACT,
  DELETE_CONTACT,
  SAVE_CONTACT,
  HANDLE_CONTACT_CLICK,
  UPDATE_CONTACT,
  ADD_REMINDER,
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
  const request = await axios.get("/api/contact/")
  .then(res=>res.data)
  .catch(err=>{console.log("cannot fetch contacts")})

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

export const doneChanges =(noteID,text)=>async dispatch=>{  
  const request = await axios.put("/api/note/",{noteID, text})
  .then(res=>res.data)
  .catch(err=>{console.log(err)})
  NavigationService.navigate('User');
  dispatch({
    type:DONE_CHANGES,
    payload: request
  })
}


export const getData =()=>async dispatch =>{
  const request = await axios.get("/api/note/")
  .then(res=>res.data)
  .catch(err=>{console.log('something went wrong')})
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

  const request = await axios.post("/api/note/", { text })
    .then(res => res.data).catch(console.log("can't hit api/note"))
  // console.log(request);
  dispatch({
    type: ADD_REMINDER,
    payload: request
  })
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


export const getReminder = () => async dispatch => {
  const request = await axios.get("/api/reminder/")
    .then(res => res.data)
    .catch(err => { console.log('something went wrong') })
  // console.log(request);

  dispatch({
    type: GET_REMINDER,
    payload: request
  })
}

export const handleDayPress = (day)=>async dispatch=>{
  const {timestamp} = day;
  // console.log(day)
  const request = await axios.get('/api/reminder',{params:{timestamp}})
  .then(res=>res.data)
  .catch(err=>{console.log('cant fetch reminders')})
  // console.log(request);
  // NavigationService.navigate('ReminderList');
  dispatch ({
    type: HANDLE_DAY_PRESS,
    payload:{day,arr:request.arr}
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
    text:reminder.text
  }
  const request = await axios.put('/api/reminder',{...data})
  .then(res=>res.data)
  .catch(e=>console.log('reminder not updated'))
  dispatch ({
    type: UPDATE_REMINDER,
    payload: request
  })
}