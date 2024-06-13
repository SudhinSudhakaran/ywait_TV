import {MenuActions} from '../actions';
const initialState = {
  menuSelected: false,
  tvOptionSelected: true,
  settingOptionSelected: false,
  selectTvPointOptionSelected: false,
  isSplitScreenEnabled : false,
  isLogoutSelected: false,
  isLogoutSettingSelected :false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MenuActions.types.SET_LOGOUT_SETTING_SELECTED: {
      return {
        ...state,
        isLogoutSettingSelected: action?.payload,
      };
    }

    case MenuActions.types.SET_IS_TV_MENU_SELECTED: {
      return {
        ...state,
        menuSelected: action?.payload,
      };
    }
    case MenuActions.types.SET_LOGOUT_OPTION_SELECTED: {
      return {
        ...state,
        isLogoutSelected: action?.payload,
      };
    }
    case MenuActions.types.SET_TV_OPTION_SELECTED: {
      return {
        ...state,
        tvOptionSelected: action?.payload,
      };
    }
    case MenuActions.types.SET_SETTING_OPTION_SELECTED: {
      return {
        ...state,
        settingOptionSelected: action?.payload,
      };
    }

    case MenuActions.types.SET_SELECT_TV_POINT_OPTION_SELECTED: {
      return {
        ...state,
        selectTvPointOptionSelected: action?.payload,
      };
    }
    case MenuActions.types.SET_IS_SPLIT_SCREEN_ENABLED: {
      return {
        ...state,
        isSplitScreenEnabled: action?.payload,
      };
    }
  }
  return state;
};
export default reducer;
