import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  // deleteId = (id) => {
  //   const { expenses } = this.props;
  //   const removeItem = expenses.filter((expense) => (
  //     expense.id !== id
  //   ));
  // };

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
};

const mapDispatchToProps = (dispatch) => ({
  deleteCurrency: (id) => dispatch(deleteExpense(id)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
