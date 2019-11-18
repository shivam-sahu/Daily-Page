import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReminderInput from './reminderInput';
import ReminderItem from './reminderItem';
import {addReminder,handleReminderClick} from '../../../actions/userActions';
import Icon from "react-native-vector-icons/Ionicons";

class ReminderList extends Component{
  constructor(props){
    super(props);

  }
  render(){
    const { props: { reminders, isReminderEditing, selectedReminderId, addReminder, handleReminderClick} } = this
    return (
      <ScrollView>
        {
          <View>
            <TouchableOpacity
              onPress={() => {
                this._addReminder();
              }}
              style={
                {
                  // position: "absolute",
                  // alignSelf: "center",
                  // bottom: "-5%"
                  // position: "absolute",
                  marginLeft: 10,
                  marginTop:10,
                  elevation:1
                  // marginBottom: 20
                }
              }
            >
              <Icon name="ios-add-circle" size={55} color="#00a2db" />
            </TouchableOpacity>
            {reminders.length
              ? reminders.map(reminder => (
                  <TouchableOpacity
                    key={reminder._id}
                    onPress={() => {
                      this._handleReminderClick(reminder);
                    }}
                  >
                    <ReminderItem reminder={reminder} />
                  </TouchableOpacity>
                ))
              : null}
          </View>
        }
      </ScrollView>
    );
  }
  _addReminder =()=>{
    this.props.addReminder();
    this.props.navigateToInput();
  }
  _handleReminderClick=(reminder)=>{
    this.props.handleReminderClick(reminder);
    this.props.navigateToInput();
  }
}

const mapDispatchToProps = (dispatch) => {
  return (bindActionCreators({
    addReminder,
    handleReminderClick
  }, dispatch))
}
const mapStateToProps = (state) => {
  const { user } = state;
  return user;
}
export default connect(mapStateToProps, mapDispatchToProps)(ReminderList);