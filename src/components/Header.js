import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  state = {
    valor: 0,
    currency: 'BRL',
  };

  render() {
    const { emailInput } = this.props;
    const { valor, currency } = this.state;

    return (
      <div>
        <div>
          <p data-testid="email-field">
            <span>Email: </span>
            { emailInput }
          </p>
        </div>
        <div>
          <p data-testid="total-field">
            <span>Total de despesas: </span>
            {valor}
          </p>
        </div>
        <div>
          <p data-testid="header-currency-field">
            <span>Moedas: </span>
            {currency}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    emailInput: state.user.email,
  });

Header.propTypes = {
  emailInput: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
