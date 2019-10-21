import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 

import SiderbarItem from '../SidebarItem';
import { addEditor} from '../../../actions/userActions';

const data = [
  { 
    id:1,
    text:"<div>By now, you already understand the basic mechanics of how GraphQL servers work under the hood - surprisingly simple right? That’s part of the beauty of GraphQL, that it actually only follows a few very simple rules. The strongly typed schema and the GraphQL engine that’s resolving the queries inside the server are taking away major pain points commonly dealt with in API development</div>"
  },
  { 
    id:2,
    text:"<div>another note</div>"
  }
]

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
    return(<div className="SideBar">
      <button type="button" onClick={() => this.props.addEditor(this.props.editorContent)}>
        New Note
      </button>
      {
        data ?
        data.map((note,index)=>{
          return (<SiderbarItem text={note.text} key={index}/>)
        })
        :null
      }
    </div>
  )}
}

const mapDispatchToProps = dispatch=>{

  return (bindActionCreators({
    addEditor,
  },dispatch));
}
const mapStateToProps = (state)=>{

  // console.log(state);
  const {user} = state;
  return user;
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);