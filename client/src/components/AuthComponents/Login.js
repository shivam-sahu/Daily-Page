import React from "react";
// import ReactDOM from "react-dom";
import {connect} from "react-redux";
import { loginUser } from "../../actions/authActions";
import {withRouter} from 'react-router-dom';



class Login extends React.Component{
  constructor(props) {
    super(props); 
    this.state = {"username":"","password":""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const userData = {username,password};
    this.props.loginUser(userData, this.props.history);
  }

  render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <div className="form-group">
      <label>
        Username:
      </label>
      <br/>
        <input type="text" required value={this.state.username} onChange={(e) => {
          this.setState({"username":e.target.value});
        }} />
      </div>

      <div className="form-group">
      <label>
        Password:
      </label>
      <br/>
        <input type="password" required value={this.state.password} onChange={(e) => {
          this.setState({"password":e.target.value});
        }} />
      </div>

      <div className="form-group">
      <input type="submit" value="Submit" />
      </div>
    </form>
  );    


  }
};

const mapStateToProps = (state) => ({
  authState: state.auth,
  error : state.errors

});

export default connect(mapStateToProps,{loginUser})(withRouter(Login));