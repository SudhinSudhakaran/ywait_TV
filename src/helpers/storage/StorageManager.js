import { Globals } from "../../constants";
import { AppStorage } from "./AppStorage";


export default class StorageManager {
  /**
        *
        Purpose:clear data from Async storage
       * Created/Modified By: Jenson
       * Created/Modified Date: 03 August 2021
       * Steps:
           1.Clear the data in the Async storage
        */
  static ClearAllData = async () => {
    try {
      let res = await AppStorage.clearAll();
      return res;
    } catch (e) {
      //consol.log(e)
    }
  };

  /**
        *
        Purpose:clear data from Async storage
       * Created/Modified By: Jenson
       * Created/Modified Date: 03 August 2021
       * Steps:
           1.Clear the data in the Async storage
        */
  static ClearUserRelatedData = async () => {
    try {
      Globals.TOKEN = null;
      let keys = [
        Globals.STORAGE_KEYS.USER_DETAILS,
        Globals.STORAGE_KEYS.IS_AUTH,
        Globals.STORAGE_KEYS.TOKEN,
        Globals.STORAGE_KEYS.IS_SPLIT_SCREEN_ENABLED,
        Globals.STORAGE_KEYS.SELECTED_TV_POINT_INFO,
        // Globals.STORAGE_KEYS.SELECTED_LANGUAGE_INDEX,
      ];
      let res = await AppStorage.clearItems(keys);
      return res;
    } catch (e) {
      console.log('ClearUserRelatedData: ', e);
    }
  };

  /**
  *
  Purpose:Save the value in to result in Async storage
 * Created/Modified By: Jenson John
 * Created/Modified Date:  21 Oct 2021
 * Steps:
     1.Create the value true
     2.Store the value into result
  */

  static saveToken = async info => {
    try {
      await AppStorage.setItem(Globals.STORAGE_KEYS.TOKEN, info);
    } catch (e) {}
  };

  /**
       *
       Purpose:Get the value
      * Created/Modified By: Jenson John
      * Created/Modified Date: 21 Oct 2021
      * Steps:
          1.Get the value from Async storage
          2.return the value
       */
  static getSavedToken = async () => {
    try {
      let res = await AppStorage.getItem(Globals.STORAGE_KEYS.TOKEN);
      return res;
    } catch (e) {}
  };

  /**
       *
       Purpose:Get the value
      * Created/Modified By: Jenson John
      * Created/Modified Date: 21 Oct 2021
      * Steps:
          1.Get the value from Async storage
          2.return the value
       */
  static getIsAuthorized = async () => {
    try {
      let res = await AppStorage.getItem(Globals.STORAGE_KEYS.IS_AUTH);
      return res;
    } catch (e) {}
  };

  /**
   *
   Purpose:Save the value in to result in Async storage
  * Created/Modified By: Jenson John
  * Created/Modified Date:  21 Oct 2021
  * Steps:
      1.Create the value true
      2.Store the value into result
   */

  static saveBusinessDetails = async info => {
    try {
      await AppStorage.setItem(Globals.STORAGE_KEYS.BUSINESS_DETAILS, info);
    } catch (e) {}
  };

  /**
       *
       Purpose:Get the value
      * Created/Modified By: Jenson John
      * Created/Modified Date: 21 Oct 2021
      * Steps:
          1.Get the value from Async storage
          2.return the value
       */
  static getSavedBusinessDetails = async () => {
    try {
      let res = await AppStorage.getItem(Globals.STORAGE_KEYS.BUSINESS_DETAILS);
      return res;
    } catch (e) {}
  };

  /**
   *
   Purpose:Save the value in to result in Async storage
  * Created/Modified By: Jenson John
  * Created/Modified Date:  21 Oct 2021
  * Steps:
      1.Create the value true
      2.Store the value into result
   */

  static saveUserDetails = async info => {
    try {
      await AppStorage.setItem(Globals.STORAGE_KEYS.USER_DETAILS, info);
      await AppStorage.setItem(Globals.STORAGE_KEYS.IS_AUTH, 'true');
    } catch (e) {}
  };

  /**
       *
       Purpose:Get the value
      * Created/Modified By: Jenson John
      * Created/Modified Date: 21 Oct 2021
      * Steps:
          1.Get the value from Async storage
          2.return the value
       */
  static getSavedUserDetails = async () => {
    try {
      let res = await AppStorage.getItem(Globals.STORAGE_KEYS.USER_DETAILS);
      return res;
    } catch (e) {}
  };

  /**
     *
     Purpose:Save the value in to result in Async storage
    * Created/Modified By: Jenson John
    * Created/Modified Date:  02 Nov 2021
    * Steps:
        1.Create the value true
        2.Store the value into result
     */

  static saveSelectedTVPoint = async info => {
    try {
      console.log('Recvd tv point to sav: ', info);
      await AppStorage.setItem(
        Globals.STORAGE_KEYS.SELECTED_TV_POINT_INFO,
        info,
      );
    } catch (e) {
      console.log('Error saveSelectedTVPoint: ', e);
    }
  };

  /**
       *
       Purpose:Get the value
      * Created/Modified By: Jenson John
      * Created/Modified Date: 02 Nov 2021
      * Steps:
          1.Get the value from Async storage
          2.return the value
       */
  static getSavedSelectedTVPoint = async () => {
    try {
      let res = await AppStorage.getItem(
        Globals.STORAGE_KEYS.SELECTED_TV_POINT_INFO,
      );
      return res;
    } catch (e) {}
  };

