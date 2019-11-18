import React, { Component } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from '../../backNavigator';

import {
  updateEditorText,
  doneChanges,
  deleteNotes,
  closeEditor,
  getData
} from "../../../actions/userActions"
import { FlatHeader, Group } from "react-native-flat-header";
import Icon from "react-native-vector-icons/Ionicons";

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    handleAndroidBackButton(()=>this.onHome())
  }
  
  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }
  save = async _id => {
    let html = await this.richText.getContentHtml();
    await this.props.doneChanges(_id, html);
    await this.props.getData();
    this.props.navigation.navigate("Sidebar");
  };

  onHome = () => {
    this.props.closeEditor();
    this.props.navigation.navigate("Sidebar");
  };

  _onDelete = async () => {
    await this.props.deleteNotes(this.props.selectedNoteId);
    await this.props.getData();
    this.props.navigation.navigate("Sidebar");
  };

  render() {
    let that = this;
    const { selectedNoteId, editorContent } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.nav}>
          <Button title={"HOME"} onPress={that.onHome} />
          <Button title="Save" onPress={() => that.save(selectedNoteId)} />
          <Button title="Delete" onPress={() => that._onDelete()} />
        </View> */}

        <FlatHeader
          leftIcon={<Icon name="ios-close" size={45} color="#1183ca" />}
          leftIconHandler={() => this.onHome()}
          rightIcon={
            this.props.selectedNoteId ? (
              <Icon name="ios-trash" size={30} color="#1183ca" />
            ) : null
          }
          rightIconHandler={() => this._onDelete()}
          centerContent={
            <Icon name="ios-checkmark" size={45} color="#1183ca" />
          }
          centerContentHandler={() => this.save(selectedNoteId)}
          // style={{ bacgroundColor: "#BA68C8" }}
          style={{ backgroundColor: "#F5FCFF" }}
        />

        <ScrollView style={styles.scroll}>
          <RichEditor
            ref={rf => (that.richText = rf)}
            initialContentHTML={editorContent}
            style={styles.rich}
          />
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <RichToolbar
            style={styles.richBar}
            getEditor={() => that.richText}
            iconTint={"#000033"}
            selectedIconTint={"#2095F2"}
            selectedButtonStyle={{ backgroundColor: "transparent" }}
            // onPressAddImage={that.onPressAddImage}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 300,
    flex: 1
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF',
    marginBottom: 0

  },
  scroll: {
    backgroundColor: '#ffffff'
  }
});


// export default Editor;
const mapDispatchToProps = dispatch =>{
  return (bindActionCreators({
    updateEditorText,
    doneChanges,
    deleteNotes,
    closeEditor,
    getData
  },dispatch));
}

const mapStateToProps = (state)=>{
  const {user} = state;
  return user;
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
