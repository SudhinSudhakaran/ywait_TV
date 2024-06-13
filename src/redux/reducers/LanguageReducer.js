import {LanguageActions} from '../actions';
const initialState = {
  selectedLanguageIndex: [0],
  selectedLanguageList: [
    {
      id: '123456',
      title: 'English',
      languageCode: 'en-US',
      region: 'United States',
    },
  ],
  dummyLanguageList: [
    {
      id: '123456',
      title: 'English',
      languageCode: 'en-US',
      region: 'United States',
    },
  ],
  languageList: [
    {
      id: '123456',
      title: 'English',
      languageCode: 'en-US',
      region: 'United States',
    },
    {
      id: '123457',
      title: 'Arabic',
      languageCode: 'ar-SA',
      region: 'Saudi Arabia',
    },
    {
      id: '12345745',
      title: 'Hindi',
      languageCode: 'hi-IN',
      region: 'india',
    },
    {
      id: '1234574522',
      title: 'Russian',
      languageCode: 'ru-RU',
      region: 'Russian Federation',
    },
    {
      id: '123574522',
      title: 'Tamil',
      languageCode: 'ta-IN',
      region: 'India',
    },
    {
      id: '12553574522',
      title: 'Test',
      languageCode: 'gfjkhgdjfg',
      region: 'India',
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LanguageActions?.types.SET_LANGUAGE_LIST: {
      return {
        ...state,
        languageList: action?.payload,
      };
    }
    case LanguageActions?.types.SET_SELECTED_LANGUAGE_INDEX: {
      return {
        ...state,
        selectedLanguageIndex: action?.payload,
      };
    }
    case LanguageActions?.types?.ADD_LANGUAGE: {
      let lang = [...state.selectedLanguageList, ...action?.payload];
      // let uniqueLangArray = [...new Set(lang.map(item => item))];

      var resArr = [];
      lang.filter(function (item) {
        var i = resArr.findIndex(x => x.id == item.id);
        if (i <= -1) {
          resArr.push(item);
        }
        return null;
      });
      // console.log('redux uniqueLangArray', resArr);
      return {
        ...state,
        selectedLanguageList: resArr,
      };
    }
    case LanguageActions?.types?.SET_DUMMY_LANGUAGE_LIST: {
      let lang = [ ...action?.payload];
      // let uniqueLangArray = [...new Set(lang.map(item => item))];

      var resArr = [];
      lang.filter(function (item) {
        var i = resArr.findIndex(x => x.id === item.id);
        if (i <= -1) {
          resArr.push(item);
        }
        return null;
      });
      // console.log('uniq Dummy LangArray', resArr);
      return {
        ...state,
        dummyLanguageList: resArr,
      };
    }

    case LanguageActions?.types?.REMOVE_DUMMY_LANGUAGE_LIST: {
      let lang = [...state.dummyLanguageList];
      // let uniqueLangArray = [...new Set(lang.map(item => item))];

      var resArr = [];
      resArr = lang.filter(i => i.id !== action.payload.id);
      // console.log('uniq Dummy LangArray', resArr);
      return {
        ...state,
        dummyLanguageList: resArr,
      };
    }

    case LanguageActions?.types?.REMOVE_LANGUAGE: {
      return {
        ...state,
        selectedLanguageList: action.payload,
      };
    }
  }
  return state;
};
export default reducer;
