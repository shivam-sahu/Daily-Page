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
  selectedNoteId:null
}
const userReducer = (state=initialState, action)=>{
  const {payload, type} = action;
  switch(type){

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

    default: 
      return state;
  }
}

export default userReducer;