  /**
  *
  Purpose:Save the value in to result in Async storage
 * Created/Modified By: Jenson John
 * Created/Modified Date:  02 Nov 2021
 * Steps:
     1.Create the value true
     2.Store the value into result
  */

  static saveIsSplitScreenEnabled = async info => {
    try {
      await AppStorage.setItem(
        Globals.STORAGE_KEYS.IS_SPLIT_SCREEN_ENABLED,
        info,
      );
    } catch (e) {}
  };
  static saveIsLiveTokensEnabled = async info => {
    try {
      await AppStorage.setItem(
        Globals.STORAGE_KEYS.IS_LIVE_TOKENS_ENABLED,
        info,
      );
    } catch (e) {}
  };
  /**
       *
       Purpose:Get the value
      * Created/Modified By: Jenson John
      * Created/Modified Date: 02 Nov 2021
      * Steps:
          1.Get the value from Async storage
          2.return the value
       */
  static getSavedIsSplitScreenEnabled = async () => {
    try {
      let res = await AppStorage.getItem(
        Globals.STORAGE_KEYS.IS_SPLIT_SCREEN_ENABLED,
      );
      return res;
    } catch (e) {}
  };
  static getSavedIsLiveTokensEnabled = async () => {
    try {
      let res = await AppStorage.getItem(
        Globals.STORAGE_KEYS.IS_LIVE_TOKENS_ENABLED,
      );
      return res;
    } catch (e) {}
  };

  /**
  *
  Purpose:Save the value in to result in Async storage
 * Created/Modified By: Jenson John
 * Created/Modified Date:  02 Nov 2021
 * Steps:
     1.Create the value true
     2.Store the value into result
  */

     static saveIsShowLiveTokensEnabled = async info => {
      try {
        await AppStorage.setItem(
          Globals.STORAGE_KEYS.IS_SHOW_LIVE_TOKENS,
          info,
        );
      } catch (e) {}
    };
  
    /**
         *
         Purpose:Get the value
        * Created/Modified By: Jenson John
        * Created/Modified Date: 02 Nov 2021
        * Steps:
            1.Get the value from Async storage
            2.return the value
         */
    static getSavedIsShowLiveTokensEnabled = async () => {
      try {
        let res = await AppStorage.getItem(
          Globals.STORAGE_KEYS.IS_SHOW_LIVE_TOKENS,
        );
        return res;
      } catch (e) {}
    };






  static saveSelectedLanguageIndex = async index => {
    try {
      await AppStorage.setItem(
        Globals.STORAGE_KEYS.SELECTED_LANGUAGE_INDEX,
        index,
      );
    } catch (e) {}
  };

  static getSelectedLanguageIndex = async () => {
    try {
      let res = await AppStorage.getItem(
        Globals.STORAGE_KEYS.SELECTED_LANGUAGE_INDEX,
      );
      return res;
    } catch (e) {}
  };
  static saveLanguage = async info => {
    try {
      return await AppStorage.setItem(
        Globals.STORAGE_KEYS.SELECTED_LANGUAGE,
        info,
      );
    } catch (e) {}
  };

  /**
     *
     Purpose:Get the value
    * Created/Modified By: Jenson John
    * Created/Modified Date: 27 Dec 2021
    * Steps:
        1.Get the value from Async storage
        2.return the value
     */
  static getSavedLanguage = async () => {
    try {
      let res = await AppStorage.getItem(
        Globals.STORAGE_KEYS.SELECTED_LANGUAGE,
      );
      return res;
    } catch (e) {}
  };

  // language changes related data
  static saveIsLanguageChanged = async info => {
    try {
      return await AppStorage.setItem(
        Globals.STORAGE_KEYS.IS_LANGUAGE_CHANGED,
        info,
      );
    } catch (e) {}
  };

  static getSavedLanguageChanged = async () => {
    try {
      let res = await AppStorage.getItem(
        Globals.STORAGE_KEYS.IS_LANGUAGE_CHANGED,
      );
      return res;
    } catch (e) {}
  };

  //voice changes related data
  static setSpeakDisabled = async info => {
    try {
      return await AppStorage.setItem(
        Globals.STORAGE_KEYS.IS_SPEAK_DISABLED,
        info,
      );
    } catch (e) {}
  };

  static getSetSpeakDisabled = async () => {
    try {
      let res = await AppStorage.getItem(
        Globals.STORAGE_KEYS.IS_SPEAK_DISABLED,
      );
      return res;
    } catch (e) {}
  };

  //voice changes related data
  static setSpeakDisabled = async info => {
    try {
      return await AppStorage.setItem(
        Globals.STORAGE_KEYS.IS_SPEAK_DISABLED,
        info,
      );
    } catch (e) {}
  };

  static getSetSpeakDisabled = async () => {
    try {
      let res = await AppStorage.getItem(
        Globals.STORAGE_KEYS.IS_SPEAK_DISABLED,
      );
      return res;
    } catch (e) {}
  };

  //rtl changes related data
  static setIsRtl = async info => {
    try {
      return await AppStorage.setItem(
        Globals.STORAGE_KEYS.SET_RTL,
        info,
      );
    } catch (e) {}
  };

  static getIsRtl = async () => {
    try {
      let res = await AppStorage.getItem(
        Globals.STORAGE_KEYS.SET_RTL,
      );
      return res;
    } catch (e) {}
  };
}
