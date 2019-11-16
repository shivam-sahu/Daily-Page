import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableHighlightBase
} from "react-native";

import { saveReminder, closeReminder, deleteReminder, updateReminder} from '../../../actions/userActions';
import Icon from 'react-native-vector-icons/Ionicons';


class ReminderInput extends Component{
  constructor(props){
    super(props);
    this.state={
      text:''
    }
  }
componentDidMount(){
  this.props.selectedReminderId ?
    this.setState({ text: this.props.selectedReminder.text})
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
    saveReminder(this.state.text,seletedDate)

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