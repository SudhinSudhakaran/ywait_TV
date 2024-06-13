/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  LogBox,
  Platform,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
} from 'react-native';

import {t} from 'i18next';
import {useSelector} from 'react-redux';
import Utils from '../../helpers/utils/Utils';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {useFocusEffect} from '@react-navigation/native';
import DataManager from '../../helpers/api/DataManager';
import Translations from '../../constants/Translations';
import APIConnection from '../../helpers/api/APIConnection';
import {Colors, Fonts, Globals, Images} from '../../constants';
import CarouselComponent from '../../componets/CarouselComponent';
import NoNetworkComponent from '../../componets/NoNetworkComponent';
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

const TokenStatusScreen = props => {
  // const refVideo = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const {isRTL} = useSelector(state => state.AlignmentState);
  const [_appointmentList, setAppointmentList] = useState([]);

  const tokenSound =
    Platform.OS !== 'windows'
      ? require('../../../assets/audios/tokenSound.mp3')
      : {uri: 'ms-appx:///Assets/tokenSound.mp3'};
  const [isPaused, setIsPaused] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  const {languageList, selectedLanguageIndex} = useSelector(
    state => state?.LanguageState,
  );

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
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

  useFocusEffect(
    React.useCallback(() => {
      var LanguageCode = languageList[selectedLanguageIndex]?.languageCode;
      // Tts.setDefaultLanguage(LanguageCode);
      return () => {};
    }, []),
  );
  0;
  ///For back button override
  useEffect(() => {
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

  const EmptyComponent = () => {
    return (
      <View
        style={{
          // marginLeft:perfectSize(600),
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

  //Focus helpers

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
                responseData.objects.forEach(item => {
                  let obj = {
                    consultantDetails: {},
                    servingList: [],
                    arrivedList: {
                      arrivedCustomerListTop: [],
                      arrivedCustomerListBottom: [],
                    },
                    type: SavedItem?.type,
                    roomNumber: '',
                    name: '',
                  };

                  if (SavedItem._id === item.rooms_cons) {
                    // console.log('item',item, SavedItem)

                    let _arrivedList = [];
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
                            _arrivedList.push(bookingItem);
                          } else if (bookingItem.vitalStatus === 'SERVING') {
                            obj.servingList.push(bookingItem);
                          }
                        });
                      } else {
                        item.bookings.forEach(bookingItem => {
                          if (
                            bookingItem.status === 'ARRIVED' ||
                            bookingItem.status === 'PENDING'
                          ) {
                            _arrivedList.push(bookingItem);
                          } else if (bookingItem.status === 'SERVING') {
                            obj.servingList.push(bookingItem);
                          }
                        });
                      }
                    }

                    let listLength =
                      _arrivedList.length + obj.servingList.length;
                    obj.arrivedList.arrivedCustomerListTop = _arrivedList
                      ? _arrivedList?.slice(0, 8)
                      : [];

                    obj.arrivedList.arrivedCustomerListBottom = _arrivedList
                      ? _arrivedList?.slice(8, 80)
                      : [];
                    obj.consultantDetails = {
                      image:
                        Globals.SAVED_TV_POINT_DETAILS?.consultants[index]
                          ?.image,
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

          setIsLoading(false);
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
    // console.log('configureAppointmentList------', data);
    setAppointmentList(data);
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
      {isLoading ? (
        <View style={[styles.indicator, styles.horizontal]}>
          {Platform.OS === 'windows' ? (
            <ActivityIndicator size="large" />
          ) : (
            <LoadingIndicator />
          )}
        </View>
      ) : _appointmentList?.length > 0 ? (
        <CarouselComponent isLoading={isLoading} pageItems={_appointmentList} />
      ) : (
        <EmptyComponent />
      )}

      {/* <Video
        source={tokenSound} // Can be a URL or a local file.
        ref={refVideo}
        paused={isPaused}
        audioOnly
        playWhenInactive
        playInBackground
      /> */}

      {/* <View style={{ flex: 1 }} /> */}
      {/* Bottom Bar */}
      {/* <BottomBar /> */}
    </View>
  );
};
export default React.memo(TokenStatusScreen);
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
});
