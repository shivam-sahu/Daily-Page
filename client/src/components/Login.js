import React from "react";
// import ReactDOM from "react-dom";
import './App.css';

class Login extends React.Component{
  constructor(props) {
    super(props); 
    this.state = {"username":"","password":""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(event) {
    alert('A name was submitted: ');
    event.preventDefault();
  }

  render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        username:
        <input type="text" value={this.state.username} onChange={(e) => {
          this.setState({"username":e.target.value});
        }} />
      </label>
      <label>
        password:
        <input type="password" value={this.state.password} onChange={(e) => {
          this.setState({"password":e.target.value});
        }} />
      </label>

      <input type="submit" value="Submit" />
    </form>
  );    


  }
};
export default Login;