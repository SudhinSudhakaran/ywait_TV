import {SplitScreenActions} from '../actions';
const initialState = {
  splitScreenEnabled: false, // to check need to split token screen to two.
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SplitScreenActions.types.SET_ENABLE_SPLIT_SCREEN: {
      return {
        ...state,
        splitScreenEnabled: action?.payload,
      };
    }
  }
  return state;
};
export default reducer;
