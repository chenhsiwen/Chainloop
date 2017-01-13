import 'isomorphic-fetch';
import React, { Component } from 'react';


class CartItem extends Component {
   render() {
    const { index, img, title, price, ordernum, pid} = this.props;
    return (
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <div className="row" key={index}>
                <div className="col-md-1" >
                    {index}
                </div>
                <div className="col-md-3" >
                    <img src={img} alt={title} height="84" width="84"/>
                </div>
                <div className="col-md-3">
                    <span><a href={"#/products/"+ pid}>{title}</a></span>
                </div>
                <div className="col-md-3">
                    {price}
                </div>
                <div className="col-md-2">
                    {ordernum}
                </div>
              </div>
            </div>
          </div>
        </div>           
      );
    }
}
class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders : []
    };
  }
  updateState() {
    this.setState({
      orders: this.state.orders
    })
  }
  componentDidMount() {
    fetch ('/api/orders/'+this.props.uid)
    .then(response => {
      return response.json();})
    .then(json => {
      this.state.orders = json;
      this.updateState();
      console.log(this.state.orders); 
    });
  }
  renderCartItem(item,id) {
    return (
      <CartItem
        index = {id+1}
        id = {Object.keys(this.state.orders)[id]}
        img = {item.img}
        title = {item.title}
        pid = {item.pid}
        price = {item.price}
        created_at={item.created_at}
        ordernum = {item.ordernum} 
      />
    );
  }
  render() {
    return (
      <div className="container" >
         <div className="row"  >
          <div className="col-md-12">
              {Object.values(this.state.orders).map(this.renderCartItem, this)}
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
