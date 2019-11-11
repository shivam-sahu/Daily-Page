import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 
import { Button, ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import SiderbarItem from '../SidebarItem';
import { addEditor, doneChanges, handleNoteClick} from '../../../actions/userActions';
import Editor  from '../Editor';
import { Header } from 'react-native-elements';
// import { Icon } from 'react-native-elements';

class Sidebar extends Component{
  constructor(props){
    super(props);
    this.state={
      id:'',
      notes:'',
      addingNote:false
    }
  }

  render(){
    const data = this.props.notes;
    const { showEditor, handleNoteClick} = this.props;
    // console.log(this.props.navigation)
    return (<View>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Notes', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        backgroundColor='#1e90ff'
      />
      <ScrollView>
        <Button
          onPress={() => this.props.addEditor(this.props.initialContent)}
          title="New Note" />
        <View>
          {
            showEditor ?
              <Editor />
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
      
    // <div className="SideBar">
    //   <button type='button' onClick={() => this.props.addEditor(this.props.initialContent)}>
    //     New Note
    //   </button>
    //   <button onClick={() => this.props.doneChanges(this.props.selectedNoteId, this.props.editorContent)}>Done</button>
      // {
      //   data?
      //   data.map((note)=>{
      //     // console.log(note._id.toString())
      //     return (<SiderbarItem text={note.text} key={note._id} _id = {note._id.toString()}/>)
      //   })
      //   :null
      // }
    // </div>
  )}
}

const mapDispatchToProps = dispatch=>{

  return (bindActionCreators({
    addEditor,
    doneChanges,
    handleNoteClick
  },dispatch));
}
const mapStateToProps = (state)=>{

  // console.log(state);
  const {user} = state;
  return user;
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);