import {VoiceLanguageActions} from '../actions';

const initialState = {
  isSpeakDisabled: false,
  noneIsSelected: false,
  isAnimationDisabled: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case VoiceLanguageActions?.types.SELECT_NONE_OPTION: {
      return {
        ...state,
        noneIsSelected: action?.payload,
      };
    }
    case VoiceLanguageActions?.types.IS_DISABLE_SPEAK: {
      return {
        ...state,
        isSpeakDisabled: action?.payload,
      };
    }
    case VoiceLanguageActions?.types.IS_DISABLE_ANIMATION: {
      return {
        ...state,
        isAnimationDisabled: action?.payload,
      };
    }
  }
  return state;
};
export default reducer;
