import currencyAPI from '../../helpers/currencyAPI';

export const NEW_EXPENSE = 'NEW_EXPENSE';
export const FORM_SUBMIT = 'FORM_SUBMIT';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const buttonLogin = (value) => ({
  type: FORM_SUBMIT,
  value,
});

export const requestCurrency = () => ({
  type: REQUEST_CURRENCIES,
});
// recebe moeda API
export const getCurrencies = (curr) => ({
  type: GET_CURRENCIES,
  curr,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});

export const failedRequestCurrencies = (erro) => ({
  type: FAILED_REQUEST,
  erro,
});

export const removeExpenses = (expenses) => ({
  type: DELETE_EXPENSES,
  expenses,
});

export const newExpense = (expense, cambio) => ({
  type: NEW_EXPENSE,
  payload: {
    ...expense,
    exchangeRates: cambio,
  },
});

export function fetchCurrencyAPI() {
  return async (dispatch) => {
    dispatch(requestCurrency());
    try {
      const curr = await currencyAPI();
      delete curr.USDT;
      dispatch(getCurrencies(curr));
    } catch {
      console.log(error);
    }
  };
}

export function fetchAPIExpense(expense) {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const data = await fetch(endpoint);
    const response = await data.json();
    dispatch(newExpense(expense, response));
  };
}
