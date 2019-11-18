import React, { Component } from 'react';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { getData} from '../../actions/userActions';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import Sidebar from './Sidebar';
import Editor from './Editor';
const stackNavigator = createStackNavigator(
  {
    Sidebar: {
      screen: Sidebar,
      navigationOptions: {
        headerShown: false
      }
    },
    Editor: {
      screen: Editor,
      navigationOptions: {
        headerShown: false
      }
    }
  },
  {
    initialRouteName: "Sidebar"
  }
);
const AppContainer = createAppContainer(stackNavigator);


const User =()=>{
  return(<AppContainer/>)
}
// class User extends Component{

//   constructor(props){
//     super(props);
//   }
//   componentDidMount(){
//     this.props.getData()
//   }
//   render(){
//     return (  
//      <AppContainer/>
//     // <Sidebar/>
//     )}
// }

// const mapDispatchToProps = dispatch=>{
//   return(bindActionCreators({
//     getData
//   },dispatch));
// }
// const mapStateToProps = (state)=>{
//   const {user , auth} = state;
//   return {user,auth};
// }

// export default connect(mapStateToProps, mapDispatchToProps)(User);
export default User;