import currencyAPI from '../../helpers/currencyAPI';

export const FORM_SUBMIT = 'FORM_SUBMIT';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const buttonLogin = (value) => ({
  type: FORM_SUBMIT,
  value,
});

export const saveExpense = (payload) => ({
  type: SAVE_EXPENSE,
  payload,
});

export const requestCurrency = () => ({
  type: REQUEST_CURRENCIES,
});
// recebe moeda API
export const getCurrencies = (curr) => ({
  type: GET_CURRENCIES,
  curr,
});

export const failedRequestCurrencies = (erro) => ({
  type: FAILED_REQUEST,
  erro,
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
