import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencyAPI, fetchAPIExpense } from '../redux/actions';

class WalletForm extends React.Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { getCurrency } = this.props;
    await getCurrency();
  }

  handleClick = () => {
    const { id, value, currency, description, method, tag } = this.state;
    const { addExpenseTotal, expenses } = this.props;
    const response = {
      id: id + expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    };
    addExpenseTotal(response);

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  renderCurrencies = () => {
    const { currencies } = this.props;
    const { currency } = this.state;
    const keys = currencies.filter((exc) => (exc !== 'USDT'));
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
    const { value, description } = this.state;
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
            value={ description }
            name="description"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
      </>
    );
  }

  renderMethod() {
    const { method } = this.state;
    return (
      <label
        htmlFor="method-input"
      >
        Método de pagamento:
        <select
          data-testid="method-input"
          id="method-input"
          value={ method }
          name="method"
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
    const { tag } = this.state;
    return (
      <label
        htmlFor="tag-input"
      >
        Categoria
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          id="tag-input"
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
          type="button"
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
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseTotal: (expense) => dispatch(fetchAPIExpense(expense)),
  getCurrency: () => dispatch(fetchCurrencyAPI()),
});

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  addExpenseTotal: PropTypes.func.isRequired,
  getCurrency: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
