/* eslint-disable no-lone-blocks */
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
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
import SingleTokenStatusItem from '../../componets/SingleTokenStatusItem';
import {filterAppointmentAvailableList} from './functions/FilterAppoinmentAvailableList';
import Tts from 'react-native-tts';
import {useFocusEffect} from '@react-navigation/native';
import {
  DataListActions,
  MenuActions,
  ShowLiveTokensActions,
} from '../../redux/actions';
import {updatePlaySoundStatus} from './functions/UpdateTokenPlaySoundStatus';
import StorageManager from '../../helpers/storage/StorageManager';
import LiveTokenComponent from './LiveTokenComponent';
import {responsiveWidth} from 'react-native-responsive-dimensions';
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
export const mainSingleCarouselRef = createRef();
const NewSingleCarouselScreen = () => {
  // Local States
  const [index, setIndex] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [autoplayDelay, setAutoplayDelay] = useState(8000);
  const [isFirstTime, setIsFirstTime] = useState(true);
  // Redux States
  const {isRTL} = useSelector(state => state?.AlignmentState);
  const {isSpeakDisabled} = useSelector(state => state?.VoiceLanguageState);
  const {showLiveTokensEnabled, _liveTokensList} = useSelector(
    state => state.ShowLiveTokenState,
  );
  const [liveTokens, setLiveTokens] = useState([]);
  const tokenSound =
    Platform.OS !== 'windows'
      ? require('../../../assets/audios/tokenSound.mp3')
      : {uri: 'ms-appx:///Assets/tokenSound.mp3'};

  // const tokenSound = require('../../../assets/audios/tokenSound.mp3');

  const [isPaused, setIsPaused] = useState(true);
  let timeoutId;
  let toneTimeOut;
  const refVideo = useRef();
  const dispatch = useDispatch();
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
  useEffect(() => {
    scrollCarousel(0);

    return () => {};
  }, [isFirstTime]);

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
        // console.log('fetchsetIsLoadingAppointmentList DATA:===========> ', responseData);
        appointmentList = [];
        if ((Globals.SAVED_TV_POINT_DETAILS?.consultants.length ?? 0) > 0) {
          Globals.SAVED_TV_POINT_DETAILS?.consultants.forEach(
            (savedItem, index) => {
              responseData.objects.forEach(item => {
                if (savedItem._id === item.rooms_cons) {
                  //  console.log('find item', item);
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

                        roomNumber: Utils.getRoomNumber(
                          savedItem?.additionalInfo || [],
                        ),
                      }));

                    _servingList = item.bookings
                      .filter(_item => _item.vitalStatus === 'SERVING')
                      .map(newItem => ({
                        ...newItem,
                        type: savedItem.type,
                        isNewInRoom: true,
                        isNewInConsultant: true,

                        roomAbbreviation: Utils.getAbbreviation(
                          savedItem?.display_name || '',
                        ),
                        roomName:
                          savedItem?.type === 'ROOM'
                            ? savedItem?.display_name
                            : savedItem.name,
                        roomNumber: Utils.getRoomNumber(
                          savedItem?.additionalInfo || [],
                        ),
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
                        roomNumber: Utils.getRoomNumber(
                          savedItem?.additionalInfo || [],
                        ),
                      }));

                    _servingList = item.bookings
                      .filter(_item => _item.status === 'SERVING')
                      .map(newItem => ({
                        ...newItem,
                        type: savedItem.type,

                        roomAbbreviation: '',
                        isNewInRoom: true,
                        isNewInConsultant: true,
                        roomNumber: Utils.getRoomNumber(
                          savedItem?.additionalInfo || [],
                        ),
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
        const _newTokenList = filterAppointmentAvailableList(appointmentList);
        configData(_newTokenList);
      },
    );
  };

  // Assuming you have the 'data' array fetched from the API
  let _liveTokens = [];
  const updateLiveTokens = data => {
    // Collect all the servingList arrays from the 'data' objects
    data.forEach(item => {
      _liveTokens = _liveTokens.concat(item.servingList);
    });

    // Filter out tokens with duplicate type and _id
    const uniqueTokens = [];
    const seenTokens = new Set();

    _liveTokens.forEach(token => {
      const tokenKey = token.type + token._id;
      if (!seenTokens.has(tokenKey)) {
        let newData = {...token};
        newData.isNew = Globals.PREVIOUS_TOKEN_LIST_FOR_LIVE_TOKENS.some(
          _item => _item.token === token.token,
        );
        uniqueTokens.push(token);
        seenTokens.add(tokenKey);
      }
    });

    // Ensure the new array has a maximum of 8 items
    const finalTokens = uniqueTokens.slice(0, 7);

    // Set the new tokens in the state or do whatever you need to do with them
    setLiveTokens(finalTokens.reverse());
    console.log('Final tokens:', finalTokens.reverse());
    // Optionally, you can store the previous tokens for comparison
    Globals.PREVIOUS_TOKEN_LIST_FOR_LIVE_TOKENS = finalTokens.reverse();
  };

  const configData = data => {
    // console.log('config function', data);
    let carouselIndex = mainSingleCarouselRef.current?.currentIndex ?? 0;
    // Usage example:
    // Call this function with the 'data' array that is updated every 10 seconds via API call
    updateLiveTokens(data);
    /**
     <---------------------------------------------------------------------------------------------->
     * Purpose: Filtering tokens in serving status
     * Created/Modified By: Sudhin Sudhakaran
     * Created/Modified Date: 17-07-2023
     * Steps:
     * 1.   map the data array
     * 2.   spread the serving list in each item along with previous tokens
     <---------------------------------------------------------------------------------------------->
     */
    // let _liveTokens = [];
    // // data.length > 0 &&
    // //   data.forEach(item => {
    // //     _liveTokens = [...item.servingList, ..._liveTokens];
    // //   });
    // if (data.length || 0 > 0) {
    //   if (Globals.PREVIOUS_TOKEN_LIST_FOR_LIVE_TOKENS.length || 0 > 0) {
    //     for (let i = 0; i < data.length; i++) {
    //       for (
    //         let j = 0;
    //         j < Globals.PREVIOUS_TOKEN_LIST_FOR_LIVE_TOKENS.length;
    //         j++
    //       ) {
    //         if (
    //           data[i]._id !==
    //             Globals.PREVIOUS_TOKEN_LIST_FOR_LIVE_TOKENS[j]._id &&
    //           data[i].type !==
    //             Globals.PREVIOUS_TOKEN_LIST_FOR_LIVE_TOKENS[j].type
    //         ) {
    //           console.log('Data for===========================', data[i]);
    //           _liveTokens.push([...data[i].servingList]);
    //         }
    //       }
    //     }
    //   } else {
    //     data.length > 0 &&
    //       data.forEach(item => {
    //         _liveTokens = [...item.servingList, ..._liveTokens];
    //       });
    //     Globals.PREVIOUS_TOKEN_LIST_FOR_LIVE_TOKENS = _liveTokens;
    //   }
    // }

    // setLiveTokens([..._liveTokens, ...liveTokens]);
    // let allTokenData = [
    //   ..._liveTokens,
    //   ...Globals.PREVIOUS_TOKEN_LIST_FOR_LIVE_TOKENS,
    // ];

    // Globals.PREVIOUS_TOKEN_LIST_FOR_LIVE_TOKENS = allTokenData.slice(0, 7);

    /**
 <---------------------------------------------------------------------------------------------->
 * Purpose: Configure the split screen
 * Created/Modified By: Sudhin Sudhakaran
 * Created/Modified Date: 05-06-2023
 * Steps:
 * 1.   Check the data length
 * 2.   if data length is larger than 1 then  change the allow split screen option to true in redux
 * 3.   Otherwise, change the allow split screen option to false
 <---------------------------------------------------------------------------------------------->
 */
    setDataList(data);
    if (data.length > 1) {
      dispatch(DataListActions.setAllowSplitScreen(true));
    } else {
      dispatch(DataListActions.setAllowSplitScreen(false));
      StorageManager.saveIsSplitScreenEnabled(false);
      Globals.IS_SPLIT_TOKEN_SCREEN = false;
      dispatch(MenuActions.setIsSplitScreenEnable(false));
    }

    setIsLoading(false);
    if (isFirstTime === true) {
      // console.log('inside first time');
      setIsFirstTime(false);
    }

    console.log(' Scroll carousel>>>>>>', dataList.length);
    if (dataList.length < 2) {
      // console.log(
      //   ' Scroll carousel>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      //   dataList.length,
      // );
      scrollCarousel(0);
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
   * 4.   Creating consultant name
   * 5.   Creating room name
   * 6.   filtering new array with new tokens (isNewInConsultant,isNewInRoom)
   * 7.   Creating a string with newly added token numbers
   * 8.   Pass the string to tts speak function
   */
  const scrollCarousel = _index => {
    const selectedTokenItem = dataList[_index];

    if (selectedTokenItem !== undefined) {
      // console.log('scrollCarousel func called');
      clearTimeout(timeoutId);
      setIndex(_index);
      mainSingleCarouselRef.current &&
        mainSingleCarouselRef.current.stopAutoplay();
      // if (refVideo.current) {
      //   refVideo.current.seek(0); // Seek to the beginning of the video
      // }

      // console.log('selectedTokenItem', selectedTokenItem);
      Tts.stop();

      if (showLiveTokensEnabled === false && isSpeakDisabled === false) {
        Tts.speak(selectedTokenItem?.speakText || '');
      }

      timeoutId = setTimeout(() => {
        // console.log('index', _index);
        if (_index === dataList.length - 1) {
          mainSingleCarouselRef.current &&
            mainSingleCarouselRef.current.snapToItem(0, true, true);
        } else {
          mainSingleCarouselRef.current &&
            mainSingleCarouselRef.current.startAutoplay();
        }

        // console.log(
        //   '<><><><><><><><><><><><>',
        //   selectedTokenItem.delay,
        //   selectedTokenItem.speakText,
        // );

        updatePlaySoundStatus(selectedTokenItem?.isNewTokenData);
      }, selectedTokenItem?.delay || 8000);

      {
        showLiveTokensEnabled === false &&
          speakNewTokens(
            selectedTokenItem.type,
            selectedTokenItem?.isNewTokenData,
          );
      }
    }
  };

  const speakNewTokens = (selectedItemType, spokedList) => {
    // To clear the timeout, call clearTimeout with the timeout variable

    if ((spokedList.length ?? 0) > 0) {
      for (let i = 0; i < spokedList.length; i++) {
        const spokedTokenItem = spokedList[i];

        for (let j = 0; j < Globals.PREVIOUS_TOKEN_LIST.length; j++) {
          const oldTokenItem = Globals.PREVIOUS_TOKEN_LIST[j];
          if (spokedTokenItem.token === oldTokenItem.token) {
            if (selectedItemType === 'CONSULTANT') {
              Globals.PREVIOUS_TOKEN_LIST[j].isNewInConsultant = false;
            } else {
              Globals.PREVIOUS_TOKEN_LIST[j].isNewInRoom = false;
            }
          }
        }
      }
    }

    // console.log(
    //   'Globals.PREVIOUS_TOKEN_LIST ---------------------------',
    //   Globals.PREVIOUS_TOKEN_LIST,
    // );
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
    // console.log('item in single render item', item);

    return <SingleTokenStatusItem item={item} index={index} />;
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
        {isLoading === true ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={{flex: 1, flexDirection: isRTL ? 'row-reverse' : 'row'}}>
            {/* Check the live token option is enable or not and live token array have any data */}
            {showLiveTokensEnabled ? (
              <>
                <View style={{width: responsiveWidth(25)}}>
                  <LiveTokenComponent liveTokenList={liveTokens} />
                </View>
                <View
                  style={{
                    backgroundColor: '#989898',
                    alignSelf: 'center',
                    width: perfectSize(1.5),
                    height: '100%',
                  }}
                />
              </>
            ) : null}
            <Carousel
              ref={mainSingleCarouselRef}
              style={{transform: [{translateY: 0}]}}
              listKey={'unique-list-key-46546466266546624'}
              keyExtractor={(mainItem, mainItemIndex) =>
                mainItemIndex.toString()
              }
              sliderWidth={perfectSize(1920)}
              itemWidth={perfectSize(1920)}
              scrollEnabled={false}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              // loop={true}
              autoplay={true}
              autoplayInterval={8000}
              onSnapToItem={slideIndex => {
                scrollCarousel(slideIndex);
                // setIndex(slideIndex);
              }}
              data={dataList || []}
              horizontal={true}
              renderItem={renderItem}
              ListEmptyComponent={!isLoading ? EmptyComponent : null}
            />
          </View>
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
      {/* 
      <TouchableOpacity
        style={{backgroundColor: 'red', alignSelf: 'center'}}
        onPress={() => {
          if (isPaused) {
            setIsPaused(false);
          } else {
            setIsPaused(true);
          }
        }}>
        <Text>Play</Text>
      </TouchableOpacity> */}
    </>
  );
};

export default NewSingleCarouselScreen;

const styles = StyleSheet.create({});
