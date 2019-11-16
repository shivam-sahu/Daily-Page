import React,{Component} from 'react'
import {Keyboard,TouchableOpacity, Text ,ScrollView, StyleSheet, View, TextInput} from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators } from 'redux';
import { saveContacts, updateContact, deleteContact, closeContact} from '../../../actions/userActions';
import Icon from 'react-native-vector-icons/Ionicons';
class  ContactInput extends Component {
  constructor(props){
    super(props);
    this.state= {
      email:'',
      name:'',
      firstMobile:'',
      secondMobile:''
    }
  }
  componentDidMount(){
    const {props: { selectedContact: data}} = this;
    data ?
    this.setState({
      email:data.email,
      name:data.name,
      firstMobile:data.mobile[0],
      secondMobile:data.mobile[1]
    }) :
    null
  }
  render(){
    // console.log(this.props);
    return(
    <ScrollView>
      <View>

          <TouchableOpacity
            onPress={() => this.props.closeContact()}
          >
            <Icon name="ios-close" size={45} />
          </TouchableOpacity>
          {
            this.props.selectedContactId ?
              <TouchableOpacity
                onPress={() => this.props.deleteContact(this.props.selectedContactId)}
              >
                <Icon name="ios-trash" size={30} />
              </TouchableOpacity> :
              null
          }


          <TouchableOpacity
            onPress={() => this.onSave()}>
            <Icon name="ios-checkmark" size={45} />
          </TouchableOpacity>



        {/* <TouchableOpacity>
          <Text>Disgard</Text>
        </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={() => this.onSave()}>
            <Text>Save</Text>
        </TouchableOpacity> */}
      </View>
    
      <View>
        <TextInput 
        placeholder='Name'
        // defaultValue={data.name ? data.name:''}
        value={this.state.name}
        autoFocus={true}
        blurOnSubmit={true}
        onChangeText={(name)=>{
          this.setState({name})
        }}
        />
      </View>
      <View>
        <View>
          <TextInput 
          placeholder='Contact Number 1'
          // defaultValue={mobileNos[0]}
          value={this.state.firstMobile}
          blurOnSubmit={true}
          onChangeText={(value)=>{
            this.setState({firstMobile:value})
          }}
          />
        </View>
          <View>
            <TextInput
              placeholder='Contact Number 1'
              // defaultValue={mobileNos[1]}
              value={this.state.secondMobile}
              blurOnSubmit={true}
              onChangeText={(value) => {
                this.setState({ secondMobile: value })
              }}
            />
          </View>
      </View>
      <View>
        <TextInput 
        placeholder='Email'
        // defaultValue={data.email ? data.email : ''}
        value={this.state.email}
        blurOnSubmit={true}
        onChangeText={(email)=>{
          this.setState({email})
        }}
        />
      </View>
    </ScrollView>)
  }

  onSave = ()=>{
    const { props: { selectedContactId } } = this;
    const {name,email,firstMobile,secondMobile} = this.state;
    const mobileNos = [firstMobile,secondMobile];
    const contacts={
      contactID:selectedContactId,
      name,
      email,
      mobile:mobileNos
    }
    selectedContactId ? 
    this.props.updateContact(contacts)
    :
    this.props.saveContacts(contacts)
    
  }
  onDisgard=()=>{
    console.log('disgard changes')
  }
}

const mapDispatchToProps = (dispatch)=>{
  return(bindActionCreators({
    deleteContact, 
    closeContact,
    saveContacts,
    updateContact
  },dispatch)
)}

const mapStateToProps =(state)=>{
  const {user} = state;
  return user;
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactInput);
