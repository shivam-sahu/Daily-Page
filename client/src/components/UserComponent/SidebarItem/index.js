import React, { Component } from 'react';
import {removeHTMLTags} from "../../../helpers";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {handleNoteClick} from '../../../actions/userActions';

class SidebarItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      id:'',
      txt:''
    }
  }
  render(){
    const { text, _id, handleNoteClick} = this.props;
    // console.log(_id);
    return (
    <div className="SideBarItem" onClick={() => handleNoteClick(text, _id)}>
      {/* {removeHTMLTags(text.substring(0, 30)) + '...'} */}
      {removeHTMLTags(text)+ '...'}
    </div>)
  }
}

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({handleNoteClick},dispatch);
}

const mapStateToProps = (state)=>{
  // console.log(state);
  const {user} = state;
  return user;
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarItem);