import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card} from 'react-native-elements'

class ReminderItem extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    // console.log(this.props)
    const { props: {reminder:{text}} } = this;
    console.log(this.props.reminder)
    return (<Card>
      <Text>{`${text}`}</Text>
    </Card>)
  }
}
export default ReminderItem; 