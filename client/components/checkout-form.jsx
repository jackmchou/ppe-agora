import React from 'react';
import { Link } from 'react-router-dom';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      addressOne: '',
      toggleButton: false,
      errors: {
        name: '',
        creditCard: '',
        addressOne: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.passValidation = this.passValidation.bind(this);
  }

  handleBlur(event) {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        this.setState({
          errors: {
            name: /[A-Za-z]{5,65}/g.test(value)
              ? '' : 'Please enter a valid full name. i.e James Smith'
          }
        });
        break;
      case 'creditCard':
        this.setState({
          errors: {
            creditCard: /\d{16}/g.test(value)
              ? '' : 'Please enter a valid 16 digit credit card'
          }
        });
        break;
      case 'shippingAddress':
        this.setState({
          errors: {
            addressOne: value.length > 21 && value.length < 156
              ? '' : 'Shipping Address is between 21 and 156 characters'
          }
        });
        break;
      default:
        break;
    }
  }

  handleClick(event) {
    if (this.state.toggleButton) {
      return this.setState({
        errors:
        {
          name: 'Please enter a valid full name. i.e James Smith',
          creditCard: 'Please enter a valid VISA card',
          addressOne: 'Shipping Address is between 21 and 156 characters'
        }
      });
    }
  }

  handleChange(event) {
    this.passValidation();
    const { name, value } = event.target;
    if (this.passValidation) {
      return this.setState({
        [name]: value,
        errors: { name: '', errors: '', addressOne: '' }
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const orderObj = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      addressOne: this.state.addressOne
    };
    this.props.onSubmit(orderObj);
  }

  passValidation() {
    if (Object.values(this.state.errors).every(idx => idx === '')) return true;
  }

  render() {
    const submitButton = Object.values(this.state.errors).every(idx => idx === '') ? 'Submit' : 'Please complete form';
    const { name, creditCard, addressOne } = this.state;
    const emptyFields = !(name && creditCard && addressOne);
    return (
      <form className="p-5 mt-5" onSubmit={this.handleSubmit}>
        <div className="bg-dark p-3 text-white">
          <h1>My Cart</h1>
          <p>Order Total: ${(this.props.cart.reduce((cur, acc) => cur + acc.price, 0) * 0.01).toFixed(2)}</p>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <small className="text-danger float-right"> {this.state.errors.name}</small>
            <input onChange={this.handleChange} onBlur={this.handleBlur} type="text" name="name"
              className="form-control" placeholder="Name" minLength="5" maxLength="65" pattern="[A-Za-z]{5,65}"
              required title="Minimum 5 characters, max 65" />
            <small id="infoHelp" className="form-text text-muted text-center">
              Please DO NOT use personal information</small>
          </div>
          <div className="form-group">
            <label htmlFor="creditCard">Credit Card</label>
            <small className="text-danger float-right">{this.state.errors.creditCard}</small>
            <input onChange={this.handleChange} onBlur={this.handleBlur} type="text" name="creditCard"
              className="form-control" placeholder="Credit Card #" pattern="\d*"
              maxLength="16" minLength="16" title="16 Digits only" required />
            <small id="infoHelp" className="form-text text-muted text-center">
              Please DO NOT use personal information</small>
          </div>
          <div className="form-group">
            <label htmlFor="addressOne">Shipping Address</label>
            <small className="text-danger float-right">{this.state.errors.addressOne}</small>
            <textarea onChange={this.handleChange} onBlur={this.handleBlur} name="addressOne" rows="4"
              className="form-control" placeholder="Shipping Address"
              minLength="21" maxLength="156" title="Between 21 and 156 characters of any kind" required />
            <small id="infoHelp" className="form-text text-muted text-center">
              Please DO NOT use personal information</small>
          </div>
          <div className="p-2">
            <Link to="/productlist">
              <button className="btn btn-outline-info">Continue Shopping</button>
            </Link>
            <span className="float-right" onClick={this.handleClick}>
              <button type="submit" className="btn btn-success" disabled={emptyFields}>{submitButton}</button>
            </span>
          </div>
        </div>
      </form>
    );
  }
}
