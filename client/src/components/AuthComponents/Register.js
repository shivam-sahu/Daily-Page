import React from "react";
import {connect} from "react-redux";
import { registerUser } from "../../actions/authActions";
import {withRouter} from 'react-router-dom';

class Register extends React.Component{
  constructor(props) {
    super(props); 
    this.state = {"username":"","password":"","email":"","error":false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.error) {
      this.setState({error:true});
    }
  }



  handleSubmit(event) {

    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const newUser = {username,email,password};
    this.props.registerUser(newUser, this.props.history);

  }

  render() {
  return (
    <div>
    <form onSubmit={this.handleSubmit}>

      <div className="form-group">
      <label>
        Email: 
      </label>
      <br/>

        <input type="email" required value={this.state.email} onChange={(e) => {
          this.setState({"email":e.target.value});
        }} />
      </div>

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
    <hr / >

    </div>
  );    


  }
};

const mapStateToProps = (state) => ({
  authState: state.auth,
  error : state.errors
});

export default connect(mapStateToProps,{registerUser})(withRouter(Register));