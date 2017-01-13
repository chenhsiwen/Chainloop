import 'isomorphic-fetch';
import React, { Component } from 'react';
import {textstyle, styleMap} from './styleJS';
class NewProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      img: '',
      price: 0,
      numleft:0
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }
  updateState() {
      this.setState({
        title: this.state.title, 
        numleft: this.state.numleft,
        price: this.state.price,
        img: this.state.img
      }
    )
  }
  handleTitle(event) {
    this.setState({ title: event.target.value });
  }
  handlePrice(event) {
    this.setState({ price: event.target.value });
  }
  handleImg(event) {
    this.setState({ img: event.target.value });
  }
  handleNumleft(event) {
    this.setState({ numleft: event.target.value });
  }

  handleSubmitClick() {
    const confirm = window.confirm('Ready to new a product？');
    if (confirm) {

      fetch('/api/products/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.title, 
          numleft: this.state.numleft,
          price: this.state.price,
          img: this.state.img
        })
      }).then( document.location.href= "#");
    }
  }

  renderTitle = () => {
    return (
      <div  className="form-group col-md-6"> 
        <label for="ordernum">Title :</label>
           <input  
              className="form-control"
              id="title" 
              placeholder="title" 
              value={this.state.title}
              onChange={this.handleTitle.bind(this)}
              type="text"/>
      </div>
    );
  }                
  renderPrice = () => {
    return (
       <div  className="form-group col-md-6"> 
        <label for="price">Price :</label>
           <input  
              className="form-control"
              id="price" 
              placeholder="price" 
              value={this.state.price}
              onChange={this.handlePrice.bind(this)}
              type="text"/>
      </div>
    );
  } 
  renderNumleft = () => {
    return (
      <div  className="form-group col-md-6"> 
        <label for="price">Numleft :</label>
           <input  
              className="form-control"
              id="numleft" 
              placeholder="numleft" 
              value={this.state.numleft}
              onChange={this.handleNumleft.bind(this)}
              type="text"/>
      </div>
    );
  } 
  renderImg = () => {
    return (
      <div  className="form-group col-md-6"> 
        <label for="price">Img :</label>
           <input  
              className="form-control"
              id="img" 
              placeholder="img" 
              value={this.state.img}
              onChange={this.handleImg.bind(this)}
              type="text"/>
      </div>

    );
  } 
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {this.renderTitle()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderPrice()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderNumleft()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderImg()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button
              className="btn btn-info pull-right"
              role="button"
              onClick={this.handleSubmitClick}
            >送出</button>
          </div>
        </div>
      </div>
    );
  }
}


export default NewProductPage;