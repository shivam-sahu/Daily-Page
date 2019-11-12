import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReminderInput from './reminderInput';
import {addReminder,handleReminderClick} from '../../../actions/userActions';

data=[
  {text:'1st reminder',
  user:'shivam',
  date:'somei'
}

]
class ReminderList extends Component{
  constructor(props){
    super(props);
    this.state={
  
    }
  }
  render(){
    const { props: { reminders, isReminderEditing, selectedReminderId, addReminder, handleReminderClick} } = this
    return (<ScrollView>
      {
        isReminderEditing ?
          <View>
            <ReminderInput />
          </View>
          :
          <View>
            <TouchableOpacity onPress={() => { addReminder() }}>
              <Text>Add Reminder</Text>
            </TouchableOpacity>
            {
              reminders.length ?
                reminders.map((reminder) =>
                  <TouchableOpacity key={reminder._id} onPress={() => { handleReminderClick(reminder) }}>
                    <ContactItem reminder={reminder} />
                  </TouchableOpacity>
                )
                :
                <Text>No reminders for this date</Text>
            }
          </View>

      }
    </ScrollView>)
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