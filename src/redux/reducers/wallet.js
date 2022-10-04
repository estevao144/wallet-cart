import { FORM_SUBMIT, GET_CURRENCIES, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FORM_SUBMIT:
    return { ...state, ...action.curr };
  case GET_CURRENCIES:
    return { ...state, currencies: Object.keys(action.curr) };
  case FAILED_REQUEST:
    return { ...state, error };

  default:
    return state;
  }
};

export default wallet;
