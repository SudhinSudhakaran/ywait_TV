const types = {
ALLOW_SPLIT_SCREEN: 'ALLOW_SPLIT_SCREEN',
};

const setAllowSplitScreen = option => {
  return {
    type: types.ALLOW_SPLIT_SCREEN,
    payload: option,
  };
};

export default {
  types,
  setAllowSplitScreen,
};
