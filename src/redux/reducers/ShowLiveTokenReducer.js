import { ShowLiveTokensActions} from '../actions';
const initialState = {
  showLiveTokensEnabled: false, // to check need to split token screen to two.
  _liveTokensList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ShowLiveTokensActions.types.SET_ENABLE_SHOW_LIVE_TOKENS: {
      return {
        ...state,
        showLiveTokensEnabled: action?.payload,
      };
    }
    case ShowLiveTokensActions.types.SET_LIVE_TOKEN_LIST: {
      return {
        ...state,
        _liveTokensList: action?.payload,
      };
    }
  }
  return state;
};
export default reducer;
