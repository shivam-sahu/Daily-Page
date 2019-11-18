import React,{Component} from 'react';
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import NavigationService from './NavigationService';
//? importing screens
import Login from './src/components/AuthComponents/Login';
import UserComponent from './src/components/UserComponent';
import Contact from './src/components/UserComponent/Contacts';
import Reminder from "./src/components/UserComponent/Calendar";

import Icon from 'react-native-vector-icons/Ionicons'


const TopLevelNavigator = createBottomTabNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        tabBarLabel: "Login",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-log-out" color={tintColor} size={25} />
        )
      }
    },
    User: {
      screen: UserComponent,
      navigationOptions: {
        tabBarLabel: "Notes",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-paper" color={tintColor} size={25} />
        )
      }
    },
    Contact: {
      screen: Contact,
      navigationOptions: {
        tabBarLabel: "Contacts",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-contact" color={tintColor} size={25} />
        )
      }
    },
    Reminder: {
      screen: Reminder,
      navigationOptions: {
        tabBarLabel: "Reminders",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-calendar" color={tintColor} size={25} />
        )
      }
    }
  },
  {
    initialRouteName: "Reminder",
    order: ["User", "Contact", "Reminder", "Login"],
    backBehavior: "history",
    lazy: false,
    tabBarOptions: {
      activeTintColor: "#1e90ff"
    }
  }
);


const AppContainer = createAppContainer(TopLevelNavigator);


class App extends Component{
  render(){
    return(<AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />)
  }
}
export default App;