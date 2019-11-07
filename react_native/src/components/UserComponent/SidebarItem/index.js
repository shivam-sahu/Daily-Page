import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {removeHTMLTags} from "../../../utils/helpers";
import Editor from '../Editor';


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
    // console.log(this.props.showEditor);
    const {showEditor} = this.props;
    return (
      // <TouchableOpacity onPress={() =>{ handleNoteClick(text, _id)} }>
        <View>
          <Text> {removeHTMLTags(text) + '...'}</Text>
        </View>
      // </TouchableOpacity>
    // <div className="SideBarItem" onClick={() => handleNoteClick(text, _id)}>
    //   {/* {removeHTMLTags(text.substring(0, 30)) + '...'} */}
    //   {removeHTMLTags(text)+ '...'}
    // </div>
    )
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