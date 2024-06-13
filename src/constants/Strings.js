import {BUILD_SOURCE} from '../enums/Enums';
import Globals from './Globals';

export default {
  //Alnoor staging version number 30
  APP_VERSION:
    Globals.CUSTOM_BUILD_SOURCE === BUILD_SOURCE.ALNOOR
      ? '0.0.42'
      : Globals.CUSTOM_BUILD_SOURCE === BUILD_SOURCE.YWAIT
      ? '0.0.23'
      : '0.0.55',
  NO_INTERNET: 'No internet connection!',
  SERVER_BUSY: 'Server busy!',
  UNKNOWN_ERROR: 'The application has encountered an unknown error.',
  TOKEN_NOT_FOUND: 'Authorization token not found!.',
  PLEASE_SELECT_TV_POINT: 'Please select a TV point to proceed.',
  ENABLE_SPLIT_SCREEN: 'Enable Split Screen',
  SPLIT_SCREEN_DESCRIPTION:
    'Allows you to display multiple\nconsultants and their appointment status.',
  SELECT_TV_POINT: 'Select TV Point',
  SELECT_TV_POINT_DESCRIPTION:
    'Select any of the point to display\nthe status of the appointment.',
  LOGOUT: 'Logout',
  LOGOUT_DESCRIPTION: 'Allows you to logout\nfrom the account.',
  SELECT_LANGUAGE: 'Select Language',
  SELECT_LANGUAGE_DESCRIPTION: 'Allows you to use multiple\n language.',
};
