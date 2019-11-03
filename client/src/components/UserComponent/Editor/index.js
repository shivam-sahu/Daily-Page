import React, { Component } from "react";
import ReactQuill from "react-quill";
import debounce from '../../../helpers';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { updateEditorText} from "../../../actions/userActions";

const toolbarOptions = ["bold"];

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "<div contenteditable='false'> Write your notes here </div>",
      id:''
    };
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"]
    ]
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
  ];
  
  render() {
    const {editorContent} = this.props;
    console.log(editorContent);
    return (
      <div className='Editor'>
      <ReactQuill
        theme="snow"
        modules={this.modules}
        formats={this.formats}
        value={editorContent}
        onChange={(txt) => { setTimeout(()=>this.props.updateEditorText(txt),1) }}
      >
        <div className="my-editing-area" />
      </ReactQuill>
      </div>
    );
  }


  // updateBody = async (txt) => {
  //   await this.setState({ text: txt });
  //   this.update();
  // };

  // update = debounce(() => {
  //   // this.props.noteUpdate(this.state.id, {
  //   //   body: this.state.text
  //   // })
  //   console.log("sending data to database");
  // }, 1000);
}

const mapDispatchToProps = dispatch =>{
  return (bindActionCreators({
    updateEditorText
  },dispatch));
}

const mapStateToProps = (state)=>{
  const {user} = state;
  return user;
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
