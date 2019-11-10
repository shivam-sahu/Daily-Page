import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
// import IosContactOutline from 'react-ionicons/lib/IosContactOutline';


import Compo from './src/components';
import Login from './src/components/AuthComponents/Login';
import UserComponent from './src/components/UserComponent';
import Editor from './src/components/UserComponent/Editor'

import ContactInput from './src/components/UserComponent/Contacts/ContactInput';
import Contact from './src/components/UserComponent/Contacts'

import Icon from 'react-native-vector-icons/Ionicons'

const App = createBottomTabNavigator(
  {
    Compo:{screen:Compo,
    navigationOptions: {
      tabBarLabel: 'Compo'
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
  Contact:{screen:Contact,
    navigationOptions: {
      tabBarLabel: 'Contact',
      tabBarIcon: ({tintColor}) => (<Icon name="ios-contacts" color={tintColor} size={25}/>)
    }
  }
},
{
  initialRouteName:'Login',
  order: ['User', 'Contact', 'Compo', 'Login'],
  activeTintColor:'#eb6e3d'
}
)

export default createAppContainer(App);