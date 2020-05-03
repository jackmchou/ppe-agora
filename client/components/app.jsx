import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './header';
import VersionModal from './version-modal';
import DemoDisclaimer from './demo-disclaimer';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cartsummary';
import CheckoutForm from './checkout-form';
import PPEHeader from './ppeheader';
import PPEDemoDisclaimer from './ppedemo-disclaimer';
import PPEProductList from './ppeproduct-list';
import PPEProductDetails from './ppeproduct-details';
import PPECartSummary from './ppecartsummary';
import PPECheckOut from './ppecheckout';
import PPEOrderConfirm from './ppeorderconfirm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAccepted: false,
      message: null,
      isLoading: true,
      cart: [],
      ppeTermsAccepted: false,
      ppeCart: []
    };
    this.acceptTerms = this.acceptTerms.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteCartItem = this.deleteCartItem.bind(this);
    this.getPPECartItems = this.getPPECartItems.bind(this);
    this.addPPEToCart = this.addPPEToCart.bind(this);
    this.deletePPECartItem = this.deletePPECartItem.bind(this);
    this.placePPEOrder = this.placePPEOrder.bind(this);
    this.ppeAcceptTerms = this.ppeAcceptTerms.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
    this.getPPECartItems();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  addToCart(product) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', req)
      .then(res => res.json())
      .then(product => this.setState({ cart: this.state.cart.concat(product) }));
  }

  addPPEToCart(ppeProduct) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ppeProduct)
    };
    fetch('/api/ppeCart', req)
      .then(res => res.json())
      .then(ppeProduct => this.setState({ ppeCart: this.state.ppeCart.concat(ppeProduct) }));
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cart => this.setState({ cart }))
      .catch(err => console.error(err));
  }

  getPPECartItems() {
    fetch('/api/ppecart')
      .then(res => res.json())
      .then(ppeCart => this.setState({ ppeCart }))
      .catch(err => console.error(err));
  }

  deleteCartItem(cartItemId) {
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`/api/cart/${cartItemId}`, req)
      .then(res => res.json())
      .then(deletedItem => {
        const cartItems = this.state.cart.filter(deleted => deletedItem.cartItemId !== deleted.cartItemId);
        this.setState({ cart: cartItems });
      })
      .catch(err => console.error(err));
  }

  deletePPECartItem(ppeCartItemId) {
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`/api/ppecart/${ppeCartItemId}`, req)
      .then(res => res.json())
      .then(deletedItem => {
        const ppeCartItems = this.state.ppeCart.filter(deleted => deletedItem.ppeCartItemId !== deleted.ppeCartItemId);
        this.setState({ ppeCart: ppeCartItems });
      })
      .catch(err => console.error(err));
  }

  placeOrder(orderObj) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderObj)
    };
    fetch('/api/orders', req)
      .then(res => res.json())
      .then(order => this.setState({ cart: [], view: { name: 'catalog', params: {} } }))
      .catch(err => console.error(err));
  }

  placePPEOrder(orderObj) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderObj)
    };
    fetch('/api/ppeorders', req)
      .then(res => res.json())
      .then(ppeorder => this.setState({ ppeCart: [] }))
      .catch(err => console.error(err));
  }

  acceptTerms() {
    this.setState({ termsAccepted: !this.state.termsAccepted });
  }

  ppeAcceptTerms() {
    this.setState({ ppeTermsAccepted: !this.state.ppeTermsAccepted });
  }

  render() {
    const { cart, ppeCart, termsAccepted, ppeTermsAccepted } = this.state;
    return (
      <Router>
        <Switch>
          <Route path="/productdetails/:id">
            <Header cartItemCount={cart.length} />
            <ProductDetails addToCart={this.addToCart} />
          </Route>
          <Route path="/cartsummary">
            <Header cartItemCount={cart.length} />
            <CartSummary cart={cart} deleteCartItem={this.deleteCartItem} />
          </Route>
          <Route path="/checkout">
            <Header cartItemCount={cart.length} />
            <CheckoutForm onSubmit={this.placeOrder} cart={cart} />
          </Route>
          <Route path="/productlist">
            {!termsAccepted ? <DemoDisclaimer acceptTerms={this.acceptTerms} />
              : <React.Fragment>
                <Header cartItemCount={cart.length} />
                <ProductList />
              </React.Fragment>}
          </Route>
          <Route path="/ppeproductdetails/:id">
            <PPEHeader ppeCartItemCount={ppeCart.length} />
            <PPEProductDetails addPPEToCart={this.addPPEToCart} />
          </Route>
          <Route path="/ppecartsummary">
            <PPEHeader ppeCartItemCount={ppeCart.length} />
            <PPECartSummary ppeCart={ppeCart} deletePPECartItem={this.deletePPECartItem} />
          </Route>
          <Route path="/ppecheckout">
            <PPEHeader ppeCartItemCount={ppeCart.length} />
            <PPECheckOut onSubmit={this.placePPEOrder} ppeCart={ppeCart} />
          </Route>
          <Route path="/ppeorderconfirm">
            <PPEHeader ppeCartItemCount={ppeCart.length} />
            <PPEOrderConfirm />
          </Route>
          <Route path="/ppeproductlist">
            {!ppeTermsAccepted ? <PPEDemoDisclaimer ppeAcceptTerms={this.ppeAcceptTerms} />
              : <React.Fragment>
                <PPEHeader ppeCartItemCount={ppeCart.length} />
                <PPEProductList addPPEToCart={this.addPPEToCart} />
              </React.Fragment>}
          </Route>
          <Route path="/">
            <VersionModal />
          </Route>
        </Switch>
      </Router>
    );
  }
}
