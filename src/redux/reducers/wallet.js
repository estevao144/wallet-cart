import { FORM_SUBMIT, GET_CURRENCIES, FAILED_REQUEST,
  ADD_EXPENSE, NEW_EXPENSE, DELETE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FORM_SUBMIT:
    return { ...state, ...action.curr };
  case DELETE_EXPENSES:
    return ({
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.id),
    });
  case GET_CURRENCIES:
    return { ...state, currencies: Object.keys(action.curr) };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case NEW_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case FAILED_REQUEST:
    return { ...state, error };

  default:
    return state;
  }
};

export default wallet;
