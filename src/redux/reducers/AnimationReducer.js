import {AnimationActions} from '../actions';
const initialState = {
  selectedAnimationIndex: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AnimationActions.types.ANIMATION_INDEX: {
      return {
        ...state,
        selectedAnimationIndex: action?.payload,
      };
    }
  }
  return state;
};

export default reducer;
