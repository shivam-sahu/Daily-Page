import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 

import SiderbarItem from '../SidebarItem';
import { addEditor, doneChanges} from '../../../actions/userActions';

class Sidebar extends Component{
  constructor(props){
    super(props);
    this.state={
      id:'',
      notes:'',
      addingNote:false
    }
  }

  render(){
    const data = this.props.notes;
    console.log(this.props)
    return (<div className="SideBar">
      <button type='button' onClick={() => this.props.addEditor(this.props.initialContent)}>
        New Note
      </button>
      <button onClick={() => this.props.doneChanges(this.props.selectedNoteId, this.props.editorContent)}>Done</button>
      {
        data?
        data.map((note)=>{
          // console.log(note._id.toString())
          return (<SiderbarItem text={note.text} key={note._id} _id = {note._id.toString()}/>)
        })
        :null
      }
    </div>
  )}
}

const mapDispatchToProps = dispatch=>{

  return (bindActionCreators({
    addEditor,
    doneChanges
  },dispatch));
}
const mapStateToProps = (state)=>{

  // console.log(state);
  const {user} = state;
  return user;
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);