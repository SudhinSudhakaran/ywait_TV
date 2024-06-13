const types = {
  SET_PREVIOUS_TOKEN_LIST: 'SET_PREVIOUS_TOKEN_LIST',

};

const setPreviousTokenList = list => {
  return {
    type: types.SET_PREVIOUS_TOKEN_LIST,
    payload: list,
  };
};

export default {
  types,
  setPreviousTokenList,

};
