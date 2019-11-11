import React, { Component } from 'react';
import {View,Text, ScrollView, TouchableOpacity} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect } from 'react-redux';

import ContactItem from './ContactItem';
import ContactInput from './ContactInput';
import { addContact, handleContactClick} from '../../../actions/userActions';
class ContactList extends Component{
  constructor(props){
    super(props);
    
  }
  render(){
    const { props: { contacts, isContactEditing, selectedContactId, addContact, handleContactClick}} = this
    return(<ScrollView>
      {
        isContactEditing ? 
        <View>
          <ContactInput />
        </View> 
        :
        <View>
            <TouchableOpacity onPress={() => { addContact() }}>
              <Text>Add Contact</Text>
            </TouchableOpacity>
        {
          contacts.length ?
            contacts.map((contact) =>
              <TouchableOpacity key={contact._id} onPress={() => { handleContactClick(contact)}}>
                <ContactItem contact={contact} />
              </TouchableOpacity>
            )
            :
            <Text>Your contact list is empty add someone </Text>
        }
        </View>

      }
    </ScrollView>)
  }
}

const mapDispatchToProps=(dispatch)=>{
  return(bindActionCreators({
    addContact,
    handleContactClick
  },dispatch))
}
const mapStateToProps=(state)=>{
  const {user}=state;
  return user;
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);