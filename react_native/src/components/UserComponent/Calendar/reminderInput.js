import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableHighlightBase,
  Button
} from "react-native";

import { saveReminder, closeReminder, deleteReminder, updateReminder} from '../../../actions/userActions';
import Icon from 'react-native-vector-icons/Ionicons';
// import { Button } from 'react-native-paper';


class ReminderInput extends Component{
  constructor(props){
    super(props);
    this.state={
      text:'',
      clicked : false,
      isoTime : ""
    }
  }
componentDidMount(){
  this.props.selectedReminderId ?
    this.setState({ text: this.props.selectedReminder.text, isoTime: new Date(this.props.seletedDate).toISOString()})
  :
  null
}
  render(){
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.closeReminder()}
        >
        <Icon name="ios-close" size={45} />
        </TouchableOpacity>
        {
        this.props.selectedReminderId ?
            <TouchableOpacity
              onPress={() => this.props.deleteReminder(this.props.selectedReminderId)}
            >
              <Icon name="ios-trash" size={30} />
            </TouchableOpacity> :
            null
        }
        

        <TouchableOpacity
          onPress={() => this.props.saveReminder(
            this.state.text,
            this.props.seletedDate
            )}
        >
          <Icon name="ios-checkmark" size={45} />
        </TouchableOpacity>
        
        <TextInput
          value={this.state.text}
          onChangeText={e => {
            this.handleTextChange(e);
          }}
          underlineColorAndroid="#428AF8"
          placeholder="Add Reminder"
          multiline={true}
          autoFocus={true}
        />
        <View> 
        <Text>{new Date(this.state.isoTime).toUTCString()}</Text>
        </View>
        <Button title="Set Time" onPress = {() => {this.setState({clicked:true})}} />
      {this.state.clicked ? 
      <RNDateTimePicker mode="time" value={new Date()} onChange = {
        (event, date) => {
          this.setState({clicked : false});
          // console.log(date);
          let tmp = new Date(date);
          let hours = tmp.getHours() + 5;
          let minutes = tmp.getMinutes() + 30;
          let prevTime = this.props.seletedDate;
          tmp = new Date(prevTime);
          let year = tmp.getFullYear();
          let dt = tmp.getDate()
          let month = tmp.getMonth();
          let newDate = new Date(year, month,dt, hours, minutes);
          this.setState({isoTime:newDate.toISOString()});
          console.log(newDate.toISOString());

        }
      } /> 
      : null}   
      </View>
    );
  }
  handleTextChange=(value)=>{
    this.setState({
      text:value
    })
  }

  _onSave = ()=>{
    const { props: { selectedReminder,selectedReminderId, seletedDate, updateReminder, saveReminder}} =this;
    selectedReminderId ? 
    updateReminder(selectedReminder)
    :
    saveReminder(this.state.text,this.state.isoTime);

  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveReminder,
      closeReminder,
      deleteReminder,
      updateReminder
    },
    dispatch
  );
};

const mapStateToProps = state => {
  const { user } = state;
  return user;
};
export default connect(mapStateToProps, mapDispatchToProps)(ReminderInput);