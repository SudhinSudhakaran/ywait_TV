/* eslint-disable no-lone-blocks */
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {t} from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import Utils from '../../helpers/utils/Utils';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import React, {useEffect, useState, useRef, createRef} from 'react';
import DataManager from '../../helpers/api/DataManager';
import Translations from '../../constants/Translations';
import APIConnection from '../../helpers/api/APIConnection';
import {Colors, Fonts, Globals, Images} from '../../constants';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {filterAppointmentAvailableList} from './functions/FilterAppoinmentAvailableList';
import SingleServingUserFilledView from '../../componets/SingleServingUserFilledView';
import MultipleServingUserSplitView from '../../componets/MultipleServingUserSplitView';
import Tts from 'react-native-tts';
import {useFocusEffect} from '@react-navigation/native';
import {updatePlaySoundStatus} from './functions/UpdateTokenPlaySoundStatus';
import {DataListActions, MenuActions} from '../../redux/actions';
import StorageManager from '../../helpers/storage/StorageManager';

// import Video from 'react-native-video';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
// ref
export const mainSplitCarouselRef = createRef();
const NewSplitCarouselScreen = () => {
  // Local States
  const [index, setIndex] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isOdd, setIsOdd] = useState(false);
  const [autoplayLeftDelay, setAutoplayLeftDelay] = useState(4000);
  const [autoplayRightDelay, setAutoplayRightDelay] = useState(4000);
  const [autoPlayDelay, setAutoPlayDelay] = useState(8000);
  const [isFirstTime, setIsFirstTime] = useState(true);
  // Redux States
  const {isRTL} = useSelector(state => state?.AlignmentState);
  const {isSpeakDisabled} = useSelector(state => state?.VoiceLanguageState);
  // const {dataList} = useSelector(state => state?.DataListState);
  const dispatch = useDispatch();
  let timeoutId;
  let toneTimeOut;
  const refVideo = useRef();
  // const tokenSound = require('../../../assets/audios/tokenSound.mp3');
  const tokenSound =
    Platform.OS !== 'windows'
      ? require('../../../assets/audios/tokenSound.mp3')
      : {uri: 'ms-appx:///Assets/tokenSound.mp3'};
  const [isPaused, setIsPaused] = useState(true);
  let _autoPlayDelay = 8000;

  /**
    * Purpose:fetch appointment list 
    * Created/Modified By:Sudhin Sudhakaran
    * Created/Modified Date: 24 Apr 2023
    * Steps: 1. Calling the api
             2. Check the response with selected tv point list 
             3. Creating new object with consultant detais , arrivedlist, serving list
    */
  useEffect(() => {
    fetchAppointmentList();
    var apiHandler = setInterval(fetchAppointmentList, 10000); // 15000 = 15 Sec

    return () => {
      clearInterval(apiHandler);
    };
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        Tts.stop();
      };
    }, []),
  );
  useFocusEffect(
    React.useCallback(() => {
      scrollCarousel(0);
      return () => {};
    }, [isFirstTime]),
  );

  // useEffect(() => {
  //   console.log('Autoplay delay', autoplayDelay);
  //   return () => {};
  // }, [autoplayDelay]);
  /**
    * Purpose:fetch appointment list 
    * Created/Modified By:Sudhin Sudhakaran
    * Created/Modified Date: 24 Apr 2023
    * Steps: 1. Calling the api
             2. Check the response with selected tv point list 
             3. Creating new object with consultant detais , arrivedlist, serving list
    */
  let appointmentList = [];
  const fetchAppointmentList = () => {
    // console.log(
    //   'Globals.SAVED_TV_POINT_DETAILS',
    //   Globals.SAVED_TV_POINT_DETAILS,
    // );

    let url =
      APIConnection.BASE_URL + APIConnection.ENDPOINTS.ALL_APPOINTMENT_LIST;
    // Step 1 :-
    DataManager.getBusinessDetails(url).then(
      ([isSuccess, message, responseData]) => {
        // console.log('fetchAppointmentList DATA:===========> ', responseData);
        appointmentList = [];
        if ((Globals.SAVED_TV_POINT_DETAILS?.consultants.length ?? 0) > 0) {
          Globals.SAVED_TV_POINT_DETAILS?.consultants.forEach(
            (savedItem, index) => {
              responseData.objects.forEach(item => {
                if (savedItem._id === item.rooms_cons) {
                  // console.log('find item', item);
                  let _arrivedList = [];
                  let _servingList = [];
                  if (savedItem.type === 'ROOM') {
                    _arrivedList = item.bookings
                      .filter(_item => _item.vitalStatus === 'ARRIVED')
                      .map(newItem => ({
                        ...newItem,
                        type: savedItem.type,
                        isNewInRoom: true,
                        isNewInConsultant: true,
                      }));

                    _servingList = item.bookings
                      .filter(_item => _item.vitalStatus === 'SERVING')
                      .map(newItem => ({
                        ...newItem,
                        type: savedItem.type,
                        isNewInRoom: true,
                        isNewInConsultant: true,
                      }));
                  } else {
                    _arrivedList = item.bookings
                      .filter(
                        _item =>
                          _item.status === 'PENDING' ||
                          _item.status === 'ARRIVED',
                      )
                      .map(newItem => ({
                        ...newItem,
                        type: savedItem.type,
                        isNewInRoom: true,
                        isNewInConsultant: true,
                      }));

                    _servingList = item.bookings
                      .filter(_item => _item.status === 'SERVING')
                      .map(newItem => ({
                        ...newItem,
                        type: savedItem.type,
                        isNewInRoom: true,
                        isNewInConsultant: true,
                      }));
                  }

                  let obj = {
                    // arrived list

                    arrivedList: {
                      arrivedCustomerListTop: _arrivedList
                        ? _arrivedList?.slice(0, 8)
                        : [],

                      arrivedCustomerListBottom: _arrivedList
                        ? _arrivedList?.slice(8, 100)
                        : [],
                    },

                    // Serving list
                    servingList: _servingList,
                    //type
                    type: savedItem?.type,
                    roomNumber: Utils.getRoomNumber(
                      savedItem?.additionalInfo || [],
                    ),
                    //name
                    name:
                      savedItem?.type === 'ROOM'
                        ? savedItem?.display_name
                        : savedItem.name,
                    //first name
                    firstName: savedItem.firstName,
                    //last name
                    lastName: savedItem.lastName,
                    //designation
                    designation: savedItem?.designation_id?.designation || '',
                    //display name
                    display_name: savedItem?.display_name || '',
                    consultantDetails: {
                      image:
                        Globals.SAVED_TV_POINT_DETAILS?.consultants[index]
                          ?.image,

                      roomNumber: Utils.getRoomNumber(
                        savedItem?.additionalInfo || [],
                      ),
                      type: savedItem?.type,
                      firstName: savedItem.firstName,
                      lastName: savedItem.lastName,
                      name:
                        savedItem?.type === 'ROOM'
                          ? savedItem?.display_name
                          : savedItem.name,
                      designation: savedItem?.designation_id?.designation || '',
                      display_name: savedItem?.display_name || '',
                    },
                  };
                  appointmentList.push(obj);
                  // console.log('.........................', obj);
                }
              });
            },
          );
          //   /**
          //    <---------------------------------------------------------------------------------------------->
          //    * Purpose: filter the data by available appointments
          //    * Created/Modified By: Sudhin Sudhakaran
          //    * Created/Modified Date: 04-05-2023
          //    * Steps:
          //    * 1.   Call filterAppointmentAvailableList
          //    * 2.   Pass appointmentList as parameter
          //    * 3    this function return new array
          //    <---------------------------------------------------------------------------------------------->
          //    */
        }
        // console.log('appointment list', appointmentList);
        //  setDataList(filterAppointmentAvailableList(appointmentList));
        const _newTokenList = filterAppointmentAvailableList(appointmentList);
        configDataForSplitScreen(_newTokenList);
      },
    );
  };

  const configDataForSplitScreen = data => {
    if (data.length > 1) {
      dispatch(DataListActions.setAllowSplitScreen(true));
    } else {
      dispatch(DataListActions.setAllowSplitScreen(false));
      StorageManager.saveIsSplitScreenEnabled(false);
      Globals.IS_SPLIT_TOKEN_SCREEN = false;
      dispatch(MenuActions.setIsSplitScreenEnable(false));
    }

    /**
     * Purpose: Check the  data length is odd or even
     * Created/Modified By: Sudhin Sudhakaran
     * Created/Modified Date: 2 May 2023}
     * Steps:
     * 1.   Find the modulus of data.length
     * 2.   if the reminder is 0 then it is even otherwise odd
     * 3.
     */

    let formattedArray = [];
    /**
     * Purpose: formatting new data
     * Created/Modified By: Sudhin Sudhakaran
     * Created/Modified Date:2 May 2023 }
     * Steps:
     * 1.   check the length of data
     * 2.   assign  the  value to left variable
     * 3.   assign  the  value to right variable
     * 4.   push an object with left and right item
     */
    if (data.length > 0) {
      for (let i = 0; i < data.length; i += 2) {
        const left = data[i];
        const right = data[i + 1] || {};

        formattedArray.push({
          leftArrivedList: left.arrivedList,
          leftServingUserDetails: left.consultantDetails,
          leftServingList: left.servingList || [],

          rightArrivedList: right.arrivedList,
          rightServingUserDetails: right.consultantDetails,
          rightServingList: right.servingList || [],
        });
      }

      /**
       * Purpose: Remove undefined data
       * Created/Modified By: Sudhin Sudhakaran
       * Created/Modified Date:2 May 2023 }
       * Steps:
       * 1.   check isOdd is true or false
       * 2.   delete right side data of last object of formattedArray
       * 3.
       */
      // Remove properties from last object if data length is odd
      console.log('length===', data.length);
      if (data.length % 2 !== 0) {
        // console.log('inside delete function');
        delete formattedArray[formattedArray.length - 1].rightArrivedList;
        delete formattedArray[formattedArray.length - 1]
          .rightServingUserDetails;
        delete formattedArray[formattedArray.length - 1].rightServingList;
      }
    }
    // console.log('new Data===', formattedArray);

    let carouselIndex = mainSplitCarouselRef.current?.currentIndex ?? 0;
    let oldTokenList = [
      ...(dataList?.[carouselIndex]?.leftServingList || []),
      ...(dataList?.[carouselIndex]?.rightServingList || []),
    ].map(item => item.token);

    let _newTokenServingList = [
      ...(formattedArray?.[carouselIndex]?.leftServingList || []),
      ...(formattedArray?.[carouselIndex]?.rightServingList || []),
    ].map(item => item.token);
    console.log('_newTokenServingList', _newTokenServingList);
    console.log('oldTokenList', oldTokenList);

    if ((oldTokenList.length ?? 0) > 0) {
      let difference = [];

      for (let i = 0; i < _newTokenServingList.length; i++) {
        let isNew = true;
        for (let j = 0; j < oldTokenList.length; j++) {
          if (_newTokenServingList[i] === oldTokenList[j]) {
            isNew = false;
            break;
          }
        }
        if (isNew) {
          difference.push(_newTokenServingList[i]);
        }
      }

      console.log('difference', difference);

      if (difference.length > 0) {
        scrollCarousel(carouselIndex);
      }
    } else {
    }

    setDataList(formattedArray);

    setIsLoading(false);
    if (isFirstTime === true) {
      // console.log('inside first time');
      setIsFirstTime(false);
    }
  };
  /**
   * Purpose: Scroll to the next item
   * Created/Modified By: Sudhin Sudhakaran
   * Created/Modified Date: 2 May 2023}
   * Steps:
   * 1.   Check the ref and current are not undefined
   * 2.   call snapToNext function after 10 second
   * 3.   if the index is last the scroll to 0th position
   * 4.   Creating consultant name for left and right data
   * 5.   Creating room name for left and right data
   * 6.   filtering new array with new tokens (isNewInConsultant,isNewInRoom)
   * 7.   Creating a string with newly added token numbers
   * 8.   Pass the string to tts speak function
   */

  const scrollCarousel = _index => {
    setIndex(_index);
    clearTimeout(timeoutId);

    mainSplitCarouselRef.current && mainSplitCarouselRef.current.stopAutoplay();

    const selectedTokenItem = dataList?.[_index];

    if (selectedTokenItem !== undefined) {
      let leftConsultantName = Utils.configConsultantName(
        selectedTokenItem?.leftServingUserDetails?.name || '   ',
      );
      let rightConsultantName = Utils.configConsultantName(
        selectedTokenItem?.rightServingUserDetails?.name || '   ',
      );

      setAutoplayLeftDelay(4000);
      setAutoplayRightDelay(4000);

      let leftRoomNo = Utils.addSpace(
        selectedTokenItem?.leftServingUserDetails?.roomNumber || '',
      );
      let rightRoomNo = Utils.addSpace(
        selectedTokenItem?.rightServingUserDetails?.roomNumber || '',
      );

      let _leftServingList = selectedTokenItem?.leftServingList || [];
      let _rightServingList = selectedTokenItem?.rightServingList || [];

      let isNewLeftTokenData =
        selectedTokenItem?.leftServingUserDetails?.type === 'ROOM'
          ? _leftServingList
              .filter(d => d?.type === 'ROOM' && d?.isNewInRoom === true)
              .slice(0, 6)
          : _leftServingList
              .filter(
                d => d?.type === 'CONSULTANT' && d?.isNewInConsultant === true,
              )
              .slice(0, 6);

      let isNewRightTokenData =
        selectedTokenItem?.rightServingUserDetails?.type === 'ROOM'
          ? _rightServingList
              .filter(d => d?.type === 'ROOM' && d?.isNewInRoom === true)
              .slice(0, 6)
          : _rightServingList
              .filter(
                d => d?.type === 'CONSULTANT' && d?.isNewInConsultant === true,
              )
              .slice(0, 6);

      const leftDelay =
        isNewLeftTokenData.length > 1
          ? (isNewLeftTokenData.length - 1) * 2500 + 4500
          : 4000;
      setAutoplayLeftDelay(leftDelay);

      const rightDelay =
        isNewRightTokenData.length > 1
          ? (isNewRightTokenData.length - 1) * 2500 + 4500
          : 4000;
      setAutoplayRightDelay(rightDelay);

      setAutoPlayDelay(leftDelay + rightDelay);

      const newTokenData = [...isNewLeftTokenData, ...isNewRightTokenData];
      let leftTokenList = [];
      let rightTokenList = [];

      if (isNewLeftTokenData?.length > 0) {
        setIsPaused(false);
        isNewLeftTokenData?.forEach(i => {
          const [letters, numbers] = i.token.match(/[A-Za-z]+|[0-9]+/g);
          const spacedLetters = letters.split('').join(' , ');
          let _t = `${spacedLetters},  ${numbers}`;
          leftTokenList.push(_t);
        });
      }
      if (isNewRightTokenData?.length > 0) {
        setIsPaused(false);
        isNewRightTokenData?.forEach(i => {
          const [letters, numbers] = i.token.match(/[A-Za-z]+|[0-9]+/g);
          const spacedLetters = letters.split('').join(' , ');
          let _t = `${spacedLetters},  ${numbers}`;
          rightTokenList.push(_t);
        });
      }

      let leftSpeakText = '';
      if (leftTokenList?.length > 0) {
        let leftSelectedValuesInString = leftTokenList.join('  ,     ');
        if (Globals.SPEAK_CONSULTANT_NAME === true) {
          leftSpeakText = `Token number ${leftSelectedValuesInString} for ${
            leftConsultantName || 'doc'
          }.`;
        } else {
          leftSpeakText =
            selectedTokenItem?.leftServingUserDetails?.type === 'ROOM'
              ? `Token number ${leftSelectedValuesInString} for room  ${selectedTokenItem?.leftServingUserDetails?.name}.`
              : `Token number ${leftSelectedValuesInString} for room number   ${leftRoomNo}.`;
        }
      }

      let rightSpeakText = '';
      if (rightTokenList?.length > 0) {
        let rightSelectedValuesInString = rightTokenList.join('  ,     ');
        if (Globals.SPEAK_CONSULTANT_NAME === true) {
          rightSpeakText = `Token number ${rightSelectedValuesInString} for ${
            rightConsultantName || 'doc'
          }.`;
        } else {
          rightSpeakText =
            selectedTokenItem?.rightServingUserDetails?.type === 'ROOM'
              ? `Token number ${rightSelectedValuesInString} for  room  ${selectedTokenItem?.rightServingUserDetails.name}.`
              : `Token number ${rightSelectedValuesInString} for room number   ${rightRoomNo}.`;
        }
      }

      let _speakText =
        leftSpeakText && rightSpeakText
          ? `${leftSpeakText} '   and    ' ${rightSpeakText}`
          : leftSpeakText || rightSpeakText || '';

      let allNewTokenList = [...isNewLeftTokenData, ...isNewRightTokenData];

      if (isSpeakDisabled === false) {
        Tts.stop();
        Tts.speak(_speakText);
      }

      timeoutId = setTimeout(() => {
        if (_index === dataList.length - 1) {
          mainSplitCarouselRef.current &&
            mainSplitCarouselRef.current.snapToItem(0, true, true);
        } else {
          mainSplitCarouselRef.current &&
            mainSplitCarouselRef.current.startAutoplay();
        }

        updatePlaySoundStatus(newTokenData);
      }, autoPlayDelay);

      speakNewTokens(allNewTokenList);
    }
  };

  // const scrollCarousel = _index => {
  //   // if (refVideo.current) {
  //   //   refVideo.current.seek(0); // Seek to the beginning of the video
  //   // }
  //   setIndex(_index);
  //   clearTimeout(timeoutId);

  //   mainSplitCarouselRef.current && mainSplitCarouselRef.current.stopAutoplay();
  //   // console.log('data list', dataList);

  //   const selectedTokenItem = dataList?.[_index];

  //   if (selectedTokenItem !== undefined) {
  //     // Step 4
  //     let leftConsultantName = Utils.configConsultantName(
  //       selectedTokenItem?.leftServingUserDetails?.name || '   ',
  //     );
  //     let rightConsultantName = Utils.configConsultantName(
  //       selectedTokenItem?.rightServingUserDetails?.name || '   ',
  //     );

  //     setAutoplayLeftDelay(4000);
  //     setAutoplayRightDelay(4000);
  //     // Step 5
  //     let leftRoomNo = '';
  //     if (
  //       selectedTokenItem?.leftServingUserDetails?.roomNumber !== '' &&
  //       selectedTokenItem?.leftServingUserDetails?.roomNumber !== undefined
  //     ) {
  //       leftRoomNo = Utils.addSpace(
  //         selectedTokenItem?.leftServingUserDetails?.roomNumber,
  //       );
  //     }
  //     let rightRoomNo = '';
  //     if (
  //       selectedTokenItem?.rightServingUserDetails?.roomNumber !== undefined &&
  //       selectedTokenItem?.rightServingUserDetails?.roomNumber !== ''
  //     ) {
  //       rightRoomNo = Utils.addSpace(
  //         selectedTokenItem?.rightServingUserDetails?.roomNumber,
  //       );
  //     }
  //     //Step 6
  //     let _leftServingList = selectedTokenItem?.leftServingList || [];
  //     let _rightServingList = selectedTokenItem?.rightServingList || [];
  //     // console.log('_leftServingList', _leftServingList);
  //     let _speakText = '';
  //     let isNewLeftTokenData = [];
  //     let isNewRightTokenData = [];

  //     if (selectedTokenItem?.leftServingUserDetails?.type === 'ROOM') {
  //       isNewLeftTokenData = _leftServingList
  //         .filter(d => d?.type === 'ROOM' && d?.isNewInRoom === true)
  //         .slice(0, 6);
  //     } else {
  //       isNewLeftTokenData = _leftServingList
  //         .filter(
  //           d => d?.type === 'CONSULTANT' && d?.isNewInConsultant === true,
  //         )
  //         .slice(0, 6);
  //     }
  //     if (selectedTokenItem?.rightServingUserDetails?.type === 'ROOM') {
  //       isNewRightTokenData = _rightServingList
  //         .filter(d => d?.type === 'ROOM' && d?.isNewInRoom === true)
  //         .slice(0, 6);
  //     } else {
  //       isNewRightTokenData = _rightServingList
  //         .filter(
  //           d => d?.type === 'CONSULTANT' && d?.isNewInConsultant === true,
  //         )
  //         .slice(0, 6);
  //     }

  //     if (isNewLeftTokenData.length > 1) {
  //       const leftDelay = (isNewLeftTokenData.length - 1) * 2500 + 4500;
  //       console.log('isNewLeftTokenData inside', isNewLeftTokenData, leftDelay);

  //       setAutoplayLeftDelay(leftDelay);
  //     } else {
  //       setAutoplayLeftDelay(4000);
  //     }

  //     if (isNewRightTokenData.length > 1) {
  //       const rightDelay = (isNewRightTokenData.length - 1) * 2500 + 4500;
  //       console.log('isNewRightTokenData inside', isNewRightTokenData, rightDelay);

  //       setAutoplayRightDelay(rightDelay);
  //     } else {
  //       setAutoplayRightDelay(4000);
  //     }

  //     setAutoPlayDelay(autoplayLeftDelay + autoplayRightDelay);

  //     const newTokenData = [...isNewLeftTokenData, ...isNewRightTokenData];
  //     let leftTokenList = [];
  //     let rightTokenList = [];

  //     if (isNewLeftTokenData?.length > 0) {
  //       setIsPaused(false);
  //       isNewLeftTokenData?.map(i => {
  //         const [letters, numbers] = i.token.match(/[A-Za-z]+|[0-9]+/g);
  //         const spacedLetters = letters.split('').join(' , '); // add spaces between letters
  //         let _t = `${spacedLetters},  ${numbers}`;

  //         // console.log('iiiiiiiiiiiii', i.token, _t);

  //         leftTokenList.push(_t);
  //       });
  //     }
  //     if (isNewRightTokenData?.length > 0) {
  //       setIsPaused(false);
  //       isNewRightTokenData?.map(i => {
  //         const [letters, numbers] = i.token.match(/[A-Za-z]+|[0-9]+/g);
  //         const spacedLetters = letters.split('').join(' , '); // add spaces between letters
  //         let _t = `${spacedLetters},  ${numbers}`;

  //         // console.log('iiiiiiiiiiiii', i.token, _t);

  //         rightTokenList.push(_t);
  //       });
  //     }
  //     // Step 7
  //     if (leftTokenList?.length > 0) {
  //       let leftSelectedValues = leftTokenList?.map(val => val);
  //       let leftSelectedValuesInString = leftSelectedValues.join('  ,     ');
  //       var leftSpeakText = '';

  //       if (Globals.SPEAK_CONSULTANT_NAME === true) {
  //         leftSpeakText = `Token number ${leftSelectedValuesInString} for ${
  //           leftConsultantName || 'doc'
  //         }.`;
  //       } else {
  //         if (selectedTokenItem?.leftServingUserDetails?.type === 'ROOM') {
  //           leftSpeakText = `Token number ${leftSelectedValuesInString} for room  ${selectedTokenItem?.leftServingUserDetails?.name}.`;
  //         } else {
  //           leftSpeakText = `Token number ${leftSelectedValuesInString} for room number   ${leftRoomNo}.`;
  //         }
  //       }

  //       // console.log('speakText: ======> ', leftSpeakText);
  //     }

  //     if (rightTokenList?.length > 0) {
  //       let rightSelectedValues = rightTokenList?.map(val => val);
  //       let rightSelectedValuesInString = rightSelectedValues.join('  ,     ');

  //       var rightSpeakText = '';
  //       if (Globals.SPEAK_CONSULTANT_NAME === true) {
  //         rightSpeakText = `Token number ${rightSelectedValuesInString} for ${
  //           rightConsultantName || 'doc'
  //         }.`;
  //       } else {
  //         if (selectedTokenItem?.rightServingUserDetails.type === 'ROOM') {
  //           rightSpeakText = `Token number ${rightSelectedValuesInString} for  room  ${selectedTokenItem?.rightServingUserDetails.name}.`;
  //         } else {
  //           rightSpeakText = `Token number ${rightSelectedValuesInString} for room number   ${rightRoomNo}.`;
  //         }
  //       }

  //       // console.log('speakText: ======> ', rightSpeakText);
  //     }

  //     if (leftSpeakText !== undefined && rightSpeakText !== undefined) {
  //       _speakText = `${leftSpeakText} '   and    ' ${rightSpeakText}`;
  //     } else if (leftSpeakText !== undefined) {
  //       _speakText = ` ${leftSpeakText}`;
  //     } else if (rightSpeakText !== undefined) {
  //       _speakText = `${rightSpeakText}`;
  //     } else {
  //     }
  //     let allNewTokenList = [...isNewLeftTokenData, ...isNewRightTokenData];
  //     // Step 8
  //     if (isSpeakDisabled === false) {
  //       Tts.stop();
  //       Tts.speak(_speakText);
  //     }

  //     console.log(
  //       'delay in split carousel ============>',
  //       autoPlayDelay,autoplayLeftDelay + autoplayRightDelay,index
  //     );

  //     timeoutId = setTimeout(() => {
  //       console.log('index', _index);
  //       if (_index === dataList.length - 1) {
  //         mainSplitCarouselRef.current &&
  //           mainSplitCarouselRef.current.snapToItem(0, true, true);
  //       } else {
  //         mainSplitCarouselRef.current &&
  //           mainSplitCarouselRef.current.startAutoplay();
  //       }

  //       updatePlaySoundStatus(newTokenData);
  //     }, autoPlayDelay);
  //     speakNewTokens(allNewTokenList);
  //   } else {
  //   }
  // };
  /**
 <---------------------------------------------------------------------------------------------->
 * Purpose: Speak function 
 * Created/Modified By: Sudhin Sudhakaran
 * Created/Modified Date: 05-05-2023
 * Steps:
 * 1.   this function is used to assign false values to isNewInRoom and IsNewInConsultant
 <---------------------------------------------------------------------------------------------->
 */
  const speakNewTokens = spokedList => {
    // console.log('.......................', spokedList);

    if ((spokedList.length ?? 0) > 0) {
      for (let i = 0; i < spokedList.length; i++) {
        const spokedTokenItem = spokedList[i];

        for (let j = 0; j < Globals.PREVIOUS_TOKEN_LIST.length; j++) {
          const oldTokenItem = Globals.PREVIOUS_TOKEN_LIST[j];
          if (spokedTokenItem.token === oldTokenItem.token) {
            // console.log('oldTokenItem', spokedTokenItem.type, oldTokenItem);
            if (spokedTokenItem.type === 'CONSULTANT') {
              Globals.PREVIOUS_TOKEN_LIST[j].isNewInConsultant = false;
            } else {
              Globals.PREVIOUS_TOKEN_LIST[j].isNewInRoom = false;
            }
          }
        }
      }

      console.log(
        ' Globals.PREVIOUS_TOKEN_LIST ====',
        Globals.PREVIOUS_TOKEN_LIST,
      );
    }
  };
  /**
   * Purpose: Render single screen item
   * Created/Modified By: Sudhin Sudhakaran
   * Created/Modified Date: 03-05-2023
   * Steps:
   * 1.   render the component
   * 2.   pass the item , index and arrivedList as props
   * 3.
   */
  const renderItem = ({item, index}) => {
    /**
     * Purpose: render the screen for each item
     * Created/Modified By: Sudhin Sudhakaran
     * Created/Modified Date:2 May 2023 }
     * Steps:
     * 1.   check  isOdd key and and render singleServingUserFilledView if it is true and item is last in the data
     * 2.
     * 3.
     */
    const objectLength = Object.keys(item).length;

    // console.log('render item =================', objectLength);

    if (objectLength === 3) {
      // console.log('render single screen', item);
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: perfectSize(80),
          }}>
          <SingleServingUserFilledView
            item={item}
            leftServingList={item?.leftServingList}
            leftArrivedCustomerListTop={
              (item?.leftArrivedList.length ?? 0) > 0
                ? item?.leftArrivedList?.slice(0, 8)
                : []
            }
            leftArrivedCustomerListBottom={
              (item?.leftArrivedList.length ?? 0) > 0
                ? item?.leftArrivedList?.slice(8, 100)
                : []
            }
            index={index}
            // arrivedList={[]}
          />
        </View>
      );
    } else {
      // console.log('render split screen', item);
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: perfectSize(80),
          }}>
          <MultipleServingUserSplitView item={item} index={index} />
        </View>
      );
    }
  };
  /**
   <---------------------------------------------------------------------------------------------->
   * Purpose: Empty component
   * Created/Modified By: Sudhin Sudhakaran
   * Created/Modified Date: 04-05-2023
   * Steps:
   * 1.   Render this component if no items in carousel
   <---------------------------------------------------------------------------------------------->
   */
  const EmptyComponent = () => {
    return (
      <View
        style={{
          marginLeft: perfectSize(800),
          alignItems: 'center',
          // alignContent: 'center',
          alignSelf: 'center',
          flex: 1,
        }}>
        <Image
          source={Images.NO_APPOINTMENT}
          style={{
            width: perfectSize(150),
            height: perfectSize(150),
            marginTop: perfectSize(100),
            tintColor: Colors.PRIMARY_COLOR,
            transform: [{scaleX: isRTL ? -1 : 1}],
          }}
        />
        <Text
          style={{
            alignSelf: 'center',
            color: Colors.SECONDARY_COLOR,
            fontFamily: Fonts.Poppins_SemiBold,
            textAlign: isRTL ? 'right' : 'left',
            fontSize: 20,
            // marginTop: perfectSize(-50),
          }}>
          {t(Translations.NO_APPOINMENT_TEXT)}
        </Text>
      </View>
    );
  };
  /**
   * Purpose: Main render component
   * Created/Modified By: Sudhin Sudhakaran
   * Created/Modified Date: 03-05-2023
   * Steps:
   * 1.   return the main view
   */
  return (
    <>
      <View
        style={{
          marginTop: perfectSize(8),
          flex: 1,

          marginBottom: perfectSize(Platform.OS === 'windows' ? 16 : 0),
        }}>
        {isLoading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <Carousel
            ref={mainSplitCarouselRef}
            style={{transform: [{translateY: 0}]}}
            listKey={'unique-list-key-46546466266546624'}
            keyExtractor={(mainItem, mainItemIndex) => mainItemIndex.toString()}
            sliderWidth={perfectSize(1920)}
            itemWidth={perfectSize(1920)}
            scrollEnabled={false}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            loop={true}
            autoplay={true}
            autoplayInterval={8000}
            onSnapToItem={slideIndex => {
              scrollCarousel(slideIndex);
            }}
            data={dataList || []}
            horizontal={true}
            renderItem={renderItem}
            ListEmptyComponent={!isLoading ? EmptyComponent : null}
          />
        )}

        <Pagination
          dotsLength={dataList?.length ?? 0}
          activeDotIndex={index}
          containerStyle={{
            position: 'absolute',
            bottom: perfectSize(-20),
            alignSelf: 'center',
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
          dotStyle={{
            width: perfectSize(20),
            height: perfectSize(20),
            borderRadius: perfectSize(10),
            marginHorizontal: perfectSize(5),
            backgroundColor: Colors.PRIMARY_COLOR,
          }}
          inactiveDotStyle={{
            backgroundColor: Colors.SECONDARY_COLOR,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
      {/* <Video
        source={tokenSound} // Can be a URL or a local file.
        ref={refVideo}
        paused={isPaused}
        audioOnly={true}
        playWhenInactive
        playInBackground
        repeat={true}
      /> */}
    </>
  );
};

export default NewSplitCarouselScreen;

const styles = StyleSheet.create({});
