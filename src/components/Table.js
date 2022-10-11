import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenses } from '../redux/actions';

class Table extends Component {
  deleteId = (id) => {
    const { deleteCurrency } = this.props;
    deleteCurrency(id);
  };

  confereCoin(curr) {
    if (curr === 'USD') {
      return 'Dólar Americano/Real Brasileiro';
    } if (curr === 'EUR') {
      return 'Euro/Real Brasileiro';
    }
    return curr;
  }

  renderTable = () => {
    const { expenses } = this.props;
    return (
      expenses.map((expense) => (
        <tr
          key={ expense.id }
        >
          <td>
            { expense.description }
          </td>
          <td>
            { expense.tag }
          </td>
          <td>
            { expense.method }
          </td>
          <td>
            { Number(expense.value).toFixed(2) }
          </td>
          <td>
            { this.confereCoin(expense.currency) }
          </td>
          <td>
            { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
          </td>
          <td>
            { parseFloat(expense.value * expense.exchangeRates[expense.currency].ask)
              .toFixed(2) }
          </td>
          <td>
            Real
          </td>
          <td>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => this.deleteId(expense.id) }
            >
              Excluir
            </button>

          </td>
        </tr>
      ))
    );
  };

  render() {
    return (
      <div>
        <table>
          <tr>
            <th> Descrição </th>
            <th> Tag </th>
            <th> Método de pagamento </th>
            <th> Valor </th>
            <th> Moeda </th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th> Moeda de conversão </th>
            <th> Editar/Excluir </th>
          </tr>
          <tbody>
            { this.renderTable() }
          </tbody>
        </table>
      </div>
    );
  }
}
Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  deleteCurrency: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteCurrency: (id) => dispatch(removeExpenses(id)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
