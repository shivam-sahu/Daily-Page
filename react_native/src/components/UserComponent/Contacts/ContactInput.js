import React,{Component} from 'react'
import {Keyboard,TouchableOpacity, Text ,ScrollView, StyleSheet, View, TextInput} from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators } from 'redux';
import { saveContacts, updateContact, deleteContact,getContacts, closeContact} from '../../../actions/userActions';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from '../../backNavigator';
import { FlatHeader, Group } from "react-native-flat-header";
class ContactInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      firstMobile: "",
      secondMobile: ""
    };
  }
  componentDidMount() {
    const {
      props: { selectedContact: data }
    } = this;
    data
      ? this.setState({
          email: data.email,
          name: data.name,
          firstMobile: data.mobile[0],
          secondMobile: data.mobile[1]
        })
      : null;

    handleAndroidBackButton(() => {
      this._closeContact();
    });
  }
  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }
  render() {
    return (
      <ScrollView>
        <View>
          <FlatHeader
            leftIcon={<Icon name="ios-close" size={45} color="#1183ca" />}
            leftIconHandler={() => this._closeContact()}
            rightIcon={
              this.props.selectedContactId ? (
                <Icon name="ios-trash" size={30} color="#1183ca" />
              ) : null
            }
            rightIconHandler={() => this._deleteContact()}
            centerContent={
              <Icon name="ios-checkmark" size={45} color="#1183ca" />
            }
            centerContentHandler={() => this.onSave()}
            // style={{ bacgroundColor: "#BA68C8" }}
            style={{ backgroundColor: "#F5FCFF" }}
          />

          {/* <TouchableOpacity onPress={() => this._closeContact()}>
            <Icon name="ios-close" size={45} />
          </TouchableOpacity>
          {this.props.selectedContactId ? (
            <TouchableOpacity onPress={() => this._deleteContact()}>
              <Icon name="ios-trash" size={30} />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity onPress={() => this.onSave()}>
            <Icon name="ios-checkmark" size={45} />
          </TouchableOpacity> */}
        </View>

        <View>
          <TextInput
            placeholder="Name"
            // defaultValue={data.name ? data.name:''}
            value={this.state.name}
            autoFocus={true}
            blurOnSubmit={true}
            onChangeText={name => {
              this.setState({ name });
            }}
          />
        </View>
        <View>
          <View>
            <TextInput
              placeholder="Contact Number 1"
              // defaultValue={mobileNos[0]}
              value={this.state.firstMobile}
              blurOnSubmit={true}
              keyboardType='phone-pad'
              onChangeText={value => {
                this.setState({ firstMobile: value });
              }}
            />
          </View>
          <View>
            <TextInput
              placeholder="Contact Number 1"
              // defaultValue={mobileNos[1]}
              value={this.state.secondMobile}
              blurOnSubmit={true}
              keyboardType='phone-pad'
              onChangeText={value => {
                this.setState({ secondMobile: value });
              }}
            />
          </View>
        </View> 
        <View>
          <TextInput
            placeholder="Email"
            // defaultValue={data.email ? data.email : ''}
            value={this.state.email}
            blurOnSubmit={true}
            keyboardType='email-address'
            onChangeText={email => {
              this.setState({ email });
            }}
          />
        </View>
      </ScrollView>
    );
  }

  onSave =async () => {
    const {
      props: { selectedContactId }
    } = this;
    const { name, email, firstMobile, secondMobile } = this.state;
    const mobileNos = [firstMobile, secondMobile];
    const contacts = {
      contactID: selectedContactId,
      name,
      email,
      mobile: mobileNos
    };
    selectedContactId
      ?await this.props.updateContact(contacts)
      :await this.props.saveContacts(contacts);

      await this.props.getContacts();
      this.props.navigation.navigate('ContactList')
  };

  _closeContact = ()=>{
    this.props.closeContact();
    this.props.navigation.navigate('ContactList');
  }

  _deleteContact=async ()=>{
    await this.props.deleteContact(this.props.selectedContactId);
    await this.props.getContacts();
    this.props.navigation.navigate('ContactList');
  }

}

const mapDispatchToProps = (dispatch)=>{
  return(bindActionCreators({
    deleteContact, 
    closeContact,
    getContacts,
    saveContacts,
    updateContact
  },dispatch)
)}

const mapStateToProps =(state)=>{
  const {user} = state;
  return user;
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactInput);
