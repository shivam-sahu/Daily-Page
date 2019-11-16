const initialState = {
  initialContent: `<br/>
<center><b>You can write your notes here</b></center>
<center>React Native</center>
<br/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png" ></br></br>
</br></br>
`,
  editorContent: "",
  notes:[],
  showEditor:false,
  selectedNoteId:null,
  contacts:[],
  isContactEditing:false,
  selectedContactId:null, 
  selectedContact:null,
  reminders:[],
  isReminderEditing:false,
  isDayClicked:false,
  selectedReminderId:null,
  selectedReminder:null,
  seletedDate:null 
}
const userReducer = (state=initialState, action)=>{
  const {payload, type} = action;
  switch(type){
    
    //? Contact Reducers
    case ('ADD_CONTACT'):{
      return{
        ...state,
        isContactEditing:true,
        selectedContactId:null,
        selectedContact:null
      }
    }

    case ('GET_CONTACTS'):{
      const {arr} = payload;
      return {...state,contacts:arr}
    }

    case ('HANDLE_CONTACT_CLICK'):{
      const {_id:selectedContactId} =payload
      return {...state,
        selectedContactId,
        isContactEditing:true,
        selectedContact:payload
      }
    }

    case ('SAVE_CONTACT'):{
      return{
        ...state,
        isContactEditing:false,
        selectedNoteId:''
      }
    }

    case ('UPDATE_CONTACT'):{
      // console.log("state->",state.contacts)
      const { _id:id,data,request} = payload;
      const oldContacts = state.contacts;
      const filteredContacts = oldContacts.filter(({_id})=> _id !== id)
      console.log(filteredContacts)
      return {...state,
        isContactEditing:false,
        selectedContact:null,
        selectedContactId:null,
        contacts: [...filteredContacts,data]
      }
    }
    
    //? Editor Reducers
    case ('ADD_EDITOR'):{
      const { text, noteID} = payload;
      return {
        ...state,
        editorContent:text,
        selectedNoteId:noteID.toString(),
        showEditor:true
      }
    }
    case ('HANDLE_NOTE_CLICK'):{
      const { text, _id } = payload;
      return {
        ...state,
        editorContent:text,
        selectedNoteId:_id,
        showEditor:true
      }
    }
    case ('GET_DATA'):{
      const {arr} = payload;
      // console.log('state updated...')
      return{...state, notes:arr}
    }
    case ('UPDATE_EDITOR_TEXT'):{
      // const { text, noteID} = payload;
      const {text}  = payload
      // console.log(payload)
      return { ...state, 
        editorContent: payload, 
        // selectedNoteId: noteID.toString()
      }
    }
    case ('DONE_CHANGES'):{
      return{...state}
    }
    //? remider reducers

    case ('HANDLE_DAY_PRESS'):{
      const {day:{timestamp},arr} = payload;
      return { 
        ...state, 
        seletedDate:timestamp,
        reminders:arr,
        isDayClicked:true
      }
    }

    case ('ADD_REMINDER'):{
      return { ...state, isReminderEditing:true}
    }

    case ('CLOSE_REMINDER'):{
      return{...state,
        isReminderEditing:false,
        selectedReminderId: null,
        selectedReminder: null
      }
    }

    case ('DELETE_REMINDER'):{
      return{...state,
        isReminderEditing: false,
        selectedReminderId: null,
        selectedReminder: null
      }
    }

    case ('HANDLE_REMINDER_CLICK'):{
      const { reminder:{_id}} = payload;
      const {reminder} = payload;
      return{...state,
      isReminderEditing:true,
      selectedReminderId:_id,
      selectedReminder:reminder
      }
    }
    case ('SAVE_REMINDER'):{
      return{...state,
        isReminderEditing:false,
        selectedReminderId:null,
        selectedReminder:null
      }
    }

    case ('UPDATE_REMINDER'):{
      return{...state,
        isReminderEditing: false,
        selectedReminderId: null,
        selectedReminder: null
      }
    }

    default: 
      return state;
  }
}

export default userReducer;