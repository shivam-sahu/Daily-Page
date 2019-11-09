import React from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity, Keyboard, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { loginUser} from '../../actions/authActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "username": "", "password": "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('jwtToken')
      if (value !== null) {
        // console.log(value)
      }
    } catch (e) {
      // error reading value
      throw (e)
    }
  }

  storeData = async (token) => {
    try {
      await AsyncStorage.setItem('jwtToken', token)
    } catch (e) {
      console.log("error : ", e)
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    Keyboard.dismiss();
    const username = this.state.username;
    const password = this.state.password;
    const userData = { username, password };
    // console.log(userData);
    this.props.loginUser(userData)
      .then(() => { this.props.navigation.navigate('Contact');})
    
  }

  render() {
    return (

      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder='Username'
            // onBlur={Keyboard.dismiss}
            value={this.state.username}
            autoCapitalize='none'
            autoCompleteType='username'
            autoFocus={true}
            blurOnSubmit={true}
            onChangeText={(text) => {
              this.setState({ "username": text });
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder='Password'
            autoCompleteType='password'
            // onBlur={Keyboard.dismiss}
            value={this.state.password}
            blurOnSubmit={true}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ "password": text });
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={this.handleSubmit}
          >
            <Text style={styles.saveButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
});

const mapStateToProps = (state) => ({
  authState: state.auth,
  error: state.errors
});

const mapDispatchToProps = (dispatch)=>{
  return(bindActionCreators({
    loginUser
  },dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps )(Login);
