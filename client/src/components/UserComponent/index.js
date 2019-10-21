import React, { Component } from 'react';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import Editor from './Editor';
import Sidebar from './Sidebar';

import {setInitalState} from '../../actions/userActions'; 

class User extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.setInitalState(this.props.auth.user);
    console.log(this.props.user.showEditor);
  }
  
  render(){
  return(<div>
    <Sidebar/>
    {
      this.props.user.showEditor ? <Editor />: null
    }
  </div>)}
}

const mapDispatchToProps = dispatch=>{
  return(bindActionCreators({
    setInitalState
  },dispatch));
}
const mapStateToProps = (state)=>{
  const {user , auth} = state;
  return {user,auth};
}

export default connect(mapStateToProps, mapDispatchToProps)(User);