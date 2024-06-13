import {DisplayLanguageActions} from '../actions';
const initialState = {
  languagechanged: false,
  selectedlanguage: 'en',
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DisplayLanguageActions.types.SET_LANGUAGE: {
      return {
        ...state,
        selectedlanguage: action?.payload,
      };
    }
    case DisplayLanguageActions.types.SELECT_LANGUAGE: {
      return {
        ...state,
        languagechanged: action?.payload,
      };
    }
    case DisplayLanguageActions.types.REMOVE_LANGUAGE: {
      return {
        ...state,
        selectedlanguage: action?.payload,
      };
    }
  }
  return state;
};

export default reducer;
