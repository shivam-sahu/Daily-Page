import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators } from 'redux';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  TextInput,
  Button
} from "react-native";

import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from '../../backNavigator';

import {
  saveReminder,
  closeReminder,
  deleteReminder,
  handleDayPress,
  updateReminder
} from "../../../actions/userActions";
import { FlatHeader, Group } from "react-native-flat-header";
import Icon from 'react-native-vector-icons/Ionicons';

class ReminderInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      clicked: false,
      isoTime: ""
    };
  }
  componentDidMount() {
    this.props.selectedReminderId
      ? this.setState({
          text: this.props.selectedReminder.text,
          isoTime: new Date(this.props.selectedReminder.date).toISOString()
        })
      : this.setState({
          isoTime: new Date(this.props.seletedDate).toISOString()
        });
    handleAndroidBackButton(() => this._closeReminder());
  }
  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }
  render() {
    console.log(this.props.selectedReminder)
    return (
      <View>
        <FlatHeader
          leftIcon={<Icon name="ios-close" size={45} color="#1183ca" />}
          leftIconHandler={() => this._closeReminder()}
          rightIcon={
            this.props.selectedReminderId ? (
              <Icon name="ios-trash" size={30} color="#1183ca" />
            ) : null
          }
          rightIconHandler={() => this._deleteReminder()}
          centerContent={
            <Icon name="ios-checkmark" size={45} color="#1183ca" />
          }
          centerContentHandler={() => this._onSave()}
          // style={{ bacgroundColor: "#BA68C8" }}
          style={{ backgroundColor: "#F5FCFF" }}
        />

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
        <View style={{margin:10}}>
          <Text>{new Date(this.state.isoTime).toUTCString()}</Text>
        </View>
        <Button
          title="Set Time"
          onPress={() => {
            this.setState({ clicked: true });
          }}
        />
        {this.state.clicked ? (
          <RNDateTimePicker
            mode="time"
            value={new Date()}
            onChange={(event, date) => {
              this.setState({ clicked: false });
              // console.log(date);
              let tmp = new Date(date);
              let hours = tmp.getHours() + 5;
              let minutes = tmp.getMinutes() + 30;
              let prevTime = this.props.seletedDate;
              tmp = new Date(prevTime);
              let year = tmp.getFullYear();
              let dt = tmp.getDate();
              let month = tmp.getMonth();
              let newDate = new Date(year, month, dt, hours, minutes);
              this.setState({ isoTime: newDate.toISOString() });
              console.log(newDate.toISOString());
            }}
          />
        ) : null}
      </View>
    );
  }

  handleTextChange = value => {
    this.setState({
      text: value
    });
  };

  _closeReminder = async () => {
    await this.props.closeReminder();
    this.props.navigation.navigate("ReminderCalendar");
    this.props.handleDayPress(this.props.seletedDate);
  };

  _deleteReminder = async () => {
    await this.props.deleteReminder(this.props.selectedReminderId);
    this.props.navigation.navigate("ReminderCalendar");
    this.props.handleDayPress(this.props.seletedDate);
  };

  _onSave = async () => {
    const {
      props: {
        selectedReminder,
        selectedReminderId,
        seletedDate,
        updateReminder,
        saveReminder
      }
    } = this;
    selectedReminderId
      ? await updateReminder({...selectedReminder, date:this.state.isoTime,text:this.state.text})
      : await saveReminder(this.state.text, this.state.isoTime);

    this.props.navigation.navigate("ReminderCalendar");
    console.log(this.props.seletedDate);
    this.props.handleDayPress(this.props.seletedDate);
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveReminder,
      closeReminder,
      deleteReminder,
      handleDayPress,
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