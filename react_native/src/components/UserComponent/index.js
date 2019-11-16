import React, { Component } from 'react';
import { View, ScrollView, Text} from 'react-native';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { getData} from '../../actions/userActions';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import Sidebar from './Sidebar';
import Editor from './Editor';
const stackNavigator = createStackNavigator(
  {
    Sidebar: { screen: Sidebar,
       navigationOptions:{
         headerShown:false
       } },
    Editor: { screen: Editor }
  },
  {
    initialRouteName: "Sidebar",
  }
);
const AppContainer = createAppContainer(stackNavigator);

class User extends Component{

  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.getData(this.props.auth.user)
  }
  render(){
    return (  
     <AppContainer/>
    
    )}
}

const mapDispatchToProps = dispatch=>{
  return(bindActionCreators({
    getData
  },dispatch));
}
const mapStateToProps = (state)=>{
  const {user , auth} = state;
  return {user,auth};
}

export default connect(mapStateToProps, mapDispatchToProps)(User);