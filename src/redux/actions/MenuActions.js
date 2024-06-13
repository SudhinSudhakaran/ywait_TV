const types = {
  SET_IS_TV_MENU_SELECTED: 'SET_IS_TV_MENU_SELECTED',
  SET_TV_OPTION_SELECTED: 'SET_TV_OPTION_SELECTED',
  SET_SETTING_OPTION_SELECTED: 'SET_SETTING_OPTION_SELECTED',
  SET_SELECT_TV_POINT_OPTION_SELECTED: 'SET_SELECT_TV_POINT_OPTION_SELECTED',
  SET_IS_SPLIT_SCREEN_ENABLED: 'SET_IS_SPLIT_SCREEN_ENABLED',
  SET_LOGOUT_OPTION_SELECTED: 'SET_LOGOUT_OPTION_SELECTED',
  SET_LOGOUT_SETTING_SELECTED: 'SET_LOGOUT_SETTING_SELECTED ',
};

const selectLogoutSettings = option => {
  return {
    type: types.SET_LOGOUT_SETTING_SELECTED,
    payload: option,
  };
};
const selectTvMenu = isSelected => {
  return {
    type: types.SET_IS_TV_MENU_SELECTED,
    payload: isSelected,
  };
};
const selectLogoutMenu = isSelected => {
  return {
    type: types.SET_LOGOUT_OPTION_SELECTED,
    payload: isSelected,
  };
};
const selectTvOption = isSelected => {
  return {
    type: types.SET_TV_OPTION_SELECTED,
    payload: isSelected,
  };
};
const selectSettingsOption = isSelected => {
  // console.log('selectSettingsOption function called', isSelected)
  return {
    type: types.SET_SETTING_OPTION_SELECTED,
    payload: isSelected,
  };
};
const selectTvPointOption = isSelected => {
  return {
    type: types.SET_SELECT_TV_POINT_OPTION_SELECTED,
    payload: isSelected,
  };
};
const setIsSplitScreenEnable = option => {
  return {
    type: types.SET_IS_SPLIT_SCREEN_ENABLED,
    payload: option,
  };
};
export default {
  types,
  selectTvMenu,
  selectTvOption,
  selectSettingsOption,
  selectTvPointOption,
  setIsSplitScreenEnable,
  selectLogoutMenu,
  selectLogoutSettings,
};
