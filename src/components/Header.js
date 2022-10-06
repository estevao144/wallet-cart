import React from 'react';
import { PropTypes, arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { emailInput, expenses } = this.props;
    const soma = expenses.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      const converAtual = value * exchangeRates[currency].ask;
      console.log(converAtual);
      return Number((acc + converAtual).toFixed(2));
    }, 0);

    return (
      <div>
        <div>
          <p data-testid="email-field">
            <span>Email: </span>
            { emailInput }
          </p>
        </div>
        <div>
          <p>
            {' '}
            Total de despesas:
            <span data-testid="total-field">
              { soma }
            </span>
          </p>
        </div>
        <div>
          <p data-testid="header-currency-field">
            <span>Moedas: </span>
            BRL
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    emailInput: state.user.email,
    expenses: state.wallet.expenses,
  });

Header.propTypes = {
  emailInput: PropTypes.string,
  expenses: arrayOf(shape()) }.isRequired;

export default connect(mapStateToProps)(Header);
