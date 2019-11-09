import React, { Component } from 'react';
import ContactList from './ContactList';
import { bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getContacts } from '../../../actions/userActions';
class Contact extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getContacts();
  }
  render(){
    // console.log(this.props.contacts)
    return(<ContactList/>)
  }
}

const mapDispatchToProps=(dispatch)=>{
  return (bindActionCreators({getContacts},dispatch))
}

const mapStateToProps=(state)=>{
  const {user} = state;
  return user;
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);