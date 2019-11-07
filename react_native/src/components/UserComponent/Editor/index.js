// import React, { Component } from "react";
// import ReactQuill from "react-quill";
// import debounce from '../../../helpers';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

// import { updateEditorText} from "../../../actions/userActions";

// const toolbarOptions = ["bold"];

// class Editor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: "<div contenteditable='false'> Write your notes here </div>",
//       id:''
//     };
//   }

//   modules = {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image"]
//     ]
//   };

//   formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image"
//   ];
  
//   render() {
//     const {editorContent} = this.props;
//     console.log(editorContent);
//     return (
//       <div className='Editor'>
//       <ReactQuill
//         theme="snow"
//         modules={this.modules}
//         formats={this.formats}
//         value={editorContent}
//         onChange={(txt) => { setTimeout(()=>this.props.updateEditorText(txt),1) }}
//       >
//         <div className="my-editing-area" />
//       </ReactQuill>
//       </div>
//     );
//   }


//   // updateBody = async (txt) => {
//   //   await this.setState({ text: txt });
//   //   this.update();
//   // };

//   // update = debounce(() => {
//   //   // this.props.noteUpdate(this.state.id, {
//   //   //   body: this.state.text
//   //   // })
//   //   console.log("sending data to database");
//   // }, 1000);
// }

// const mapDispatchToProps = dispatch =>{
//   return (bindActionCreators({
//     updateEditorText
//   },dispatch));
// }

// const mapStateToProps = (state)=>{
//   const {user} = state;
//   return user;
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Editor);

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

import { updateEditorText, doneChanges} from "../../../actions/userActions";


const initHTML = `<br/>
<center><b>Pell.js Rich Editor</b></center>
<center>React Native</center>
<br/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png" ></br></br>
</br></br>
`;

class Editor extends Component {

  save = async (_id) => {
    // Get the data here and call the interface to save the data
    let html = await this.richText.getContentHtml();
    this.props.doneChanges(_id,html);
    // console.log(html);
  

    
  };

  // onPressAddImage = () => {
  //   // insert URL
  //   this.richText.insertImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png");
  //   // insert base64
  //   // this.richText.insertImage(`data:${image.mime};base64,${image.data}`);
  //   this.richText.blurContentEditor();
  // };

  onHome = () => {
    this.props.navigation.navigate('User');
  };

  render() {
    let that = this;
    const { selectedNoteId,editorContent} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.nav}>
          <Button title={'HOME'} onPress={that.onHome} />
          <Button title="Save" onPress={() => that.save(selectedNoteId)} />
        </View>

        <ScrollView style={styles.scroll}>
          <RichEditor
            ref={rf => that.richText = rf}
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
            iconTint={'#000033'}
            selectedIconTint={'#2095F2'}
            selectedButtonStyle={{ backgroundColor: "transparent" }}
            // onPressAddImage={that.onPressAddImage}
          />
        </KeyboardAvoidingView>

      </SafeAreaView>
    )
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
    doneChanges
  },dispatch));
}

const mapStateToProps = (state)=>{
  const {user} = state;
  return user;
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
