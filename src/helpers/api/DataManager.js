import {Globals, Strings} from '../../constants';
import {NetworkManager} from './NetworkManager';
import NetworkUtils from '../utils/NetworkUtils';
import StorageManager from '../storage/StorageManager';
import APIConnection from './APIConnection';

export default class DataManager {
  /**
     * Purpose: Get getBusinessDetails
     * Created/Modified By: Jenson John
     * Created/Modified Date: 21 Oct 2021
     * Steps:
         1.Get the value from Async storage
         2.return the value
    */
  static getBusinessDetails = async (url) => {
    const headers={
      tvpoint_id:Globals.SAVED_TV_POINT_DETAILS?._id
      // 6440dc703b33c00d9d6c6e89
    }
    const isConnected = await NetworkUtils.isNetworkAvailable();
    // console.log('isConnected: ', isConnected);
    if (isConnected === false) {
      return [false, Strings.NO_INTERNET, null];
    } else {
      const response = await NetworkManager.get(url, headers);
      if (response.status === false) {
        return [false, response.message, null];
      } else {
        return [true, response.message, response.data];
      }
    }
  };

  /**
     * Purpose: Get getBusinessDetails
     * Created/Modified By: Jenson John
     * Created/Modified Date: 21 Oct 2021
     * Steps:
         1.Get the value from Async storage
         2.return the value
    */
  static performLogin = async (url, body = {}, headers = {}) => {
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (isConnected === false) {
      return [true, Strings.NO_INTERNET, null];
    } else {
      const response = await NetworkManager.post(url, body, headers);
      if (response.status === false) {
        return [false, response.message, null];
      } else {
        //Save token
        if (response.token !== null || response.token !== undefined) {
          StorageManager.saveToken(response.token);
          return [true, response.message, response.data];
        } else {
          return [false, Strings.TOKEN_NOT_FOUND, null];
        }
      }
    }
  };

  /**
    * Purpose: Get AppointmentList
    * Created/Modified By: Jenson John
    * Created/Modified Date: 21 Oct 2021
    * Steps:
      1.Get the value from Async storage
      2.return the value
    */
  static getAppointmentList = async (url, headers = {}) => {
    const isConnected = await NetworkUtils.isNetworkAvailable();
    // console.log('isConnected: ', isConnected);
    if (isConnected === false) {
      return [true, Strings.NO_INTERNET, null];
    } else {
      const response = await NetworkManager.get(url, headers);
      if (response.status === false) {
        return [false, response.message, null];
      } else {
        return [true, response.message, response.data];
      }
    }
  };
  static getRoomAppointmentList = async (url, headers = {}) => {
    // console.log('get room called');
    const isConnected = await NetworkUtils.isNetworkAvailable();
    // console.log('isConnected: ', isConnected);
    if (isConnected === false) {
      return [true, Strings.NO_INTERNET, null];
    } else {
      const response = await NetworkManager.get(url, headers);
      if (response.status === false) {
        return [false, response.message, null];
      } else {
        return [true, response.message, response.data];
      }
    }
  };

  /**
   * Purpose: Get User Details
   * Created/Modified By: Jenson John
   * Created/Modified Date: 22 Oct 2021
   * Steps:
     1.Get the value from Async storage
     2.return the value
   */
  static getUserDetails = async (url, headers = {}) => {
    const isConnected = await NetworkUtils.isNetworkAvailable();
    // console.log('isConnected: ', isConnected);
    if (isConnected === false) {
      return [false, Strings.NO_INTERNET, null];
    } else {
      const response = await NetworkManager.get(url, headers);
      if (response.status === false) {
        return [false, response.message, null];
      } else {
        return [true, response.message, response.data];
      }
    }
  };

  /**
    * Purpose: Get TV Points List
    * Created/Modified By: Jenson John
    * Created/Modified Date: 02 Nov 2021
    * Steps:
      1.Get the value from Async storage
      2.return the value
    */
  static getTVPointList = async (url, headers = {}) => {
    const isConnected = await NetworkUtils.isNetworkAvailable();
    // console.log('isConnected: ', isConnected);
    if (isConnected === false) {
      return [true, Strings.NO_INTERNET, null];
    } else {
      const response = await NetworkManager.get(url, headers);
      if (response.status === false) {
        return [false, response.message, null];
      } else {
        return [true, response.message, response.data];
      }
    }
  };






    /**
    * Purpose: Update playSound status
    * Created/Modified By: Sudhin Sudhakaran
    * Created/Modified Date: 19-05-2023
    * Steps:
      1. pass booking id to api
      2.return the value
    */
      static updatePlaySoundStatus = async ( headers = {}) => {
       
       let url = APIConnection.BASE_URL + APIConnection.ENDPOINTS.UPDATE_PLAY_SOUND_STATUS
       
        const isConnected = await NetworkUtils.isNetworkAvailable();
        // console.log('isConnected: ', isConnected);
        if (isConnected === false) {
          return [true, Strings.NO_INTERNET, null];
        } else {



          const response = await NetworkManager.get(url, headers);
          if (response.status === false) {
            return [false, response.message, null];
          } else {
            return [true, response.message, response.data];
          }
        }
      };
}
