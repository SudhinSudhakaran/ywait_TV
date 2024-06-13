const types = {
  SET_LANGUAGE_LIST: 'SET_LANGUAGE_LIST',
  SET_SELECTED_LANGUAGE_INDEX: 'SET_SELECTED_LANGUAGE_INDEX',
  ADD_LANGUAGE: 'ADD_LANGUAGE',
  REMOVE_LANGUAGE: 'REMOVE_LANGUAGE',
  SET_DUMMY_LANGUAGE_LIST: 'SET_DUMMY_LANGUAGE_LIST',
  REMOVE_DUMMY_LANGUAGE_LIST: 'REMOVE_DUMMY_LANGUAGE_LIST',
};

const setLanguageList = list => {
  return {
    type: types.SET_LANGUAGE_LIST,
    payload: list,
  };
};
const setSelectedLanguageIndex = index => {
  return {
    type: types.SET_SELECTED_LANGUAGE_INDEX,
    payload: index,
  };
};

const addLanguage = _index => {
  return {
    type: types.ADD_LANGUAGE,
    payload: _index,
  };
};
const removeLanguage = _index => {
  return {
    type: types.REMOVE_LANGUAGE,
    payload: _index,
  };
};

const setDummyLanguageList = list => {
  return {
    type: types.SET_DUMMY_LANGUAGE_LIST,
    payload: list,
  };
};
const removeDummyLanguageList = list => {
  return {
    type: types.REMOVE_DUMMY_LANGUAGE_LIST,
    payload: list,
  };
};
export default {
  types,
  setLanguageList,
  setSelectedLanguageIndex,
  addLanguage,
  removeLanguage,
  setDummyLanguageList,
  removeDummyLanguageList,
};
