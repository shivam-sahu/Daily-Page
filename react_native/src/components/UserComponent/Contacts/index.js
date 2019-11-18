import React, { Component } from 'react';
import { bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getContacts } from '../../../actions/userActions';

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import ContactList from './ContactList';
import ContactInput from "./ContactInput";

const stackNavigator = createStackNavigator(
  {
    ContactList: {
      screen: ContactList,
      navigationOptions: {
        headerShown: false
      }
    },
    ContactInput: {
      screen: ContactInput,
      navigationOptions: {
        headerShown: false
      }
    }
  },
  {
    initialRouteName: "ContactList"
  }
);
const AppContainer = createAppContainer(stackNavigator);


const Contact =()=>{
  return(<AppContainer/>)
}
// class Contact extends Component{
//   constructor(props){
//     super(props);
//   }
//   componentDidMount() {
//     console.log("this ran....")
//     this.props.getContacts();

//   }
//   render(){

//     return <AppContainer />;
//     // return (<ContactList/>);
//   }  
//     // console.log(this.props.contacts)
  
// }

// const mapDispatchToProps=(dispatch)=>{
//   return (bindActionCreators({getContacts},dispatch))
// }

// const mapStateToProps=(state)=>{
//   const {user} = state;
//   return user;
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Contact);
export default Contact;