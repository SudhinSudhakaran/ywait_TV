const types = {
  IS_DISABLE_SPEAK: 'IS_DISABLE_SPEAK',
  IS_DISABLE_ANIMATION: 'IS_DISABLE_ANIMATION',
  SELECT_NONE_OPTION: 'SELECT_NONE_OPTION',
};

const selectNoneOption = option => {
  return {
    type: types.SELECT_NONE_OPTION,
    payload: option,
  };
};

const disableSpeak = option => {
  return {
    type: types.IS_DISABLE_SPEAK,
    payload: option,
  };
};
const disableAnimation = option => {
  return {
    type: types.IS_DISABLE_ANIMATION,
    payload: option,
  };
};
export default {
  types,
  disableSpeak,
  selectNoneOption,
  disableAnimation,
};
