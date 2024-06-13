import {TokenActions} from '../actions';

const initialState = {
  previousTokenList: [],

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TokenActions.types.SET_PREVIOUS_TOKEN_LIST: {
      return {
        ...state,
        previousTokenList: action?.payload,
      };
    }
   
  }
  return state;
};
export default reducer;
