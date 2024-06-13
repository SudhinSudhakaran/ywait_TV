import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  findNodeHandle,
  Alert,
  Switch,
  ScrollView,
  Platform,
  ImageBackground,
  BackHandler,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlatGrid} from 'react-native-super-grid';
import {Colors, Fonts, Globals, Images, Strings} from '../../constants';
import LoadingIndicator from '../shared/loadingIndicator/LoadingIndicator';
import StorageManager from '../../helpers/storage/StorageManager';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import APIConnection from '../../helpers/api/APIConnection';
import DataManager from '../../helpers/api/DataManager';
import Utils from '../../helpers/utils/Utils';
import TVPointItem from '../settings/TVPointItem';
import TVPointNameItem from './TVPointNameItem';
import LeftViewComponent from './LeftViewComponent';
import BusinessImageComponent from '../../componets/BusinessImageComponent';
import BottomBar from '../../componets/BottomBar';
import SplitScreenButtons from '../../componets/SplitScreenButtons';
import LogoutSection from '../../componets/LogoutSection';
import {useDispatch, useSelector} from 'react-redux';
import LanguageItem from '../../componets/LanguageItem';
import NetInfo from '@react-native-community/netinfo';
import {
  LanguageActions,
  SplitScreenActions,
  TvPointActions,
} from '../../redux/actions';
import HeaderComponent from '../../componets/HeaderComponent';
import NoNetworkComponent from '../../componets/NoNetworkComponent';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

