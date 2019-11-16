import React,{Component} from 'react';
import {Keyboard,TouchableOpacity, Text ,ScrollView, StyleSheet, View, TextInput} from 'react-native';
import {Calendar, Agenda} from 'react-native-calendars';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {handleDayPress} from '../../../actions/userActions';
import ReminderList from './reminderlist';
import ReminderInput from './reminderInput';
class ReminderCalendar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>

            { 
          this.props.isReminderEditing ?
            <ReminderInput />
            :
              <View>
              <Calendar
              markedDates={{
            '2019-11-16': {  marked: true, selectedColor: 'blue' },
            '2019-11-17': { marked: true },
            '2019-11-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
            '2019-11-19': { disabled: true, disableTouchEvent: true }
            }}
              // Initially visible month. Default = Date()
              current={Date.now()}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              minDate={'2018-01-01'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              maxDate={'2050-01-01'}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={(day) => { this.props.handleDayPress(day) }}
              // Handler which gets executed on day long press. Default = undefined
              // onDayLongPress={(day) => {console.log('selected day', day)}}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={'yyyy MM'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              // onMonthChange={(month) => {console.log('month changed', month)}}
              // Hide month navigation arrows. Default = false
              // hideArrows={true}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              // renderArrow={(direction) => (<Arrow />)}
              // Do not show days of other months in month page. Default = false
              hideExtraDays={true}
              // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              disableMonthChange={true}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={1}
              // Hide day names. Default = false
              // hideDayNames={true}
              // Show week numbers to the left. Default = false
              showWeekNumbers={true}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={substractMonth => substractMonth()}
              // Handler which gets executed when press arrow icon left. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
            />


              <ReminderList /></View>}
      
      </ScrollView>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return (bindActionCreators({
    handleDayPress,
  }, dispatch))
}
const mapStateToProps = (state) => {
  const { user } = state;
  return user;
}
export default connect(mapStateToProps, mapDispatchToProps)(ReminderCalendar);