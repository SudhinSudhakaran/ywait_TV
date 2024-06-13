const types = {
    SET_LANGUAGE:'SET_LANGUAGE',
    SELECT_LANGUAGE:'SELECT_LANGUAGE',
    REMOVE_LANGUAGE:'REMOVE_LANGUAGE',
}
const setLanguage = selectedLanguage => {
    return {
      type: types.SET_LANGUAGE,
      payload:selectedLanguage,
    };
  };
  const selectLanguage = _index => {
    return {
      type: types.SELECT_LANGUAGE,
      payload:_index,
    };
  };
  const removeLanguage = _index => {
    return {
      type: types.REMOVE_LANGUAGE,
      payload:_index,
    };
  };
  export default {
    types,
    setLanguage,
    selectLanguage,
    removeLanguage,
  };