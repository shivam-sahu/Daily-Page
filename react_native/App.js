import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
 
import Compo from './src/components';
import Login from './src/components/AuthComponents/Login';
import UserComponent from './src/components/UserComponent';
import Editor from './src/components/UserComponent/Editor';

import ContactInput from './src/components/UserComponent/Contacts/ContactInput';
import Contact from './src/components/UserComponent/Contacts';

import ReminderCalendar from './src/components/UserComponent/Calendar/index';
import ReminderList from './src/components/UserComponent/Calendar/reminderlist';

import Icon from 'react-native-vector-icons/Ionicons'

const App = createBottomTabNavigator(
  {
    Compo:{screen:Compo,
    navigationOptions: {
      tabBarLabel: 'Compo',
      tabBarIcon: ({ tintColor }) => (<Icon name="ios-calendar" color={tintColor} size={25} />)
    }
  },
  Login:{screen:Login,
    navigationOptions: {
      tabBarLabel: 'Login',
      tabBarIcon: ({ tintColor }) => (<Icon name="ios-log-out" color={tintColor} size={25} />)
    }
  },
  User:{screen:UserComponent,
    navigationOptions:{
      tabBarLabel:'Notes',
      tabBarIcon: ({ tintColor }) => (<Icon name="ios-paper" color={tintColor} size={25} />)
    }
  },
  Editor:{screen:Editor},
  ContactInput: { screen: ContactInput},
  ReminderList:{screen:ReminderList},
  Contact:{screen:Contact,
    navigationOptions: {
      tabBarLabel: 'Contacts',
      tabBarIcon: ({ tintColor }) => (<Icon name="ios-contact" color={tintColor} size={25} />)
    }
  },
  ReminderCalendar:{screen:ReminderCalendar,
    navigationOptions: {
      tabBarLabel: 'Reminders',
      tabBarIcon: ({ tintColor }) => (<Icon name="ios-calendar" color={tintColor} size={25} />)
    }
  }
},
{
  initialRouteName:'ReminderCalendar',
  order: ['User', 'Contact', 'ReminderCalendar', 'Login'],
  tabBarOptions:{
    activeTintColor:'#1e90ff'
  }
}
)

export default createAppContainer(App);