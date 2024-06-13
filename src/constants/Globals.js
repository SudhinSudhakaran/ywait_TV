import {BUILD_SOURCE} from '../enums/Enums';

export default {
  //demo : 6082c2c53d655c1d25e0b58d
  //Service : 6136211c8a1fec162da9084e
  //QA  hospital : 5d8863b8c813af1d131db5d5
  //Aster hospital : 6322dec6600e070d1ea35162
  //Alnoor hospital (insta) : 636ca3af5fee3c66781c200a
  //Application id
  //Alnoor hospital  : 'com.ywait.alNoor.serve'

  // This fields should be change if new flavour build is taken
  // **********************************************************************************************

  BUSINESS_ID: '636ca3af5fee3c66781c200a',
  CUSTOM_BUILD_SOURCE: BUILD_SOURCE.ALNOOR,
  SPEAK_CONSULTANT_NAME: false, // it should be false when take alnoor apps
  HIDE_CONSULTANT_IF_NO_TOKEN: true,
  PRACTO_BUILD: true, // true for alnoor, insta
  // **********************************************************************************************
  IS_SPLIT_TOKEN_SCREEN: false,
  IS_SINGLE_CONSULTANT_BUSINESS: true,
  IS_AUTHORIZED: false,
  TOKEN: null,
  BUSINESS_DETAILS: {},
  USER_DETAILS: {},
  SAVED_TV_POINT_DETAILS: {},
  TOAST_TIME_INTERVAL: 5000,
  SELECTED_TV_POINT: [],
  SELECTED_LANGUAGE: 'en',
  IS_LANGUAGE_CHANGED: 'false',
  DEVICE_LANGUAGE: 'en',
  IS_TV_POINT_SELECTED: false,
  PREVIOUS_SPLIT_SCREEN_DATA_LENGTH: 1,
  PREVIOUS_SINGLE_SCREEN_DATA_LENGTH: 1,
  //Used for Storage
  STORAGE_KEYS: {
    IS_AUTH: 'isAuthorized',
    TOKEN: 'token',
    BUSINESS_DETAILS: 'businessDetails',
    USER_DETAILS: 'userDetails',
    SELECTED_TV_POINT_INFO: 'selectedTVPointInfo',
    IS_SPLIT_SCREEN_ENABLED: 'isSplitScreenEnabled',
    IS_SHOW_LIVE_TOKENS: 'isShowLiveTokens',
    SELECTED_LANGUAGE_INDEX: 'selectedLanguageIndex',
    SELECTED_LANGUAGE: 'language',
    IS_LANGUAGE_CHANGED: 'is_language_changed',
    IS_SPEAK_DISABLED: 'is_speak_disabled',
    SET_RTL: 'set_is_rtl',
    IS_LIVE_TOKENS_ENABLED: 'is_live_tokens_enabled',
  },
  ENGLISH: {
    id: '123456',
    title: 'English',
    languageCode: 'en-US',
    region: 'United States',
  },
  SELECTED_LANGUAGE_LIST: [],
  PREVIOUS_TOKENS_LIST: [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ],
  ROOMS: [101, 204, 352, 425, 102, 208, 204, 352, 425, 102, 208],
  ROOMS_LEFT: [425, 204, 102, 101, 208, 352, 102, 101, 208, 352],
  PREVIOUS_SPLIT_SCREEN_TOKENS_LIST: [
    {leftServingUserDetails: [], rightServingUserDetails: []},
    {leftServingUserDetails: [], rightServingUserDetails: []},
    {leftServingUserDetails: [], rightServingUserDetails: []},
    {leftServingUserDetails: [], rightServingUserDetails: []},
    {leftServingUserDetails: [], rightServingUserDetails: []},
    {leftServingUserDetails: [], rightServingUserDetails: []},
    {leftServingUserDetails: [], rightServingUserDetails: []},
    {leftServingUserDetails: [], rightServingUserDetails: []},
    {leftServingUserDetails: [], rightServingUserDetails: []},
    {leftServingUserDetails: [], rightServingUserDetails: []},
  ],

  // Global variables for new Screen components

  PREVIOUS_TOKEN_LIST: [],
  PREVIOUS_TOKEN_LIST_FOR_LIVE_TOKENS: [],
};

/*
SPA - '5cf610fb384ef274d2f3c79c',
Hospital - '5d8863b8c813af1d131db5d5'
*/
