import React, { Component } from 'react';
import {View,Text} from 'react-native';

class ContactItem extends Component{
  constructor(props){
    super(props)

  }
  render(){
    // console.log(this.props)
    const {props:{contact:{name, email,mobile}}} = this
    return(<View>
    <Text>{`${name}`}</Text>
    <Text>Email:{`${email}`}</Text>
    <Text>mobile:{`${mobile[0]}`}</Text>
    </View>)
  }
}
export default ContactItem; 