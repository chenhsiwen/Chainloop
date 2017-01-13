import 'isomorphic-fetch';
import React, { Component } from 'react';


class ProductItem extends Component {
   render() {
    const { index, id, title, price, img, numleft } = this.props;
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
                    <span><a href={"#/products/"+ id}>{title}</a></span>
                </div>
                <div className="col-md-3">
                    {price}
                </div>
                <div className="col-md-2">
                    {numleft}
                </div>
              </div>
            </div>
          </div>
        </div>          
      );
    }
}
class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products : []
    };
  }
  updateState() {
    this.setState({
      products: this.state.products
    })
  }
  componentDidMount() {
    fetch ('/api/products/')
    .then(response => {
      return response.json();
    })
    .then(json => {
      this.state.products = json;
      this.updateState(); 
    });
  }
  renderProductItem(item,id) {
    return (
      <ProductItem
        index = {id+1}
        id = {Object.keys(this.state.products)[id]}
        img = {item.img}
        title = {item.title}
        price = {item.price}
        created_at={item.created_at}
        numleft = {item.numleft} 
      />
    );
  }
  render() {
    return (
      <div className="container" >
         <div className="row"  >
          <div className="col-md-12">
              {Object.values(this.state.products).map(this.renderProductItem, this)}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsPage;
