const types = {
  SET_SELECTED_TV_POINT: 'SET_SELECTED_TV_POINT',
  SET_TV_POINT_LIST_LENGTH: 'SET_TV_POINT_LIST_LENGTH',
  SET_TV_POINT_LIST: 'SET_TV_POINT_LIST',
  IS_TV_POINT_ITEM_SELECTED : 'IS_TV_POINT_ITEM_SELECTED',
};

const setIsTvItemSelected = option => {
  // console.log('setIsTvItemSelected called');
  return {
    type: types.IS_TV_POINT_ITEM_SELECTED,
    payload: option,
  };
};

const setSelectedTvPoint = tvPoint => {
  return {
    type: types.SET_SELECTED_TV_POINT,
    payload: tvPoint,
  };
};
const setSelectedTvPointListLength = tvPointLength => {
  return {
    type: types.SET_TV_POINT_LIST_LENGTH,
    payload: tvPointLength,
  };
};

const setTvPointList = tvPointList => {
  return {
    type: types.SET_SELECTED_TV_POINT,
    payload: tvPointList,
  };
};
export default {
  types,
  setSelectedTvPoint,
  setSelectedTvPointListLength,
  setTvPointList,
  setIsTvItemSelected,
};
