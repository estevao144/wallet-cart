import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { buttonLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    emailInput: '',
    passwordInput: '',
    disable: true,
  };

  validaEmail = (email) => (email.match(/^([\w.%+-]+)@([\w-]+.)+([\w]{2,3})$/i));

  validaPassword = () => {
    const { passwordInput } = this.state;
    const minCarac = 5;
    if (passwordInput.length >= minCarac) {
      return true;
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, this.disableButton());
  };

  disableButton = () => {
    const { emailInput } = this.state;

    if ((this.validaEmail(emailInput)) && (this.validaPassword())) {
      this.setState({
        disable: false,
      });
    } else {
      this.setState({
        disable: true,
      });
    }
  };

  handleClick = () => {
    const { login } = this.props;
    const { emailInput } = this.state;
    login(emailInput);
  };

  render() {
    const { disable, emailInput, passwordInput } = this.state;
    return (
      <main className="container-login">
        <h1 className="title-login">
          {' '}
          TrybeWallets

        </h1>
        <label htmlFor="email">
          <input
            label="email"
            data-testid="email-input"
            type="email"
            placeholder="Insira seu email."
            value={ emailInput }
            name="emailInput"
            onChange={ (event) => this.handleChange(event) }
          />

        </label>
        <label htmlFor="senha">
          <input
            label="senha "
            type="password"
            placeholder="Insira sua senha."
            value={ passwordInput }
            name="passwordInput"
            data-testid="password-input"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disable }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </Link>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(buttonLogin(payload)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,

};

export default connect(null, mapDispatchToProps)(Login);
