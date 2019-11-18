import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ReminderCalendar from "./calender";
import ReminderInput from './reminderInput';
import ReminderList from './reminderlist';
const stackNavigator = createStackNavigator(
  {
    ReminderCalendar: {
      screen: ReminderCalendar,
      navigationOptions: {
        headerShown: false
      }
    },
    ReminderInput: {
      screen: ReminderInput,
      navigationOptions: {
        headerShown: false
      }
    },
    ReminderList: {
      screen: ReminderList,
      navigationOptions: {
        headerShown: false
      }
    }
  },
  {
    initialRouteName: "ReminderCalendar"
  }
);
const AppContainer = createAppContainer(stackNavigator);

const Reminder =()=>{
    return(<AppContainer/>)
}

export default Reminder;