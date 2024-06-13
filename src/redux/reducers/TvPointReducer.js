import {TvPointActions} from '../actions';

const initialState = {
  tvPointListLength: 5,
  tvPointList: [],
  isTvItemSelected: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TvPointActions.types.IS_TV_POINT_ITEM_SELECTED: {
      return {
        ...state,
        isTvItemSelected: action?.payload,
      };
    }
    case TvPointActions.types.SET_TV_POINT_LIST_LENGTH: {
      return {
        ...state,
        tvPointListLength: action?.payload,
      };
    }
    case TvPointActions.types.SET_SELECTED_TV_POINT: {
      return {
        ...state,
        tvPointList: action?.payload,
      };
    }
  }
  return state;
};
export default reducer;
