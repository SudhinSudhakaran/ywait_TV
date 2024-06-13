const types = {
  ANIMATION_INDEX: 'ANIMATION_INDEX',
};

const setAnimationIndex = index => {
  return {
    type: types.ANIMATION_INDEX,
    payload: index,
  };
};
export default {
  types,
  setAnimationIndex,
};
