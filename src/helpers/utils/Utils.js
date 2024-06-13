import Toast from 'react-native-toast-message';
import {Colors} from '../../constants';

export default class Utils {
  static getRoomNumber = arr => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key === 'roomNumber') {
        return arr[i].value;
      }
    }
    return ''; // Return null if key is not found
  };
  static getAbbreviation = value => {
    console.log('getAbbreviation ---------------------------', value);
    let word = value.split(' ');
    return `${word[0][0]}${word[1][0] || ''} `;
  };

  static configConsultantName = name => {
    let _name = name.slice(3);
    return 'Doctor ' + _name;
  };

  static addSpace(str) {
    return str.replace(/(E)(B)/g, '$1 $2');
  }
  static showToast(
    message,
    subMessage = '',
    type = 'error',
    position = 'bottom',
  ) {
    Toast.show({
      type: 'tomatoToast', //'success | error | info '
      text1: message,
      text2: subMessage,
      position: position,
      topOffset: 60,
      bottomOffset: 100,
      visibilityTime: 3000,
      autoHide: true,
    });
  }

  static hideToast() {
    Toast.hide();
  }
  static Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  static isEmailValid(email) {
    //  const reg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email) === true;
  }

  static isValidUrl(userInput) {
    if (userInput === undefined) {
      return false;
    }
    // console.log('isValidUrl userInput: ', userInput);
    var res = userInput?.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    if (res === null) {
      return false;
    } else {
      return true;
    }
  }

  static getDefaultAvatarImageURL(fullName) {
    // console.log('fullName', fullName);
    let avatarURL =
      'https://ui-avatars.com/api/?size=512&rounded=true&name=' +
      fullName +
      '&color=' +
      Colors.PRIMARY_COLOR.replace('#', '');
    // console.log('getDefaultAvatarImageURL: ', avatarURL);
    return avatarURL;
  }
  static changeColor(color, amount) {
    // #FFF not supportet rather use #FFFFFF
    const clamp = val => Math.min(Math.max(val, 0), 0xff);
    const fill = str => ('00' + str).slice(-2);

    const num = parseInt(color.substr(1), 16);
    const red = clamp((num >> 16) + amount);
    const green = clamp(((num >> 8) & 0x00ff) + amount);
    const blue = clamp((num & 0x0000ff) + amount);
    return (
      '#' +
      fill(red.toString(16)) +
      fill(green.toString(16)) +
      fill(blue.toString(16))
    );
  }
}
