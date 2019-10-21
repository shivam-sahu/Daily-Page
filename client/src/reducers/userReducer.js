const initialState = {
  editorContent: "<div contenteditable='false'> Write your notes here </div>",
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
        selectedNoteId:noteID,
        showEditor:true
      }
    }
    case ('HANDLE_NOTE_CLICK'):{
      const { text, index } = payload;
      return {
        ...state,
        editorContent:text,
        showEditor:true
      }
    }
    case ('SET_INITIAL_STATE'):{
      return{...state}
    }
    case ('UPDATE_EDITOR_TEXT'):{
      const {txt} = payload;

      return { ...state, editorContent:txt }
    }

    default: 
      // console.log("CHALLA");  
      return state;
  }
}

export default userReducer;