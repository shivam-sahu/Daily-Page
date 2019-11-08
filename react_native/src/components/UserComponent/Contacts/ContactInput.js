import React,{Component} from 'react'
import {Keyboard,TouchableOpacity, Text ,ScrollView, StyleSheet, View, TextInput} from 'react-native';

class  ContactInput extends Component {
  constructor(props){
    super(props);
    this.state= {
      email:'',
      name:'',
      firstMobile:'',
      secondMobile:'',
      mobileNos:[''],
      showTextField:false
    }
  }
  render(){
    const {state:{mobileNos}} = this;
    // console.log(this.state.mobile)
    return(
    <ScrollView>
      <View>
        <TouchableOpacity>
          <Text>Disgard</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text>Save</Text>
        </TouchableOpacity>
      </View>
    
      <View>
        <TextInput 
        placeholder='Name'
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
          defaultValue={mobileNos[0]}
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
              defaultValue={mobileNos[1]}
              value={this.state.secondMobile}
              blurOnSubmit={true}
              onChangeText={(value) => {
                this.setState({ secondMobile: value })
              }}
            />
          </View>
      </View>
      <TouchableOpacity onPress={()=>this.addContactInput()}>
        <Text>Add More numbers...</Text>
      </TouchableOpacity>
      <View>
        <TextInput 
        placeholder='Email'
        value={this.state.email}
        blurOnSubmit={true}
        onChangeText={(email)=>{
          this.setState({email})
        }}
        />
      </View>
    </ScrollView>)
  }

  onSave=()=>{
    const {name,email,firstMobile,secondMobile} = this.state;
    const mobileNos = [firstMobile,secondMobile];
    const obj={
      name,
      email,
      mobileNos
    }
  }
  onDisgard=()=>{
    console.log('disgard changes')
  }
}

export default ContactInput;
