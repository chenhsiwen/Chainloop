import 'isomorphic-fetch';
import React, { Component, PropTypes } from 'react';
import {textstyle, styleMap, contentstyle, spanStyle} from './styleJS';

class SingleProductPage extends Component {
  static propTypes = {
    pid: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasproduct : false,
      title: '',
      img : '',
      price: 0,
      ordernum: 0,
      org_numleft: 0,
      numleft: 0,
      created_at : '',
    };
    this.handleOrderClick = this.handleOrderClick.bind(this);
  }


  handleproduct(json){  
    if ( json.length !== 0  ){
      this.state = Object.assign({}, json);
      this.state.hasproduct = true;
      this.state.ordernum = 0;
      this.state.org_numleft = this.state.numleft;
      this.updateState();
    } 
  }
  updateState() {
    this.setState({
      hasproduct : this.state.hasproduct,
      org_numleft: this.state.org_numleft,
      numleft: this.state.numleft,
      ordernum: this.state.ordernum
    })
  }
  renderProductItem() {
    const {title, price, img, numleft } = this.state;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="jumbotron">
            <div className="row" >
              <div className="col-md-6" >
                  <img src={img} alt={title} height="200" width="200"/>
              </div>
              <div className="col-md-6">
                <div className="row" >
                  <h3>name: {title}</h3>
                  <h3>price: {price}</h3>
                  <h3>numleft: {numleft}</h3>
                  {this.renderOrdernum()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>          
    );
  }
  handleOrdernum(event) {
    let numleft = this.state.org_numleft - event.target.value;
    if( numleft >= 0 )
      this.setState({ ordernum: event.target.value,
          numleft : this.state.org_numleft - event.target.value
       });
    else 
      this.setState({ ordernum: this.state.org_numleft,
          numleft : 0
       });
  }
  renderOrdernum() {
    if (this.props.uid.length  !== 0)
      return (
        <div  className="form-group"> 
          <h3 for="ordernum">Ordernum :</h3>
          <input  className="form-control"
                  id="ordernum" 
                  placeholder="ordernum" 
                  value={this.state.ordernum}
                  onChange={this.handleOrdernum.bind(this)}
                  type="text"/>
        </div>
      );
    else 
      return null;
  } 
  renderSubmitclick() {
    if (this.props.uid.length  !== 0)
      return (
          <div className="col-md-6">
            <button
              className="btn btn-info pull-right"
              role="button"
              onClick={this.handleOrderClick}
            >Order</button>
          </div>
      );
    else 
      return null;
  } 
  componentDidMount() {
    fetch ('/api/products/'+this.props.pid)
    .then(response => {
      return response.json();})
    .then(json => this.handleproduct(json));
  }
  handleOrderClick = () => {
    const confirm = window.confirm('Do you want to order？');
    if (confirm) {
      fetch('/api/products/'+this.props.pid, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: this.props.uid,
          pid: this.props.pid,
          img: this.state.img,
          ordernum: this.state.ordernum,
          numleft : this.state.numleft,
          price: this.state.price,
          title: this.state.title
        })
      });  
    }  
  };

  render() {
    if (this.state.hasproduct) 
      return (
        <div className="container" >
           <div className="row"  >
            <div className="col-md-12">
                {this.renderProductItem()}
            </div>
          </div>


        </div>
      );
    else 
      return(
        <div className="row">
           <div className="col-md-3">
           </div>
            <div className="col-md-9">
               <span style = {spanStyle}>Loading</span>
            </div>
        </div>
      );
  }
}




export default SingleProductPage;
