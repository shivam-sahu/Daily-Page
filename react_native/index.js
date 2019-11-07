import React,{Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from "./src/store";

class MyApp extends Component{
  render(){
    return(<Provider store={store}>
      <App/>
    </Provider>)
  }
}

AppRegistry.registerComponent(appName, () => MyApp);
