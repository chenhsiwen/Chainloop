import React, { Component } from 'react';


class LogInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }
  updateState() {
      this.setState({
      }
    )
  }
  handleSubmitClick() {
    fetch('/api/users/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        logout: true, 
      })
    })
    .then(  response => {
      return response.json();})
    .then(window.location.reload(true)
    );

  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h1>Thanks For your Jounney </h1>
              <button
                className="btn btn-success  btn-lg "
                role="button"
                onClick={this.handleSubmitClick}
                >Log out</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogInPage;
