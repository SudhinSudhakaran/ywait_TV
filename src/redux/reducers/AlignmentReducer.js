import {AlignmentActions} from '../actions';
const initialState = {
  isRTL: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AlignmentActions.types.SET_RTL: {
      return {
        ...state,
        isRTL: action?.payload,
      };
    }
  }
  return state;
};

export default reducer;
