/* eslint-disable no-shadow */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  LogBox,
  Platform,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {t} from 'i18next';
import Utils from '../../helpers/utils/Utils';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import DataManager from '../../helpers/api/DataManager';
import Translations from '../../constants/Translations';
import APIConnection from '../../helpers/api/APIConnection';
import {Colors, Fonts, Globals, Images} from '../../constants';
import NoNetworkComponent from '../../componets/NoNetworkComponent';
import SplitScreenCarousel from '../../componets/SplitScreenCarousel';
import LoadingIndicator from '../shared/loadingIndicator/LoadingIndicator';

let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

export default function TokenStatusDoubleScreen(props) {
  const navigation = useNavigation();
  const {isRTL} = useSelector(state => state.AlignmentState);

  // const refVideo = useRef();


  const [isLoading, setIsLoading] = useState(true);
  const [roomIsLoading, setRoomIsLoading] = useState(true);
  const [isAPIInProgress, setIsAPIInProgress] = useState(false);
  const [isSettingFocused, setIsSettingFocused] = useState(false);
  const [isHomeFocused, setIsHomeFocused] = useState(false);
  var tempPageItems = [];
  const [pageItems, setPageItems] = useState([]); //contains users, arrived details
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isOddServingUsers, setIsOddServingUsers] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  var tempActiveServingTokensList = [];
  const [activeServingTokensList, setActiveServingTokensList] = useState([]); //
  const [isOdd, setIsOdd] = useState(false);
  const tokenSound =
    Platform.OS !== 'windows'
      ? require('../../../assets/audios/tokenSound.mp3')
      : {uri: 'ms-appx:///Assets/tokenSound.mp3'};
  const [isPaused, setIsPaused] = useState(true);
  const dispatch = useDispatch();
  var tempRoomItems = [];
  let appointmentList = [];

  const [roomItems, setRoomItems] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const {languageList, selectedLanguageIndex} = useSelector(
    state => state?.LanguageState,
  );
  const [_appointmentList, setAppointmentList] = useState([]);

  let splitscreenUsers = [];
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  ///For back button override
  useEffect(() => {
    // console.log('Selected Tv Ponzt======.', Globals.SAVED_TV_POINT_DETAILS);
    const backAction = () => {
      Alert.alert(
        'Exit',
        'Are you sure you want to exit from the Application ?',
        [
          {
            text: 'STAY HERE',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'EXIT', onPress: () => BackHandler.exitApp()},
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
/**
 * Purpose: Listen network change
 * Created/Modified By: Sudhin Sudhakaran
 * Created/Modified Date: 03-05-2023
 * Steps:
 * 1.   Check network status
 * 2.   Change the value of the state
 * 3.   
 */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  /**
   * Purpose: fetchAppointmentList
   * Created/Modified By: Sudhin Sudhakaran
   * Created/Modified Date: 03-05-2023
   * Steps:
   * 1.   Assign a setInterval  to a variable
   * 2.   Call the fetch appointment function in every 10 sec
   * 3.   Clear the variable in return
   */
  useEffect(() => {

  
    
    fetchAppointmentList();
    var apiHandler = setInterval(fetchAppointmentList, 10000); // 15000 = 15 Sec

    return () => {
      clearInterval(apiHandler);
    };
  }, []);

  /**
    * Purpose:fetch appointment list 
    * Created/Modified By:Sudhin Sudhakaran
    * Created/Modified Date: 24 Apr 2023
    * Steps: 1. Calling the api
             2. Check the response with selected tv point list 
             3. Creating new object with consultant detais , arrivedlist, serving list
    */
  const fetchAppointmentList = () => {
    // console.log(
    //   'Globals.SAVED_TV_POINT_DETAILS',
    //   Globals.SAVED_TV_POINT_DETAILS,
    // );
    let appointmentList = [];

    let url =
      APIConnection.BASE_URL + APIConnection.ENDPOINTS.ALL_APPOINTMENT_LIST;
    // Step 1 :-
    DataManager.getBusinessDetails(url).then(
      ([isSuccess, message, responseData]) => {
        // console.log('fetchAppointmentList DATA:===========> ', responseData);

        if (isSuccess === true) {
          if (
            Globals.SAVED_TV_POINT_DETAILS?.consultants &&
            Globals.SAVED_TV_POINT_DETAILS?.consultants.length > 0
          ) {
            Globals.SAVED_TV_POINT_DETAILS?.consultants.forEach(
              (SavedItem, index) => {
                // console.log('SavedItem', SavedItem);
/**
 * Purpose: Config the response data
 * Created/Modified By: Sudhin Sudhakaran
 * Created/Modified Date: 03-05-2023
 * Steps:
 * 1.   create new object with needed items
 * 2.   Compare saved tv list with response data
 * 3.   if its present add the consultant or room details  from  saved data
 * 4.   Map the bookings array 
 * 5.   Separate arrived and serving list with status, if it is room compare with vitalStatus
 */
                responseData.objects.forEach(item => {
                  //Step:1
                  let obj = {
                    consultantDetails: {},
                    servingList: [],
                    arrivedList: [],
                    type: SavedItem?.type,
                    roomNumber: '',
                    name: '',
                  };
// Step:2
                  if (SavedItem._id === item.rooms_cons) {
                    obj.roomNumber = Utils.getRoomNumber(
                      SavedItem?.additionalInfo || [],
                    );

                    obj.name =
                      SavedItem?.type === 'ROOM'
                        ? SavedItem?.display_name
                        : SavedItem.name;

                    if (item.bookings && item.bookings.length > 0) {
                      if (SavedItem?.type === 'ROOM') {
                        item.bookings.forEach(bookingItem => {
                          if (bookingItem.vitalStatus === 'ARRIVED') {
                            obj.arrivedList.push(bookingItem);
                          } else if (bookingItem.vitalStatus === 'SERVING') {
                            let _bookingItem = {...bookingItem};
                            // _bookingItem.isNew = true;
                            obj.servingList.push(_bookingItem);
                          }
                        });
                      } else {
                        item.bookings.forEach(bookingItem => {
                          if (
                            bookingItem.status === 'ARRIVED' ||
                            bookingItem.status === 'PENDING'
                          ) {
                            obj.arrivedList.push(bookingItem);
                          } else if (bookingItem.status === 'SERVING') {
                            let _bookingItem = {...bookingItem};
                            // _bookingItem.isNew = true;
                            obj.servingList.push(_bookingItem);
                          }
                        });
                      }
                    }
                    let listLength =
                      obj.arrivedList.length + obj.servingList.length;
                    obj.consultantDetails = {
                      image: SavedItem?.image,
                      workingHours: [
                        Globals.SAVED_TV_POINT_DETAILS?.consultants[index]
                          ?.workingHours,
                      ],
                      roomNumber: Utils.getRoomNumber(
                        SavedItem?.additionalInfo || [],
                      ),
                      type: SavedItem?.type,
                      firstName: SavedItem.firstName,
                      lastName: SavedItem.lastName,
                      name:
                        SavedItem?.type === 'ROOM'
                          ? SavedItem?.display_name
                          : SavedItem.name,
                      designation: SavedItem?.designation_id?.designation || '',
                      display_name: SavedItem?.display_name || '',
                    };

                    if (Globals.HIDE_CONSULTANT_IF_NO_TOKEN === true) {
                      if (listLength > 0) {
                        appointmentList.push(obj);
                      }
                    } else {
                      appointmentList.push(obj);
                    }
                    // appointmentList.push(obj);
                  }
                });
              },
            );
          }

          //Filter current day available active serving users list
          // filterCurrentDayAvailableConsultants(appointmentList);
          configureAppointmentList(appointmentList);
        } else {
          if (isConnected === true) {
            Utils.showToast('Failed!', message, 'error', 'bottom');
            if (Platform.OS === 'windows') {
              setTimeout(() => {
                Utils.hideToast();
              }, 3000);
            }
          }
        }
      },
    );
  };

  /**
   * Purpose:fetch appointment list
   * Created/Modified By:Sudhin Sudhakaran
   * Created/Modified Date: 24 Apr 2023
   * Steps: 1.  setting the formatted data in appointmentlist state
   */

  const configureAppointmentList = data => {
     console.log("configureAppointmentList------", data);

    /**
     * Purpose: Check the  data length is odd or even
     * Created/Modified By: Sudhin Sudhakaran
     * Created/Modified Date: 2 May 2023}
     * Steps:
     * 1.   Find the modulus of data.length
     * 2.   if the reminder is 0 then it is even otherwise odd
     * 3.
     */
    if (data.length % 2 === 0) {
      setIsOdd(false);
    } else {
      setIsOdd(true);
    }

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
      if (isOdd) {
        delete formattedArray[formattedArray.length - 1].rightArrivedList;
        delete formattedArray[formattedArray.length - 1]
          .rightServingUserDetails;
        delete formattedArray[formattedArray.length - 1].rightServingList;
      }

      
    }
 console.log("new Data===", formattedArray);
    let servingUserSplitList = [];
    if (formattedArray?.length > 0) {
      // console.log('Split carousel ====?', props?.pageItems);
      // console.log('formatted Array', formattedArray.length, formattedArray);

      /**
       * Purpose: Check is any new token found
       * Created/Modified By: Sudhin Sudhakaran
       * Created/Modified Date: }
       * Steps:
       * 1.   Check current data with old tokens
       * 2.   if the token is not found in the old list add isNew key as true
       * 3.
       */
      // console.log(' formatted Array', formattedArray);
    
        formattedArray?.map((data, indx) => {
          // console.log('Split screen carousel', data);

          let fullData = {};

          fullData = {...data};

          let oldLeftData =
            Globals.PREVIOUS_SPLIT_SCREEN_TOKENS_LIST?.[indx]
              ?.leftServingUserDetails;
          // console.log('oldLeftData', oldLeftData);

          if (data?.leftServingList?.length > 0) {
            let __servingLeftList = [];
            data?.leftServingList?.map((item, index) => {
              let _servingLeftListItem = {};
              _servingLeftListItem = {...item};
              if (oldLeftData?.[index]?.token === item?.token) {
                _servingLeftListItem.isNew = false;
              } else {
                _servingLeftListItem.isNew = true;
              }

              __servingLeftList.push(_servingLeftListItem);
            });
            fullData.leftServingList = [...__servingLeftList];
            // Globals.PREVIOUS_SPLIT_SCREEN_TOKENS_LIST[indx].leftServingUserDetails = __servingLeftList
            // console.log('ListLeftData', listLeftData);
            // console.log(
            //   'Globals.PREVIOUS_SPLIT_SCREEN_TOKENS_LIST letest',
            //   indx,
            //   Globals.PREVIOUS_SPLIT_SCREEN_TOKENS_LIST[indx],
            // );
          }

          let oldRightData =
            Globals.PREVIOUS_SPLIT_SCREEN_TOKENS_LIST?.[indx]
              ?.rightServingUserDetails;

          if (data?.rightServingList?.length > 0) {
            let __servingRightList = [];
            data?.rightServingList?.map((item, index) => {
              // console.log('right item---', item?.token);
              let _servingRightListItem = {};
              _servingRightListItem = {...item};
              if (oldRightData?.[index]?.token === item?.token) {
                _servingRightListItem.isNew = false;
              } else {
                _servingRightListItem.isNew = true;
              }

              __servingRightList.push(_servingRightListItem);
            });

            fullData.rightServingList = __servingRightList;
            // Globals.PREVIOUS_SPLIT_SCREEN_TOKENS_LIST[indx].rightServingUserDetails =__servingRightList
          }

          if (
            fullData?.leftArrivedList?.length +
              fullData?.leftServingList?.length >
              0 ||
            fullData?.rightArrivedList?.length +
              fullData?.rightServingList?.length >
              0
          ) {
            fullData.showItem = true;
          } else {
            fullData.showItem = false;
          }
      // console.log('Full data ====>', fullData);

          servingUserSplitList.push(fullData);
        });
      

       console.log('servingUserSplitList<><><><><>', servingUserSplitList);
    }

    setAppointmentList(servingUserSplitList);
    setIsLoading(false);
  };

  const EmptyComponent = () => {
    return (
      <View
        style={{
          marginLeft: perfectSize(100),
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
        }}>
        <Image
          source={Images.NO_APPOINTMENT}
          style={{
            width: perfectSize(150),
            height: perfectSize(150),
            marginTop: perfectSize(300),
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

  return isConnected === false ? (
    <NoNetworkComponent isFromSettings={false} />
  ) : (
    <View style={styles.container}>
      <LoadingIndicator
        visible={isLoading}
        textContent={'Please wait...'}
        textStyle={{
          fontFamily: Fonts.Poppins_Regular,
          fontSize: 14,
          color: '#000',
        }}
        color={Colors.PRIMARY_COLOR}
      />

      {/* Center Items */}
      <View
        style={{
          marginTop: perfectSize(8),
          flex: 1,
          marginBottom: perfectSize(16),
        }}>
        {isLoading ? (
          <View style={[styles.indicator, styles.horizontal]}>
            {Platform.OS === 'windows' ? (
              <ActivityIndicator size="large" />
            ) : (
              <LoadingIndicator />
            )}
          </View>
        ) : _appointmentList.length > 0 ? (
          <SplitScreenCarousel pageItems={_appointmentList} isOdd={isOdd} />
        ) : (
          <EmptyComponent />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  servingListView: {
    marginTop: perfectSize(30),
    width: perfectSize(960),
    height: perfectSize(380),
    alignSelf: 'center',
    //Shadow props
    // backgroundColor: '#F2F2F2',
    // shadowColor: '#00000029',
    // shadowOffset: { width: 0, height: perfectSize(1) },
    // shadowOpacity: 0.8,
    // shadowRadius: perfectSize(6),
    // elevation: 6,
  },

  servingShadowView: {
    width: perfectSize(960),
    height: perfectSize(380),
    flexDirection: 'row',

    // //Shadow props
    // backgroundColor: '#F2F2F2',
    // shadowColor: '#00000029',
    // shadowOffset: { width: 0, height: perfectSize(1) },
    // shadowOpacity: 0.8,
    // shadowRadius: perfectSize(6),
    // elevation: 6,
  },
  servingPersonTitle: {
    color: '#222222',
    fontFamily: Fonts.Poppins_Medium,
    fontSize: perfectSize(20),
  },
  servingPersonNameTitle: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: perfectSize(30),
  },
  servingDepartmentNameTitle: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: perfectSize(20),
  },
  nextTitle: {
    fontFamily: Fonts.Poppins_SemiBoldItalic,
    fontSize: perfectSize(32),
  },
});