export default function SettingScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const {languageList} = useSelector(state => state?.LanguageState);
  const {tvPointListLength, splitScreenEnabled} = useSelector(
    state => state?.TvPointState,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSplitScreenEnabled, setIsSplitScreenEnabled] = useState(false);
  const [tvPointList, setTvPointList] = useState([]);

  const [isSettingFocused, setIsSettingFocused] = useState(false);
  const [isHomeFocused, setIsHomeFocused] = useState(false);
  const [isMenuSplitFocused, setIsMenuSplitFocused] = useState(false);
  const [isMenuTVPointFocused, setIsMenuTVPointFocused] = useState(false);
  const [isMenuLogoutFocused, setIsMenuLogoutFocused] = useState(false);
  //split screen
  const [isSplitScreenEnableFocused, setIsSplitScreenEnableFocused] =
    useState(false);
  const [isSplitScreenDisableFocused, setIsSplitScreenDisableFocused] =
    useState(false);
  // language
  const [isLanguageEnableFocused, setIsLanguageEnableFocused] = useState(false);
  const [isLanguageDisableFocused, setIsLanguageDisableFocused] =
    useState(false);
  const [isMenuLanguageFocused, setIsMenuLanguageFocused] = useState(false);

  const [focusedTVPointIndex, setFocusedTVPointIndex] = useState(-1);
  const [isLogoutCancelFocused, setIsLogoutCancelFocused] = useState(false);
  const [isLogoutYesFocused, setIsLogoutYesFocused] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const assignButtonRef = useRef(null);
  const onAssignButtonRef = useCallback(ref => {
    if (ref) {
      assignButtonRef.current = ref;
    }
  }, []);
  //Logout
  const logoutCancelButtonRef = useRef(null);
  const onLogoutCancelButtonRef = useCallback(ref => {
    if (ref) {
      logoutCancelButtonRef.current = ref;
    }
  }, []);
  const logoutYesButtonRef = useRef(null);
  const onLogoutYesButtonRef = useCallback(ref => {
    if (ref) {
      logoutYesButtonRef.current = ref;
    }
  }, []);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  //For back button override
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

  useEffect(() => {
    // console.log('route?.params', route?.params);
    StorageManager.getSavedIsSplitScreenEnabled().then(res => {
      console.log;
      if (res === true) {
        setIsSplitScreenEnabled(true);
      } else {
        setIsSplitScreenEnabled(false);
      }
    });
  }, []);
  useLayoutEffect(() => {
    getTVPointsList();
  }, []);

  const splitEnableAction = () => {
    //Save to storage manager
    StorageManager.saveIsSplitScreenEnabled(true);
    Globals.IS_SPLIT_TOKEN_SCREEN = true;
    dispatch(SplitScreenActions.setEnableSplitScreen(true));
    setIsSplitScreenEnabled(true);
  };
  const splitDisableAction = () => {
    //Save to storage manager
    StorageManager.saveIsSplitScreenEnabled(false);
    Globals.IS_SPLIT_TOKEN_SCREEN = false;
    setIsSplitScreenEnabled(false);
    dispatch(SplitScreenActions.setEnableSplitScreen(false));
  };

  //Focus helpers

  //TopBar
  const onFocusSettingsButtonAction = () => {
    setIsSettingFocused(true);
    //Disable focus of split
    setIsMenuSplitFocused(false);
    //Disable focus of tv point
    setIsMenuTVPointFocused(false);
    setIsMenuLanguageFocused(false);
  };
  const onBlurSettingsButtonAction = () => {
    setIsSettingFocused(false);
  };
  const onPressSettingsButtonAction = () => {};
  const onFocusHomeButtonAction = () => {
    setIsHomeFocused(true);
    //Disable focus of split
    setIsMenuSplitFocused(false);
    //Disable focus of tv point
    setIsMenuTVPointFocused(false);
    setIsMenuLanguageFocused(false);
  };
  const onBlurHomeButtonAction = () => {
    setIsHomeFocused(false);
  };
  const onPressHomeButtonAction = () => {
    if (isAnyPointSelected() === true) {
      //Navigate to token page
      if (Globals.IS_SPLIT_TOKEN_SCREEN === true) {
        navigation.reset({
          index: 0,
          routes: [{name: 'TokenStatusDoubleScreen'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'TokenStatusScreen'}],
        });
      }
    } else {
      Utils.showToast(
        'Sorry!',
        Strings.PLEASE_SELECT_TV_POINT,
        'error',
        'bottom',
      );

      if (Platform.OS === 'windows') {
        setTimeout(() => {
          Utils.hideToast();
        }, 3000);
      }
    }
  };

  //Menu Split
  const onFocusSplitMenuAction = () => {
    setIsMenuSplitFocused(true);
    //Disable focus of tv point
    setIsMenuTVPointFocused(false);
    //Disable focus of logout
    setIsMenuLogoutFocused(false);
    setIsMenuLanguageFocused(false);
    //Remove focus from TV Point names
    removeFocusFromTVPointNames();
  };
  const onBlurSplitMenuAction = () => {
    // setIsMenuSplitFocused(false)
  };
  //Language
  const onFocusLanguageMenuAction = () => {
    setIsMenuLanguageFocused(true);
    setIsMenuSplitFocused(false);
    //Disable focus of tv point
    setIsMenuTVPointFocused(false);
    //Disable focus of logout
    setIsMenuLogoutFocused(false);
    //Remove focus from TV Point names
    removeFocusFromTVPointNames();
  };
  const onBlurLanguageMenuAction = () => {
    // setIsMenuSplitFocused(false)
  };

  //Menu TV Point
  const onFocusTVPointMenuAction = () => {
    getTVPointsList();
    console.log('Pressed');
    setIsMenuTVPointFocused(true);
    //Disable focus of split
    setIsMenuSplitFocused(false);
    //Disable focus of logout
    setIsMenuLogoutFocused(false);
    setIsMenuLanguageFocused(false);
    //Remove focus from TV Point names
    removeFocusFromTVPointNames();
  };
  const onBlurTVPointMenuAction = () => {
    //setIsMenuTVPointFocused(false);
  };
  //Menu Logout
  const onFocusLogoutMenuAction = () => {
    setIsMenuLogoutFocused(true);
    //Disable focus of split
    setIsMenuSplitFocused(false);
    //Disable focus of tv point
    setIsMenuTVPointFocused(false);
    setIsMenuLanguageFocused(false);
    //Remove focus from TV Point names
    removeFocusFromTVPointNames();
  };
  const onBlurLogoutMenuAction = () => {
    // setIsMenuLogoutFocused(false);
  };

  //Enable, Disable
  const onFocusSplitScreenEnableAction = () => {
    setIsSplitScreenEnableFocused(true);
  };
  const onBlurSplitScreenEnableAction = () => {
    setIsSplitScreenEnableFocused(false);
  };
  const onFocusSplitScreenDisableAction = () => {
    setIsSplitScreenDisableFocused(true);
  };
  const onBlurSplitScreenDisableAction = () => {
    setIsSplitScreenDisableFocused(false);
  };
  // language
  const onFocusLanguageEnableAction = () => {
    setIsLanguageEnableFocused(true);
  };
  const onBlurLanguageEnableAction = () => {
    setIsLanguageEnableFocused(false);
  };
  const onFocusLanguageDisableAction = () => {
    setIsLanguageDisableFocused(true);
  };
  const onBlurLanguageDisableAction = () => {
    setIsLanguageDisableFocused(false);
  };

  //TV point Assign button
  const onFocusAssignButtonAction = () => {
    let newArr = [...tvPointList]; // copying the old tvPointList array
    for (let i = 0; i < newArr?.length; i++) {
      newArr[i].isFocusedItem = false;
    }
    newArr[focusedTVPointIndex].isFocusedItem = true; // update new value
    setTvPointList(newArr);
  };
  const onBlurAssignButtonAction = () => {};
  const onPressAssignButtonAction = () => {
    let newArr = [...tvPointList]; // copying the old tvPointList array
    for (let i = 0; i < newArr?.length; i++) {
      newArr[i].isSelectedItem = false;
    }
    newArr[focusedTVPointIndex].isSelectedItem = true; // update new value




    setTvPointList(newArr);
    //Save to storage manager



    StorageManager.saveSelectedTVPoint(tvPointList[focusedTVPointIndex]);
    Globals.SAVED_TV_POINT_DETAILS = tvPointList[focusedTVPointIndex];
    console.log(
      'Selected tv point list length',
      tvPointList[focusedTVPointIndex]?.consultants?.length,
    );
    if (tvPointList[focusedTVPointIndex]?.consultants?.length < 2) {
      StorageManager.saveIsSplitScreenEnabled(false);
      Globals.IS_SPLIT_TOKEN_SCREEN = false;
    } else {
      StorageManager.getSavedIsSplitScreenEnabled().then(isSplitEnabled => {
        Globals.IS_SPLIT_TOKEN_SCREEN = isSplitEnabled === true ? true : false;
      });
    }
    dispatch(
      TvPointActions?.setSelectedTvPointListLength(
        tvPointList[focusedTVPointIndex]?.consultants?.length,
      ),
    );
  };

  //Tv POINT selection
  const didSelectedTVPoint = focusedIndex => {
    let newArr = [...tvPointList]; // copying the old tvPointList array
    for (let i = 0; i < newArr?.length; i++) {
      newArr[i].isFocusedItem = false;
    }
    newArr[focusedIndex].isFocusedItem = true; // update new value
    console.log('Selected Tv point ',  newArr[focusedIndex])
    Globals.SELECTED_TV_POINT = newArr[focusedIndex]
    setTvPointList(newArr);
    setFocusedTVPointIndex(focusedIndex);
  };
  const didFocusedTVPoint = focusedIndex => {
    let newArr = [...tvPointList]; // copying the old tvPointList array
    for (let i = 0; i < newArr?.length; i++) {
      newArr[i].isFocusedItem = false;
    }
    newArr[focusedIndex].isFocusedItem = true; // update new value
    setTvPointList(newArr);
    setFocusedTVPointIndex(focusedIndex);
  };

  //Logout
  const onFocusLogoutCancelButtonAction = () => {
    setIsLogoutCancelFocused(true);
  };
  const onBlurLogoutCancelButtonAction = () => {
    setIsLogoutCancelFocused(false);
  };
  const onPressLogoutCancelButtonAction = () => {
    setIsLogoutCancelFocused(false);
    onFocusSplitMenuAction();
  };
  const onFocusLogoutYesButtonAction = () => {
    setIsLogoutYesFocused(true);
  };
  const onBlurLogoutYesButtonAction = () => {
    setIsLogoutYesFocused(false);
  };
  const onPressLogoutYesButtonAction = () => {
    setIsLogoutYesFocused(false);
    StorageManager.ClearUserRelatedData();
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };

  //Remove focus from TV point names
  const removeFocusFromTVPointNames = () => {
    let newArr = [...tvPointList]; // copying the old tvPointList array
    for (let i = 0; i < newArr?.length; i++) {
      newArr[i].isFocusedItem = false;
    }
    setTvPointList(newArr);
    setFocusedTVPointIndex(-1);
  };
  //Validation
  const isAnyPointSelected = () => {
    for (let i = 0; i < tvPointList.length; i++) {
      if (tvPointList[i].isSelectedItem === true) {
        return true;
      }
    }
    return false;
  };

  //API calls
  const getTVPointsList = () => {
    let url = APIConnection.BASE_URL + APIConnection.ENDPOINTS.TV_POINTS_LIST;
    setIsLoading(true);
    DataManager.getUserDetails(url).then(
      ([isSuccess, message, responseData]) => {
        // console.log('getTVPointsList isSuccess: ', isSuccess);
        // console.log('getTVPointsList MSG: ', message);
        // console.log('getTVPointsList DATA: ', responseData);

        if (isSuccess === true) {
          if (responseData !== undefined && responseData !== null) {
            var responseTVPoints = responseData?.objects;
            //Check if already selected a point
            StorageManager.getSavedSelectedTVPoint().then(res => {
              console.log('getSavedSelectedTVPoint: ', res);
              if (
                res !== null &&
                res !== undefined &&
                responseTVPoints?.length > 0
              ) {
                for (let i = 0; i < responseTVPoints?.length; i++) {
                  if (responseTVPoints[i]._id === res?._id) {
                    console.log('responseTVPoints Saved: ', res?._id);
                    responseTVPoints[i].isSelectedItem = true;
                  }
                }
              }
              setTvPointList(responseTVPoints);
              setIsLoading(false);
            });
          }
        } else {
          if (isConnected === true) {
            Utils.showToast('Failed!', message, 'error', 'bottom');
            if (Platform.OS === 'windows') {
              setTimeout(() => {
                Utils.hideToast();
              }, 3000);
            }
          }

          setIsLoading(false);
        }
      },
    );
  };

  //Render flatList

  const ConsultantsList = ({item, subIndex}) => {
    console.log('ConsultantsList item ............', item);
    return (
      <View
        style={{
          borderColor: Colors.GREY_COLOR,
          borderWidth: 1,
          width: perfectSize(273),
          height: perfectSize(153),
        }}>
        <Image
          style={{
            width: perfectSize(60),
            height: perfectSize(60),
            borderRadius: perfectSize(60) / 2,
            overflow: 'hidden',
            marginLeft: perfectSize(22),
            marginTop: perfectSize(17),
            borderWidth: perfectSize(1),
            borderColor: Colors.GREY_COLOR,
            resizeMode: 'cover',
          }}
          source={{
            uri: Utils.isValidUrl(item?.image)
              ? item?.image
              : Utils.getDefaultAvatarImageURL(
                  item?.firstName + '+' + item?.lastName,
                ),
          }}
        />
        <Text
          style={{
            fontFamily: Fonts.Poppins_Medium,
            fontSize: perfectSize(20),
            color: Colors.WHITE_COLOR,
            //textAlign: 'center',
            marginLeft: perfectSize(22),
            marginRight: perfectSize(22),
          }}
          numberOfLines={1}>
          {item?.name}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.Poppins_Regular,
            fontSize: perfectSize(16),
            color: Colors.WHITE_COLOR,
            // textAlign: 'center',
            marginLeft: perfectSize(22),
            marginRight: perfectSize(22),
          }}
          numberOfLines={1}>
          {item?.role_id?.label || ''}
        </Text>
      </View>
    );
  };

  const renderConsultantsFlatList = ({item, index}) => {
    return <ConsultantsList item={item} subIndex={index} />;
  };

  return (
    <View style={styles.container}>
      <LoadingIndicator
        visible={isLoading}
        textContent={'Please wait...'}
        textStyle={{
          fontFamily: Fonts.Poppins_Regular,
          fontSize: 14,
          color: Colors.WHITE_COLOR,
        }}
        color={Colors.PRIMARY_COLOR}
      />

      {/* Top Bar */}
      <HeaderComponent
        isSettingFocused={true}
        isHomeFocused={isHomeFocused}
        onFocusSettingsButtonAction={onFocusSettingsButtonAction}
        onBlurSettingsButtonAction={onBlurSettingsButtonAction}
        onPressSettingsButtonAction={onPressSettingsButtonAction}
        onFocusHomeButtonAction={onFocusHomeButtonAction}
        onBlurHomeButtonAction={onBlurHomeButtonAction}
        onPressHomeButtonAction={onPressHomeButtonAction}
      />

      {/* Center items */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: Colors.PRIMARY_TEXT_COLOR,
        }}>
        {/* Left menu view */}
        <LeftViewComponent
          isMenuSplitFocused={isMenuSplitFocused}
          isMenuTVPointFocused={isMenuTVPointFocused}
          isMenuLogoutFocused={isMenuLogoutFocused}
          isMenuLanguageFocused={isMenuLanguageFocused}
          onFocusSplitMenuAction={onFocusSplitMenuAction}
          onFocusTVPointMenuAction={onFocusTVPointMenuAction}
          onFocusLogoutMenuAction={onFocusLogoutMenuAction}
          onFocusLanguageMenuAction={onFocusLanguageMenuAction}
          onBlurLogoutMenuAction={onBlurLogoutMenuAction}
          onBlurSplitMenuAction={onBlurSplitMenuAction}
          onBlurTVPointMenuAction={onBlurTVPointMenuAction}
          onBlurLanguageMenuAction={onBlurLanguageMenuAction}
        />

        {/* Right Split screen options view */}
        {isMenuSplitFocused === true ? (
          <SplitScreenButtons
            isSplitScreenEnabled={
              tvPointListLength > 1 ? isSplitScreenEnabled : false
            }
            isSplitScreenEnableFocused={isSplitScreenEnableFocused}
            isSplitScreenDisableFocused={isSplitScreenDisableFocused}
            splitEnableAction={splitEnableAction}
            splitDisableAction={splitDisableAction}
            onFocusSplitScreenEnableAction={onFocusSplitScreenEnableAction}
            onBlurSplitScreenEnableAction={onBlurSplitScreenEnableAction}
            onFocusSplitScreenDisableAction={onFocusSplitScreenDisableAction}
            onBlurSplitScreenDisableAction={onBlurSplitScreenDisableAction}
          />
        ) : isMenuTVPointFocused === true ? (
          <>
            <View
              style={{
                width: perfectSize(364),
                height: perfectSize(Platform.OS === 'windows' ? 1000 : 900),
                backgroundColor: Colors.PRIMARY_TEXT_COLOR,
                zIndex: -1,
                position: 'absolute',
                top: perfectSize(0),
                left: '25%',
                justifyContent: 'center',
              }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  marginLeft: perfectSize(10),
                  width: perfectSize(410),
                  alignSelf: 'center',
                  marginTop: perfectSize(50),
                }}
                contentContainerStyle={{
                  flexGrow: 1,
                  // marginTop: perfectSize(100),
                }}>
                {tvPointList.map((item, i) => (
                  <TVPointNameItem
                    key={i}
                    itemIndex={i}
                    isSelectedItem={item.isSelectedItem || false}
                    isFocusedItem={item.isFocusedItem || false}
                    title={item.name}
                    consultants={item.consultants}
                    hasTVPreferredFocus={i === -1}
                    blockFocusTop={i === 0}
                    blockFocusBottom={i === tvPointList.length - 1}
                    onSelectTVPoint={didSelectedTVPoint}
                    onFocusTVPoint={didFocusedTVPoint}
                  />
                ))}
              </ScrollView>
            </View>
            {focusedTVPointIndex !== -1 ? (
              <View
                style={{
                  flex: 0.54,
                  left: '44%',
                  zIndex: -2,
                  position: 'absolute',
                  bottom: perfectSize(0),
                  top: perfectSize(0),
                  backgroundColor: Colors.BLACK_COLOR,
                }}>
                <View
                  style={{
                    width: perfectSize(1010),
                    height: perfectSize(950),
                    backgroundColor: Colors.BLACK_COLOR,
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Regular,
                      fontSize: perfectSize(32),
                      marginLeft: perfectSize(72),
                      marginRight: perfectSize(16),
                      marginTop: perfectSize(79),
                      color: Colors.WHITE_COLOR,
                    }}
                    numberOfLines={1}>
                    {focusedTVPointIndex !== -1
                      ? tvPointList?.length > 0
                        ? tvPointList[focusedTVPointIndex].name
                        : ''
                      : ''}
                  </Text>

                  <FlatGrid
                    itemDimension={perfectSize(273)}
                    style={{
                      marginTop: perfectSize(32),
                      marginLeft: perfectSize(40),
                      width: perfectSize(650),
                      marginBottom: perfectSize(150),
                      flex: 1,
                    }}
                    data={
                      focusedTVPointIndex !== -1
                        ? tvPointList?.length > 0
                          ? tvPointList[focusedTVPointIndex]?.consultants
                          : []
                        : []
                    }
                    spacing={perfectSize(18)}
                    fixed={true}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderConsultantsFlatList}
                  />

                  <TouchableHighlight
                    underlayColor={Colors.PRIMARY_COLOR}
                    ref={onAssignButtonRef}
                    onFocus={() => onFocusAssignButtonAction()}
                    onBlur={() => onBlurAssignButtonAction()}
                    onPress={() => onPressAssignButtonAction()}
                    nextFocusRight={findNodeHandle(assignButtonRef.current)}
                    nextFocusDown={findNodeHandle(assignButtonRef.current)}
                    style={{
                      position: 'absolute',
                      bottom: perfectSize(100),
                      alignItems: 'center',
                      flex: 1,
                      marginLeft: perfectSize(72),
                      marginBottom: perfectSize(50),
                      backgroundColor: Colors.SECONDARY_COLOR,
                      paddingLeft: perfectSize(20),
                      paddingRight: perfectSize(20),
                      height: perfectSize(40),
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Regular,
                        fontSize: perfectSize(16),
                        color: Colors.WHITE_COLOR,
                      }}
                      numberOfLines={1}>
                      {focusedTVPointIndex !== -1
                        ? tvPointList?.length > 0
                          ? tvPointList[focusedTVPointIndex].isSelectedItem ===
                            true
                            ? 'ASSIGNED'
                            : 'ASSIGN'
                          : 'ASSIGN'
                        : 'ASSIGN'}
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            ) : null}
          </>
        ) : isMenuLogoutFocused === true ? (
          <LogoutSection
            isLogoutCancelFocused={isLogoutCancelFocused}
            isLogoutYesFocused={isLogoutYesFocused}
            onLogoutCancelButtonRef={onLogoutCancelButtonRef}
            onLogoutYesButtonRef={onLogoutYesButtonRef}
            onFocusLogoutCancelButtonAction={onFocusLogoutCancelButtonAction}
            onBlurLogoutCancelButtonAction={onBlurLogoutCancelButtonAction}
            onPressLogoutCancelButtonAction={onPressLogoutCancelButtonAction}
            onFocusLogoutYesButtonAction={onFocusLogoutYesButtonAction}
            onBlurLogoutYesButtonAction={onBlurLogoutYesButtonAction}
            onPressLogoutYesButtonAction={onPressLogoutYesButtonAction}
          />
        ) : isMenuLanguageFocused === true ? (
          <>
            <View
              style={{
                flex: 0.75,
                backgroundColor: 'transparent',
                left: '15%',
              }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  marginLeft: perfectSize(5),
                  width: perfectSize(410),
                  marginTop: perfectSize(50),
                }}
                contentContainerStyle={{
                  flexGrow: 1,
                  // marginTop: perfectSize(100),
                }}>
                {languageList.map((item, i) => (
                  <LanguageItem item={item}  index={i} />
                ))}
              </ScrollView>
            </View>
          </>
        ) : isConnected === false ? (
          <View
            style={{
              // backgroundColor: 'red',
              alignSelf: 'center',
              position: 'absolute',
              left: '50%',
            }}>
            <NoNetworkComponent isFromSettings={true} />
          </View>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{
          width: 100,
          height: 60,
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          right: 40,
          top: 50,
        }}>
        <Text>Home</Text>
      </TouchableOpacity>
      {/* Bottom Bar */}
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
});
