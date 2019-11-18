import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Button } from "react-native";
import {bindActionCreators} from 'redux';
import {connect } from 'react-redux';

import ContactItem from './ContactItem';
import ContactInput from './ContactInput';
import {
  addContact,
  handleContactClick,
  getContacts
} from "../../../actions/userActions";
class ContactList extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.getContacts();

  }
  render(){
    // console.log()
    const { props: { contacts, isContactEditing, selectedContactId, addContact, handleContactClick}} = this
    return (
      <ScrollView>
        {
          
          <View>
            <Button
              onPress={() => {
                this._addContact();
              }}
              title="New Contact"
            />
            {/* <TouchableOpacity
              onPress={() => {
                this._addContact();
              }}
            >
              <Text>Add Contact</Text>
            </TouchableOpacity> */}
            {contacts.length ? (
              contacts.map(contact => (
                <TouchableOpacity
                  key={contact._id}
                  onPress={() => {
                    this._handleContactClick(contact);
                  }}
                >
                  <ContactItem contact={contact} />
                </TouchableOpacity>
              ))
            ) : (
              <Text>Your contact list is empty add someone </Text>
            )}
          </View>
        }
      </ScrollView>
    );
  }
  _addContact =()=>{
    this.props.addContact();
    this.props.navigation.navigate('ContactInput')
  }
  _handleContactClick=(contact)=>{
    this.props.handleContactClick(contact);
    this.props.navigation.navigate('ContactInput');
  }
}

const mapDispatchToProps=(dispatch)=>{
  return(bindActionCreators({
    addContact,
    getContacts,
    handleContactClick
  },dispatch))
}
const mapStateToProps=(state)=>{
  const {user}=state;
  return user;
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);