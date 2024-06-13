import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Platform,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PixelRatio, Dimensions} from 'react-native';
import {Colors, Globals, Images} from '../../constants';
import APIConnection from '../../helpers/api/APIConnection';
import Utils from '../../helpers/utils/Utils';
import DataManager from '../../helpers/api/DataManager';
import StorageManager from '../../helpers/storage/StorageManager';
import {BUILD_SOURCE} from '../../enums/Enums';
import {create} from 'react-native-pixel-perfect';
import {useDispatch, useSelector} from 'react-redux';
import {
  AlignmentActions,
  DisplayLanguageActions,
  ShowLiveTokensActions,
  VoiceLanguageActions,
} from '../../redux/actions';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import {
  LanguageActions,
  SplitScreenActions,
  TvPointActions,
  MenuActions,
} from '../../redux/actions';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
import NetInfo from '@react-native-community/netinfo';
import NoNetworkComponent from '../../componets/NoNetworkComponent';
const SplashScreen = () => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const refVideo = useRef();
  // const splashVideo =
  //   Platform.OS !== 'windows'
  //     ? require('../../../assets/videos/Y_Wait_Logo_Anim.mp4')
  //     : {uri: 'ms-appx:///Assets/Y_Wait_Logo_Anim.mp4'};

  const splashVideo = require('../../../assets/videos/Y_Wait_Logo_Anim.mp4');
  const [isAPILoaded, setIsAPILoaded] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const [selectedTvPointFound, setSelectedTvPointFound] = useState(false);
  const dispatch = useDispatch();
  const {languageList, selectedLanguageIndex} = useSelector(
    state => state?.LanguageState,
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // console.log(`<><><><>RTL App js : <><><><>`, `${I18nManager.isRTL}`);
    getDisplayLanguage();
  }, []);

  const getDisplayLanguage = async () => {
    const selectedLanguage = await StorageManager.getSavedLanguage();

    Globals.SELECTED_LANGUAGE = selectedLanguage;
    Globals.IS_LANGUAGE_CHANGED =
      (await StorageManager.getSavedLanguageChanged()) === 'CHANGED'
        ? true
        : false;
    //  console.log(
    //    'Globals.SELECTED_LANGUAGE in app.js',
    //    Globals.SELECTED_LANGUAGE,
    //  );
    if (Globals.SELECTED_LANGUAGE !== null) {
      if (Globals.SELECTED_LANGUAGE === 'ar') {
        i18next.changeLanguage('ar').then(t => {
          dispatch(AlignmentActions.setRTL(true));
        });
      } else if (Globals.SELECTED_LANGUAGE === 'fr') {
        i18next.changeLanguage('fr').then(t => {
          dispatch(AlignmentActions.setRTL(false));
        });
      } else {
        i18next.changeLanguage('en').then(t => {
          dispatch(AlignmentActions.setRTL(false));
        });
      }
    } else {
      Globals.SELECTED_LANGUAGE = 'en';
    }
  };

  useEffect(() => {
    //StorageManager.ClearAllData();
    fetchBusinessDetails();
  }, []);
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);
      if (
        Globals.CUSTOM_BUILD_SOURCE === BUILD_SOURCE.ASTER ||
        Globals.CUSTOM_BUILD_SOURCE === BUILD_SOURCE.ALNOOR ||
        Globals.CUSTOM_BUILD_SOURCE === BUILD_SOURCE.YWAIT ||
        Globals.CUSTOM_BUILD_SOURCE === BUILD_SOURCE.INSTA
      ) {
        updateVideoEndedIfNeeded();
      } else {
        clearTimeout(timer);
      }
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [time]);
  const updateVideoEndedIfNeeded = () => {
    // console.log('updateVideoEndedIfNeeded called');
    setIsVideoEnded(true);
    navigateToScreen();
  };
  const fetchBusinessDetails = () => {
    if (isConnected === true) {
      let url =
        APIConnection.BASE_URL + APIConnection.ENDPOINTS.BUSINESS_DETAILS;
      DataManager.getBusinessDetails(url).then(([isSuccess, message, data]) => {
        console.log('SPLASH fetchBusinessDetails isSuccess: ', isSuccess);
        console.log('SPLASH fetchBusinessDetails MSG: ', message);
        console.log('SPLASH fetchBusinessDetails DATA: ', data);

        if (isSuccess === true) {
          if (data !== undefined && data !== null) {
            //Save business details
            StorageManager.saveBusinessDetails(data.objects);
            //Update Globals
            Colors.PRIMARY_COLOR = data.objects.primaryColor;
            Colors.SECONDARY_COLOR = data.objects.secondaryColor;
            Colors.SECONDARY_DARK_COLOR = Utils.changeColor(
              data.objects.secondaryColor,
              -4,
            );
            Globals.BUSINESS_DETAILS = data.objects;
            // console.log('business type =====', data.objects?.businessType);
            if (
              data.objects?.businessType === 'single-consultant' ||
              data.objects?.businessType ===
                'multiple-service-single-consultant'
            ) {
              Globals.IS_SINGLE_CONSULTANT_BUSINESS = true;
            } else {
              Globals.IS_SINGLE_CONSULTANT_BUSINESS = false;
            }

            //Get user details if logged in
            getIsUserLoggedIn().then(res => {
              Globals.IS_AUTHORIZED = res === 'true' ? true : false;
              if (Globals.IS_AUTHORIZED === true) {
                getAuthToken().then(token => {
                  Globals.TOKEN = token;
                  getLoggedInUserDetails().then(userInfo => {
                    Globals.USER_DETAILS = userInfo;
                    getUserDetails();
                  });
                });
              } else {
                setIsAPILoaded(true);
              }
            });
          }
        } else {
          Utils.showToast(t(Translations.FAILED), message, 'error', 'bottom');
          if (Platform.OS === 'windows') {
            setTimeout(() => {
              Utils.hideToast();
            }, 3000);
          }
        }
      });
    } else {
      Utils.showToast(
        t(Translations.FAILED),
        t(Translations.NO_INTERNET_CONNECTION),
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
  const getUserDetails = () => {
    let url =
      APIConnection.BASE_URL +
      APIConnection.ENDPOINTS.USER_DETAILS +
      Globals.USER_DETAILS._id;
    DataManager.getUserDetails(url).then(
      ([isSuccess, message, responseData]) => {
        console.log('getUserDetails isSuccess: ', isSuccess);
        console.log('getUserDetails MSG: ', message);
        console.log('getUserDetails DATA: ', responseData);

        if (isSuccess === true) {
          if (responseData !== undefined && responseData !== null) {
            Globals.USER_DETAILS = responseData.objects;
            StorageManager.saveUserDetails(responseData.objects);

            getTVPointsList();
          }
        } else {
          Utils.showToast(t(Translations.FAILED), message, 'error', 'bottom');
          if (Platform.OS === 'windows') {
            setTimeout(() => {
              Utils.hideToast();
            }, 3000);
          }
        }
      },
    );
  };

  const getTVPointsList = () => {
    console.log('getTVPointsList function called');
    let url = APIConnection.BASE_URL + APIConnection.ENDPOINTS.TV_POINTS_LIST;
    //  setIsLoading(true);
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
              // console.log('getSavedSelectedTVPoint: ', res);
              if (
                res !== null &&
                res !== undefined &&
                responseTVPoints?.length > 0
              ) {
                for (let i = 0; i < responseTVPoints?.length; i++) {
                  if (responseTVPoints[i]._id === res?._id) {
                    // console.log('responseTVPoints Saved: ', res?._id);
                    setSelectedTvPointFound(true);
                    setIsAPILoaded(true);
                  }
                }

                // setTvPointList(responseTVPoints);
              }

              //  setIsLoading(false);
            });
          }
          setIsAPILoaded(true);
        } else {
          setIsAPILoaded(true);
          if (isConnected === true) {
            Utils.showToast(t(Translations.FAILED), message, 'error', 'bottom');
            if (Platform.OS === 'windows') {
              setTimeout(() => {
                Utils.hideToast();
              }, 3000);
            }
          }

          //  setIsLoading(false);
        }
      },
    );
  };

  const navigateToScreen = () => {
    // console.log('Selected Tv point found', selectedTvPointFound);
    dispatch(MenuActions.selectLogoutSettings(false));
    if (isVideoEnded === true && isAPILoaded === true) {
      getIsUserLoggedIn().then(res => {
        Globals.IS_AUTHORIZED = res === 'true' ? true : false;
        if (Globals.IS_AUTHORIZED === true) {
          getLoggedInUserDetails().then(userInfo => {
            Globals.USER_DETAILS = userInfo;
            getLanguage().then(i => {
              if (i !== null) {
                // console.log('<><><>< saved language', i);
                Globals.SELECTED_LANGUAGE_LIST = [...i];
                dispatch(LanguageActions.addLanguage([...i]));
                dispatch(LanguageActions.setDummyLanguageList([...i]));
              }
            });
            StorageManager?.getSetSpeakDisabled().then(isDisabled => {
              dispatch(
                VoiceLanguageActions.selectNoneOption(
                  isDisabled === true ? true : false,
                ),
              );
              dispatch(
                VoiceLanguageActions.disableSpeak(
                  isDisabled === true ? true : false,
                ),
              );
            });

            StorageManager.getIsRtl().then(isRtl => {
              dispatch(AlignmentActions.setRTL(isRtl === true ? true : false));
            });
            if (selectedTvPointFound) {
              StorageManager.getSavedSelectedTVPoint().then(savedPoint => {
                if (savedPoint !== undefined && savedPoint !== null) {
                  Globals.SAVED_TV_POINT_DETAILS = savedPoint;
                  Globals.IS_TV_POINT_SELECTED = true;
                  if (savedPoint?.consultants?.length < 2) {
                    // Globals.IS_SPLIT_TOKEN_SCREEN = false;
                    dispatch(MenuActions.setIsSplitScreenEnable(false));
                    dispatch(SplitScreenActions.setEnableSplitScreen(false));
                  }
                  dispatch(
                    TvPointActions?.setSelectedTvPointListLength(
                      savedPoint?.consultants?.length,
                    ),
                  );

                  StorageManager.getSavedIsSplitScreenEnabled().then(
                    isSplitEnabled => {
                      // Globals.IS_SPLIT_TOKEN_SCREEN =
                      //   isSplitEnabled === true ? true : false;
                      dispatch(
                        MenuActions.setIsSplitScreenEnable(
                          isSplitEnabled === true ? true : false,
                        ),
                      );
                    },
                  );
                  StorageManager.getSavedIsLiveTokensEnabled().then(
                    liveTokenEnabled => {
                      dispatch(
                        ShowLiveTokensActions.setShowLiveTokens(
                          liveTokenEnabled === true ? true : false,
                        ),
                      );
                    },
                  );
                  dispatch(MenuActions.selectLogoutMenu(false));
                  dispatch(MenuActions.selectTvMenu(false));
                  dispatch(TvPointActions.setIsTvItemSelected(false));
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                  });
                } else {
                  Globals.IS_TV_POINT_SELECTED = false;
                  dispatch(MenuActions.selectTvMenu(true));
                  dispatch(MenuActions.selectTvOption(false));
                  dispatch(MenuActions.selectSettingsOption(true));
                  dispatch(MenuActions.selectTvPointOption(true));
                  dispatch(MenuActions.selectLogoutMenu(false));
                  dispatch(MenuActions.selectLogoutSettings(false));
                  dispatch(TvPointActions.setIsTvItemSelected(false));
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                  });
                }
              });
            } else {
              Globals.IS_TV_POINT_SELECTED = false;
              dispatch(MenuActions.selectTvMenu(true));
              dispatch(MenuActions.selectTvOption(false));
              dispatch(MenuActions.selectSettingsOption(true));
              dispatch(MenuActions.selectTvPointOption(true));
              dispatch(MenuActions.selectLogoutMenu(false));
              dispatch(MenuActions.selectLogoutSettings(false));
              dispatch(TvPointActions.setIsTvItemSelected(false));
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
            }
          });
        } else {
          //Navigate to login

          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        }
      });
    }
  };

  const getIsUserLoggedIn = async () => {
    return await StorageManager.getIsAuthorized();
  };
  const getLoggedInUserDetails = async () => {
    return await StorageManager.getSavedUserDetails();
  };
  const getLanguage = async () => {
    let languageIndex = await StorageManager.getSelectedLanguageIndex();
    // console.log('<<<<<<------------->>>>>>', languageIndex);
    return languageIndex;
  };
  const getAuthToken = async () => {
    return await StorageManager.getSavedToken();
  };

  const onVideoError = () => {
    console.log('video error');
    setIsVideoEnded(true);
    navigateToScreen();
  };
  const onVideoEnd = () => {
    console.log('video ended..');
    setIsPaused(true);
    setTimeout(() => {
      if (refVideo?.current !== null) {
        refVideo?.current?.seek(1, 50);
        setIsPaused(false);
      }
    }, 10);
    setIsVideoEnded(true);
    navigateToScreen();
  };

  return isConnected === false ? (
    <NoNetworkComponent />
  ) : Globals.CUSTOM_BUILD_SOURCE === BUILD_SOURCE.INSTA ? (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={Images.INSTA_LOGO}
        style={{
          width: perfectSize(800),
          height: perfectSize(800),
        }}
      />
    </View>
  ) : Globals.CUSTOM_BUILD_SOURCE === BUILD_SOURCE.ALNOOR ? (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={Images.ALNOOR_LOGO}
        style={{
          width: perfectSize(800),
          height: perfectSize(800),
        }}
      />
    </View>
  ) : Globals.CUSTOM_BUILD_SOURCE === BUILD_SOURCE.ASTER ? (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={Images.ASTER_LOGO}
        style={{
          width: perfectSize(800),
          height: perfectSize(800),
        }}
      />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={Images.YWAIT_LOGO}
        style={{
          width: perfectSize(800),
          height: perfectSize(800),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.WHITE_COLOR,
  },
});

export default SplashScreen;
