import React, { Component } from 'react';


class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '', 
      pwd: '',
      name: '',
      img : '',
      bluetooth : '',
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }
  updateState() {
      this.setState({
        account: this.state.account, 
        pwd: this.state.pwd,
        name: this.state.name,
        img : this.state.img,
        bluetooth : this.state.bluetooth
      }
    )
  }
  handleAccount(event) {
    this.setState({ account: event.target.value });
  }
  handlePwd(event) {
    this.setState({ pwd: event.target.value });
  }
  handleImg(event) {
    this.setState({ img: event.target.value });
  }
  handleName(event) {
    this.setState({ name: event.target.value });
  }
  handleBluetooth(event) {
    this.setState({ bluetooth: event.target.value });
  }
  handleSubmitClick() {
    const confirm = window.confirm('Ready to new a sinup？');
    if (confirm) {
      fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account: this.state.account, 
          pwd: this.state.pwd,
          name: this.state.name,
          img : this.state.img,
          bluetooth : this.state.bluetooth
        })
      }).then( document.location.href= "#");
    }
  }

  renderAccount = () => {
    return (
      <div  className="form-group"> 
        <lable for="usr">User :</lable>
        <input  className="form-control"
                id="account" 
                placeholder="email" 
                value={this.state.account}
                onChange={this.handleAccount.bind(this)}
                type="text"/>
      </div>
    );
  } 
  renderName = () => {
    return (
      <div  className="form-group"> 
        <lable for="name">Name :</lable>
        <input  className="form-control"
                id="account" 
                placeholder="name" 
                value={this.state.name}
                onChange={this.handleName.bind(this)}
                type="text"/>
      </div>
    );
  } 
  renderImg = () => {
    return (
      <div  className="form-group"> 
        <lable for="img">Image :</lable>
        <input  className="form-control"
                id="img" 
                placeholder="img" 
                value={this.state.img}
                onChange={this.handleImg.bind(this)}
                type="text"/>
      </div>
    );
  } 
  renderBluetooth = () => {
    return (
      <div  className="form-group"> 
        <lable for="bluetooth">Bluetooth :</lable>
        <input  className="form-control"
                id="bluetooth" 
                placeholder="bluetooth" 
                value={this.state.bluetooth}
                onChange={this.handleBluetooth.bind(this)}
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
              <h2 className= 'text-center'>Sign Up</h2>
              {this.renderAccount()}
              {this.renderPwd()}
              {this.renderName()}
              {this.renderBluetooth()}
              <button
                className="btn btn-info  pull-right"
                role="button"
                onClick={this.handleSubmitClick}
                >Sign Up</button>
            </div>
          <div className="col-md-3">
         </div>s
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
