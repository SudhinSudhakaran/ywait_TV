/**
 <---------------------------------------------------------------------------------------------->
 * Purpose: Update token playSound status
 * Created/Modified By: Sudhin Sudhakaran
 * Created/Modified Date: 19-05-2023
 * Steps:
 * 1.   pass appointment id and replay status to false
 <---------------------------------------------------------------------------------------------->
 */

import APIConnection from '../../../helpers/api/APIConnection';
import DataManager from '../../../helpers/api/DataManager';

export const updatePlaySoundStatus = list => {
  console.log('play sound status', list);

  if ((list.length ?? 0) > 0) {
    var promises = [];

    list.map(item => {
      let headers = {
        [APIConnection.KEYS.APPOINTMENT_ID]: item.bookingId,
        [APIConnection.KEYS.REPLAY]: false,
      };

      promises.push(DataManager.updatePlaySoundStatus(headers));
    });






  }
};
