import React, { Component } from 'react';


class LogInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '', 
      pwd: ''
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }
  updateState() {
      this.setState({
        account: this.state.account, 
        pwd: this.state.pwd
      }
    )
  }
  handleAccount(event) {
    this.setState({ account: event.target.value });
  }
  handlePwd(event) {
    this.setState({ pwd: event.target.value });
  }
  handleSubmitClick() {
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: this.state.account, 
        pwd: this.state.pwd
      })
    }).then(  response => {
      return response.json();})
    .then( json => {
      console.log(json);}
    );

  }


  renderAccount = () => {
    return (
      <div  className="form-group"> 
        <lable for="usr">User :</lable>
        <input  className="form-control"
                id="account" 
                placeholder="account" 
                value={this.state.account}
                onChange={this.handleAccount.bind(this)}
                type="text"/>
      </div>
    );
  } 
  renderPwd = () => {
    return (
      <div className="form-group"> 
        <lable for="pwd">Password :</lable>
        <input  className="form-control"
                id="pwd" 
                placeholder="password" 
                value={this.state.pwd}
                onChange={this.handlePwd.bind(this)}
                type="password"/>
      </div>
    );
  } 
  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="col-md-3">
         </div>
          <div className="col-md-6">
            <div className="jumbotron">
              <h2 className= 'text-center'>Log In</h2>
              {this.renderAccount()}
              {this.renderPwd()}
              <button
                className="btn btn-info pull-right"
                role="button"
                onClick={this.handleSubmitClick}
                >Log In</button>
            </div>
          <div className="col-md-3">
         </div>s
          </div>
        </div>
      </div>
    );
  }
}

export default LogInPage;
