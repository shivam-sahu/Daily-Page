import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 
import { Button, ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import SiderbarItem from '../SidebarItem';
import { addEditor, doneChanges,getData, handleNoteClick} from '../../../actions/userActions';
import { Header } from 'react-native-elements';

class Sidebar extends Component{
  constructor(props){
    super(props);
    this.state={
      id:'',
      notes:'',
      addingNote:false
    }
  }

  componentDidMount(){
    this.props.getData();
  }

  render(){
    const data = this.props.notes;
    const { showEditor, handleNoteClick} = this.props;
    return (<View>
      <View style = {styles.header}>

      <Header
        // leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Notes', style: { color: '#fff'  } }}
        // rightComponent={{ icon: 'home', color: '#fff' }}
        backgroundColor='#1e90ff'
        />
        </View>
      <ScrollView>
        <Button
          onPress={() => this.props.addEditor(this.props.initialContent)}
          title="New Note" />
        <View>
          {
            showEditor ?
              // <Editor />
              this.props.navigation.navigate('Editor')
              :
              data ?
                data.map((note) => {
                  return (<TouchableOpacity key={note._id} onPress={() => handleNoteClick(note.text, note._id)}>
                    <SiderbarItem text={note.text} _id={note._id.toString()} />
                  </TouchableOpacity>
                  )
                })
                : null
          }
        </View>
      </ScrollView>
    </View>
  )}
}

const mapDispatchToProps = dispatch=>{

  return (bindActionCreators({
    addEditor,
    doneChanges,
    getData,
    handleNoteClick
  },dispatch));
}
const mapStateToProps = (state)=>{
  const {user} = state;
  return user;
}

const styles = StyleSheet.create({
  header:{
    height:10,
    marginBottom:50,
    paddingTop:0
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);