import React, { Component } from 'react';


class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h1>EASY COME EASY GO</h1>
              <p><a className="btn btn-success btn-lg" href="#/products" role="button">Lets Start!</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
