import {Globals} from '../../../constants';
import Utils from '../../../helpers/utils/Utils';

/**
 <---------------------------------------------------------------------------------------------->
 * Purpose: Filter appointments
 * Created/Modified By: Sudhin Sudhakaran
 * Created/Modified Date: 03-05-2023
 * Steps:
 * 1.   Map the given list
 * 2.   Check each items  length of arrived list or serving list
 * 3.   push the data to _filteredArray 
 * 4.   return new array
 <---------------------------------------------------------------------------------------------->
 */
export const filterAppointmentAvailableList = data => {
  const list = [...data];
  // console.log('List', list);
  let _filteredArray = [];
  let _arrayAfterAddedNewKey = [];
  list.forEach(_listItem => {
    if (
      (_listItem?.arrivedList?.arrivedCustomerListTop?.length ?? 0) > 0 || // use nullish coalescing operator to handle undefined values
      (_listItem?.servingList?.length ?? 0) > 0
    ) {
      _filteredArray.push(_listItem);
    }
  });

  if (Globals.PREVIOUS_TOKEN_LIST.length > 0) {
    let newTokens = [];
    let allNewTokenList = [];
    let previousTokenList = [];
    _filteredArray.forEach(item => {
      let newTokenList = [
        ...item?.servingList,
        ...item?.arrivedList?.arrivedCustomerListTop,
        ...item?.arrivedList?.arrivedCustomerListBottom,
      ];
      allNewTokenList = [...allNewTokenList, ...newTokenList];
    });

    // console.log('allNewTokenList', allNewTokenList);
    previousTokenList = Globals.PREVIOUS_TOKEN_LIST;

    // console.log('previousTokenList', previousTokenList);

    for (let i = 0; i < allNewTokenList.length; i++) {
      let isNew = true;
      for (let j = 0; j < previousTokenList.length; j++) {
        if (allNewTokenList[i].token === previousTokenList[j].token) {
          isNew = false;
          break;
        }
      }
      if (isNew) {
        newTokens.push(allNewTokenList[i]);
      }
    }

    // console.log('newItem added', newTokens);

    if (newTokens.length > 0) {
      newTokens.map((data, index) => {
        let obj = {};
        obj.token = data.token;
        obj.isNewInRoom = true;
        obj.isNewInConsultant = true;
        Globals.PREVIOUS_TOKEN_LIST.push(obj);
      });
    }
    // console.log('Globals.PREVIOUS_TOKEN_LIST', Globals.PREVIOUS_TOKEN_LIST);

    let modifiedTokenList = [];

    // Check if the filtered array is not empty
    if (_filteredArray?.length > 0) {
      // Loop through the filtered array
      for (let i = 0; i < _filteredArray.length; i++) {
        const newTokenElement = _filteredArray[i];

        // Merge the servingList, arrivedListTop and arrivedCustomerListBottom arrays into a newTokenElementList
        const newTokenElementList = [
          ...(newTokenElement?.servingList ?? []),
          ...(newTokenElement?.arrivedList?.arrivedCustomerListTop ?? []),
          ...(newTokenElement?.arrivedCustomerListBottom ?? []),
        ];

        // Loop through the previous token list
        for (let j = 0; j < Globals.PREVIOUS_TOKEN_LIST.length; j++) {
          const previousTokenElement = Globals.PREVIOUS_TOKEN_LIST[j];

          // Create a new array of servingList elements
          let newServingList = [];
          let newArrivedList = [];
          // Loop through the new token element list
          for (let k = 0; k < newTokenElementList.length; k++) {
            const tokenElement = newTokenElementList[k];

            // Check if the token element in newTokenElementList matches the previousTokenElement
            if (tokenElement?.token === previousTokenElement?.token) {
              // If the token is not new in consultant, set the isNewInConsultant flag to false

              /**
               <---------------------------------------------------------------------------------------------->
               * Purpose: Check each token with is playSound Key
               * Created/Modified By: Sudhin Sudhakaran
               * Created/Modified Date: 18-05-2023
               * Steps:
               * 1.   isNewInConsultant and isNewInRoom are  changed to false if only when play sound is false
               <---------------------------------------------------------------------------------------------->
               */
              if (
                previousTokenElement.isNewInConsultant === false &&
                (tokenElement?.playSound ?? false) === false
              ) {
                tokenElement.isNewInConsultant = false;
              } else {
                tokenElement.isNewInConsultant = true;
              }

              // If the token is not new in room, set the isNewInRoom flag to false
              if (
                previousTokenElement?.isNewInRoom === false &&
                (tokenElement?.playSound ?? false) === false
              ) {
                tokenElement.isNewInRoom = false;
              } else {
                tokenElement.isNewInRoom = true;
              }
              // console.log('token Element', tokenElement)
            }

            // Add the modified token element to the newServingList array

            if (tokenElement.type === 'ROOM') {
              if (tokenElement.vitalStatus === 'SERVING') {
                newServingList.push(tokenElement);
              } else if (tokenElement.vitalStatus === 'ARRIVED') {
                newArrivedList.push(tokenElement);
              }
            } else {
              if (tokenElement.status === 'SERVING') {
                newServingList.push(tokenElement);
              } else if (
                tokenElement.status === 'ARRIVED' ||
                tokenElement.status === 'PENDING'
              ) {
                newArrivedList.push(tokenElement);
              }
            }
          }

          // Update the servingList of the newTokenElement with the newServingList array
          newTokenElement.servingList = newServingList;
          newTokenElement.arrivedList = newArrivedList;
          // console.log('newTokenElement', newTokenElement);
        }

        // Add the modified newTokenElement to the modifiedTokenList array
        modifiedTokenList.push(newTokenElement);
      }
    }

    // console.log('modifiedTokenList', modifiedTokenList);
    _arrayAfterAddedNewKey = [...modifiedTokenList];
  } else {
    // console.log('0000000000000000', _filteredArray);
    let newFilteredTokenList = [];
    newFilteredTokenList = _filteredArray.map(item => {
      let obj = {...item};
      obj.arrivedList = [
        ...item?.arrivedList?.arrivedCustomerListTop,
        ...item?.arrivedList?.arrivedCustomerListBottom,
      ];
      // console.log('obj', obj);
      return obj;
    });
    _filteredArray.forEach((_listItem, index) => {
      if (
        _listItem?.servingList?.length > 0 ||
        _listItem?.arrivedList.arrivedCustomerListTop?.length > 0
      ) {
        let mergedTokenList = [
          ..._listItem?.servingList,
          ..._listItem?.arrivedList?.arrivedCustomerListTop,
          ..._listItem?.arrivedList?.arrivedCustomerListBottom,
        ];

        let mergedUniqTokenList = mergedTokenList.filter(
          (item, index) => mergedTokenList.indexOf(item) === index,
        );

        mergedUniqTokenList.map((data, index) => {
          // console.log('newdata', data, index);
          let obj = {};
          obj.token = data.token;
          obj.isNewInRoom = true;
          obj.isNewInConsultant = true;
          Globals.PREVIOUS_TOKEN_LIST.push(obj);
        });
      }
    });

    // console.log('newFilteredTokenList', newFilteredTokenList);
    _arrayAfterAddedNewKey = [...newFilteredTokenList];

    // console.log(
    //   'Globals.PREVIOUS_TOKEN_LIST in first time',
    //   Globals.PREVIOUS_TOKEN_LIST,
    // );
  }

  //  console.log('_arrayAfterAddedNewKey', _arrayAfterAddedNewKey);

  // add tts string and time

  if ((_arrayAfterAddedNewKey?.length ?? 0) > 0) {
    _arrayAfterAddedNewKey = _arrayAfterAddedNewKey.map(item => {
      // step 4
      const selectedServingList = item?.servingList || [];

      let consultantName = Utils.configConsultantName(
        item?.consultantDetails?.name || '   ',
      );
      // step 5
      let roomNo = '';
      if (item.roomNumber) {
        roomNo = Utils.addSpace(item?.roomNumber);
      }

      let isNewTokenData = [];
      if (item.type === 'ROOM') {
        isNewTokenData = selectedServingList
          .filter(d => d?.isNewInRoom === true)
          .slice(0, 6);
      } else {
        isNewTokenData = selectedServingList
          .filter(d => d?.isNewInConsultant === true)
          .slice(0, 6);
      }
      item.isNewTokenData = isNewTokenData;
      // Step 7
      let tokenList = [];
      if (isNewTokenData?.length > 0) {
        isNewTokenData?.map(i => {
          const [letters, numbers] = i.token.match(/[A-Za-z]+|[0-9]+/g);
          const spacedLetters = letters.split('').join(' , '); // add spaces between letters
          let _t = `${spacedLetters},  ${numbers}`;
          tokenList.push(_t);
        });
      }

      if (isNewTokenData?.length > 1) {
        item.delay = (isNewTokenData.length - 1) * 2500 + 4500; // 4.5 second for single token

        //
      } else {
        item.delay = 8000;
      }

      if (tokenList.length > 0) {
        let selectedValues = tokenList.map(val => val);
        let selectedValuesInString = selectedValues.join('  ,     ');

        if (Globals.SPEAK_CONSULTANT_NAME === true) {
          item.speakText = `Token number ${selectedValuesInString} for  ${
            consultantName || 'doc'
          }`;
        } else {
          if (item.type === 'ROOM') {
            item.speakText = `Token number ${selectedValuesInString} for room   ${item?.name}`;
          } else {
            item.speakText = `Token number ${selectedValuesInString} for room number   ${roomNo}`;
          }
        }
      }
      // console.log('item /////////////////////////////', item);
      return item; // Added return statement
    });
  }

  return _arrayAfterAddedNewKey;
};
