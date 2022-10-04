import React from 'react';
import { arrayOf, PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencyAPI } from '../redux/actions';

class WalletForm extends React.Component {
  state = {
    id: 0,
    value: 0,
    currency: 'USD',
    paymentMethod: 'Dinheiro',
    category: 'Alimentação',
  };

  async componentDidMount() {
    const { getCurrency } = this.props;
    await getCurrency();
  }

  handleClick(event) {
    event.preventDefault();
    const { getCurrency } = this.props;
    getCurrency();
    const { addExpense, currencies } = this.props;
    const { id, value, description,
      currency, paymentMethod, category,
    } = this.state;
    const expenseObj = {
      id,
      value,
      description,
      currency,
      paymentMethod,
      category,
      exchangeRates: currencies,
    };
    addExpense(expenseObj);

    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      paymentMethod: 'Dinheiro',
      category: 'Alimentação',
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  renderCurrencies = () => {
    const { currencies } = this.props;
    const { currency } = this.state;
    const keys = currencies.filter((exc) => (exc !== 'USDT'));
    console.log(keys);
    return (
      <label
        htmlFor="currency-input"
      >
        Moeda:
        <select
          data-testid="currency-input"
          id="currency-input"
          name="currency"
          onChange={ (event) => this.handleChange(event) }
          value={ currency }
        >
          {
            keys.map((moedas) => (
              <option value={ moedas } key={ moedas }>{moedas}</option>
            ))
          }
        </select>
      </label>
    );
  };

  renderInputs() {
    const { value } = this.state;
    return (
      <>
        <label
          htmlFor="value-input"
        >
          Valor da despesa:
          <input
            data-testid="value-input"
            type="number"
            id="value-input"
            value={ value }
            name="value"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <label
          htmlFor="description-input"
        >
          Descrição da despesa:
          <input
            data-testid="description-input"
            type="text"
            id="description-input"
            name="description"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
      </>
    );
  }

  renderMethod() {
    const { paymentMethod } = this.state;
    return (
      <label
        htmlFor="paymentMethod-input"
      >
        Método de pagamento:
        <select
          data-testid="method-input"
          id="paymentMethod-input"
          value={ paymentMethod }
          name="paymentMethod"
          onChange={ (event) => this.handleChange(event) }
        >
          <option
            value="Dinheiro"
          >
            Dinheiro
          </option>
          <option
            value="Cartão de crédito"
          >
            Cartão de crédito
          </option>
          <option
            value="Cartão de débito"
          >
            Cartão de débito
          </option>
        </select>
      </label>
    );
  }

  renderCategory() {
    const { category } = this.state;
    return (
      <label
        htmlFor="category-input"
      >
        Categoria
        <select
          data-testid="tag-input"
          name="category"
          value={ category }
          id="category-input"
          onChange={ (event) => this.handleChange(event) }
        >
          <option
            value="Alimentação"
          >
            Alimentação
          </option>
          <option
            value="Lazer"
          >
            Lazer
          </option>
          <option
            value="Trabalho"
          >
            Trabalho
          </option>
          <option
            value="Transporte"
          >
            Transporte
          </option>
          <option
            value="Saúde"
          >
            Saúde
          </option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <div>
        <form>
          { this.renderInputs() }
          { this.renderCurrencies() }
          { this.renderCategory() }
          { this.renderMethod() }
        </form>
        <button
          type="submit"
          onClick={ this.handleClick }
        >
          Adicionar despesa

        </button>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(saveExpense(expense)),
  getCurrency: () => dispatch(fetchCurrencyAPI()),
});

WalletForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
  getCurrency: PropTypes.func.isRequired,
  currencies: arrayOf(PropTypes.Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
