import {Globals} from '../../constants';

// https://ywait.in:2003 --> Staging
// https://y-wait.com:2001 --> QA
// https://y-wait.com:5002 --> Development
// https://ywait.org:8881 --> Prod
// https://y-wait.com:5010 --> insta dev
// https://ywait.in:2019 --> iNsta Alnoor(Staging)
// Alnoor insta production (live new with port 2019) : https://instaprodapi.ywaitapp.com:2019
export default {
  BASE_URL: 'https://instaprodapi.ywaitapp.com:2019/app/',
  DEFAULT_URL: 'https://ywait.org:8881/app/admin/',
  PROD_URL: 'https://ywait.org:8881/app/admin/',
  ENDPOINTS: {
    BUSINESS_DETAILS: 'admin/details/business/' + Globals.BUSINESS_ID,
    LOGIN: 'admin/email/login',
    APPOINTMENT_LIST: 'admin/appointment/list',
    ALL_APPOINTMENT_LIST: 'tv/appointment/list',
    USER_DETAILS: 'admin/user/' + Globals.BUSINESS_ID + '/',
    CAN_SERVE_USERS: 'admin/list/can-serve/' + Globals.BUSINESS_ID,
    TV_POINTS_LIST: 'admin/list/display/points/' + Globals.BUSINESS_ID,
    VITAL_LIST: 'admin/vitals/queue/', 

    UPDATE_PLAY_SOUND_STATUS: 'tv/appointment/announce'
  },

  KEYS: {
    BUSINESS_ID: 'business_id',
    USERNAME: 'userName',
    PASSWORD: 'password',
    USER_ID: 'user_id',
    AUTHORIZATION: 'Authorization',
    APPOINTMENT_ID:'appointment_id',
    REPLAY: 'replay'
  },
};
