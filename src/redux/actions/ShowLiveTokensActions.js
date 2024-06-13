const types = {
  SET_ENABLE_SHOW_LIVE_TOKENS: 'SET_ENABLE_SHOW_LIVE_TOKENS',
  SET_LIVE_TOKEN_LIST: 'SET_LIVE_TOKEN_LIST',
};

const setShowLiveTokens = option => {
  return {
    type: types.SET_ENABLE_SHOW_LIVE_TOKENS,
    payload: option,
  };
};
const setLiveTokenList = list => {
  return {
    type: types.SET_LIVE_TOKEN_LIST,
    payload: list,
  };
};
export default {
  types,
  setShowLiveTokens,
  setLiveTokenList,
};
