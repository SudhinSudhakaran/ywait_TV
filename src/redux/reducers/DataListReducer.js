import { DataListActions } from '../actions';

const initialState = {
    allowSplitScreen: false,
  };
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case DataListActions.types.ALLOW_SPLIT_SCREEN: {
        return {
          ...state,
          allowSplitScreen: action?.payload,
        };
      }
    }
    return state;
  };

  export default reducer;

