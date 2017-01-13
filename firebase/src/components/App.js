import React, { Component } from 'react';
import HomePage from './HomePage';
import ProductsPage from './ProductsPage';
import SingleProductPage from './SingleProductPage';
import NewProductPage from './NewProductPage';
import CartPage from './CartPage';
import SignUpPage from './SignUpPage'
import LogInPage from './LogInPage'
import LogOutPage from './LogOutPage'
class App extends Component {
  state = {
    route: window.location.hash.substr(1),
    uid:  '',
    haslogin : false,
  };
  componentDidMount() {
    fetch ('/api/users/login')
    .then(response => {
      return response.json();})
    .then(json => {
      if (json != ''){
        this.setState({
          uid: json,
          haslogin: true
        });
      }
      else {
        this.setState({
          uid: '',
          haslogin: false
        });
      }
    });

    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1),
      });
    });
  }
  renderlog(){
    if (!this.state.haslogin)
      return(
        <ul className="nav navbar-nav pull-right  ">
          <li>
              <a href="#/login" >log in</a>
          </li>
          <li >
              <a href="#/signup">sign up</a>
          </li>
        </ul>);
    else 
      return(
        <ul className="nav navbar-nav pull-right  ">
          <li >
            <a href={"#/carts/" + this.state.uid}>cart</a>
          </li>
          <li>
              <a href="#/logout" >log out</a>
          </li>
        </ul>
      );

  }

  renderRoute() {
    if (this.state.haslogin === false){
      if (this.state.route === '/signup') {
          return <SignUpPage />;
        }
        if (this.state.route === '/login') {
          return <LogInPage/>;
        }
      }
    else {
      if (this.state.route === '/logout') {
        return <LogOutPage/>;
      }
    }
    if (this.state.route === '/products') {
      return <ProductsPage />;
    }
    if (this.state.route === '/products/new') {
      return <NewProductPage />;
    }
    if (this.state.route.startsWith('/carts/')) {
      const uid = this.state.route.split('/carts/')[1];
      return <CartPage uid={uid} />;
    }
    if (this.state.route.startsWith('/products/')) {
      const pid = this.state.route.split('/products/')[1];
      return <SingleProductPage pid={pid} uid={this.state.uid}/>;
    }
    return <HomePage />;
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-hshopseader">
              <a className="navbar-brand" href="#/">Chain Loop</a>
            </div>
            <ul className="nav navbar-nav  ">
              <li>
                <a href="#/">Home</a>
              </li>
              <li >
                <a href="#/products">product</a>
              </li>
              </ul>
              {this.renderlog()}
          </div>
        </nav>
        <div className="container">
        </div>
          {this.renderRoute()}
      </div>
    );
  }
}


export default App;
