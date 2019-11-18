import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { Card } from "react-native-elements";

class ContactItem extends Component{
  constructor(props){
    super(props)

  }
  render(){
    // console.log(this.props)
    const {props:{contact:{name, email,mobile}}} = this
    return(<View>
      <Card
        containerStyle={{
          borderRadius: 10,
          borderWidth: 2,
          borderColor: "#39CCCC",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 1,
          marginLeft: 5,
          marginRight: 5,
          marginTop: 10,
          justifyContent:"flex-start",
          flexDirection:"column",
          position:"relative"
        }}
      >
    <Text style={{fontWeight:'bold',fontSize:20}}>{`${name}`}</Text>
    <Text>Email:{`${email}`}</Text>
    <Text>mobile:{`${mobile[0]}`}</Text>
    </Card>
    </View>)
  }
}
export default ContactItem; 