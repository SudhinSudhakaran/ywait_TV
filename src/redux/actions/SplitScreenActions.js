const types = {
  SET_ENABLE_SPLIT_SCREEN: 'SET_ENABLE_SPLIT_SCREEN',
};

const setEnableSplitScreen = enable => {
  return {
    type: types.SET_ENABLE_SPLIT_SCREEN,
    payload: enable,
  };
};

export default {
  types,
  setEnableSplitScreen,
};
