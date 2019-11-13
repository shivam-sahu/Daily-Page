import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ReminderItem extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    // console.log(this.props)
    const { props: {text} } = this
    return (<View>
      <Text>{`${text}`}</Text>
    </View>)
  }
}
export default ReminderItem; 