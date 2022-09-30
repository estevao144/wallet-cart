// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
};

const FORM_SUBMIT = 'FORM_SUBMIT';

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FORM_SUBMIT:
    return { ...state, email: action.value };
  default:
    return state;
  }
};

export default user;
