import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card} from 'react-native-elements'

class ReminderItem extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    // console.log(this.props)
    const { props: {reminder:{text,date}} } = this;
    let newdate = new Date(date) ;
    let newDate = new Date(newdate - (330*60000)); 
    newdate= newDate.toTimeString();
    newdate = newdate.substring(0,5)+" "+newdate.substring(9,12);
    console.log(this.props.reminder)
    return (
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
          justifyContent:"space-between",
          flexDirection:"row",
          position:"relative"
        }}
      >
        <Text>{`${text}`}</Text>
        <Text>{`${newdate}`}</Text>
      </Card>
    );
  }
}
export default ReminderItem; 