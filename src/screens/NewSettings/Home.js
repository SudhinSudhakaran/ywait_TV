/* eslint-disable react/self-closing-comp */
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Alert,
  Platform,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LeftViewComponent from './LeftViewComponent';
import { useNavigation } from '@react-navigation/core';
import APIConnection from '../../helpers/api/APIConnection';
import DataManager from '../../helpers/api/DataManager';
import Utils from '../../helpers/utils/Utils';
import { create } from 'react-native-pixel-perfect';
import { PixelRatio, Dimensions } from 'react-native';
import { Colors, Globals } from '../../constants';
import SettingSelection from './SettingSelection';
import StorageManager from '../../helpers/storage/StorageManager';
import { useDispatch, useSelector } from 'react-redux';
import { MenuActions, TvPointActions } from '../../redux/actions';
import Translations from '../../constants/Translations';
import { useTranslation } from 'react-i18next';
import TokenStatusDoubleScreen from '../tokenStatus/TokenStatusDoubleScreen';
import TokenStatusScreen from '../tokenStatus/TokenStatusScreen';
import HeaderComponent from '../../componets/HeaderComponent';
import BottomBar from '../../componets/BottomBar';
import { AppRegistry } from 'react-native';
import Tts from 'react-native-tts';
import LogoutSection from '../../componets/LogoutSection';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
import { useTVEventHandler } from 'react-native';
import TokenScreen from './TokenScreen';
const Home = () => {
  const { t, i18n } = useTranslation();

  const [isConnected, setIsConnected] = useState(true);

  const [isSplitScreenSelected, setIsSplitScreenSelected] = useState(false);

  const [isDisplayLanguageSelected, setIsDisplayLanguageSelected] =
    useState(false);
  const [isVoiceLanguageSelected, setIsVoiceLanguageSelected] = useState(false);
  const [isSelectTvPointSelected, setIsSelectTvPointSelected] = useState(false);

  const [isMenuLogoutFocused, setIssMenuLogoutFocused] = useState(false);
  const [isLogOutOptionSelected, setIsLogoutOptionSelected] = useState(false);

  const dispatch = useDispatch();

  const {
    menuSelected,

    settingOptionSelected,

    isSplitScreenEnabled,
  } = useSelector(state => state.MenuState);

  const { isRTL } = useSelector(state => state.AlignmentState);

  const myTVEventHandler = evt => {
    if (evt?.eventType === 'left') {
      if (settingOptionSelected === false) {
        dispatch(MenuActions.selectTvMenu(!menuSelected));
        dispatch(MenuActions.selectTvOption(true));
        dispatch(MenuActions.selectSettingsOption(false));
        dispatch(MenuActions.selectLogoutMenu(false));
        dispatch(MenuActions.selectTvPointOption(false));
      }
    }
    console.log('evt', evt);
  };

  if (Platform.OS !== 'windows') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTVEventHandler(myTVEventHandler);
  }






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
          { text: 'EXIT', onPress: () => BackHandler.exitApp() },
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

  const onFocusSplitScreenAction = () => {
    setIsSplitScreenSelected(true);
    setIsDisplayLanguageSelected(false);
    setIsVoiceLanguageSelected(false);
    setIsSelectTvPointSelected(false);
  };
  const onFocusDisplayLanguageAction = () => {
    setIsSplitScreenSelected(false);
    setIsDisplayLanguageSelected(true);
    setIsVoiceLanguageSelected(false);
    setIsSelectTvPointSelected(false);
  };
  const onFocusVoiceLanguageAction = () => {
    setIsSplitScreenSelected(false);
    setIsDisplayLanguageSelected(false);
    setIsVoiceLanguageSelected(true);
    setIsSelectTvPointSelected(false);
  };

  const onFocusSelectTvPointAction = () => {
    getTVPointsList();

    setIsSplitScreenSelected(false);
    setIsDisplayLanguageSelected(false);
    setIsVoiceLanguageSelected(false);
    setIsSelectTvPointSelected(true);

    // setIsSelectTvItemSelected(true);
  };
  const onFocusLogoutMenuAction = () => {
    setIsSplitScreenSelected(false);
    setIsDisplayLanguageSelected(false);
    setIsVoiceLanguageSelected(false);
    setIsSelectTvPointSelected(false);

    dispatch(MenuActions.selectTvOption(false));
    dispatch(MenuActions.selectLogoutMenu(true));
    dispatch(MenuActions.selectSettingsOption(false));
    setIssMenuLogoutFocused(true);
  };

  const onPressMenuButtonAction = () => {
    // console.log('selected item', selectedItem);
    if (
      isMenuLogoutFocused === false &&
      Globals.IS_TV_POINT_SELECTED === true
    ) {
      dispatch(MenuActions.selectTvMenu(!menuSelected));
      dispatch(MenuActions.selectTvOption(true));
      dispatch(MenuActions.selectSettingsOption(false));
      dispatch(MenuActions.selectLogoutMenu(false));
      dispatch(MenuActions.selectTvPointOption(false));
    }
    else {
      Utils.showToast(
        t(Translations.SORRY),
        t(Translations.PLEASE_SELECT_TV_POINT_TO_PROCEED),
        'error',
        'bottom',
      );
    }
  };
  const onFocusMenuButtonAction = () => {
    if (
      isMenuLogoutFocused === false &&
      Globals.IS_TV_POINT_SELECTED === true
    ) {
      dispatch(MenuActions.selectTvMenu(!menuSelected));
      dispatch(MenuActions.selectTvOption(true));
      dispatch(MenuActions.selectSettingsOption(false));
      dispatch(MenuActions.selectLogoutMenu(false));
      dispatch(MenuActions.selectTvPointOption(false));
    }
  };

  const cancelButtonAction = () => {
    // console.log('cancell pressed');
    setIssMenuLogoutFocused(false);
    dispatch(MenuActions.selectLogoutMenu(false));
    dispatch(MenuActions.selectSettingsOption(true));
    
    dispatch(MenuActions.selectTvOption(false));
    dispatch(MenuActions.selectTvPointOption(true));

    dispatch(TvPointActions.setIsTvItemSelected(true));
    dispatch(MenuActions.selectLogoutSettings(false));

    
  };
  const confirmButtonAction = () => {
    BackHandler.exitApp();

    if (Platform.OS === 'windows') {
      AppRegistry.unmountApplicationComponentAtRootTag();
    }
  };

  const onPressLogoutOption = () => {
    setIsLogoutOptionSelected(true);
    //

    setIsSplitScreenSelected(false);
    setIsDisplayLanguageSelected(false);
    setIsVoiceLanguageSelected(false);
    setIsSelectTvPointSelected(false);
  };
  const onFocusLogoutOption = () => {
    setIsLogoutOptionSelected(true);
    //

    setIsSplitScreenSelected(false);
    setIsDisplayLanguageSelected(false);
    setIsVoiceLanguageSelected(false);
    setIsSelectTvPointSelected(false);
  };
  const onBlurLogoutOption = () => { };

  //API calls
  const getTVPointsList = () => {
    let url = APIConnection.BASE_URL + APIConnection.ENDPOINTS.TV_POINTS_LIST;

    DataManager.getTVPointList(url).then(
      ([isSuccess, message, responseData]) => {
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
                    responseTVPoints[i].isSelectedItem = true;
                  }
                }
              }
              dispatch(TvPointActions.setTvPointList(responseTVPoints));
            });
          }
        } else {
          if (isConnected === true) {
            Utils.showToast(t(Translations.FAILED), message, 'error', 'bottom');
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
  return (
    <View
      style={{
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
      }}>
      {/* Top Bar */}
      <HeaderComponent
        isSettingFocused={false}
        isHomeFocused={true}
        onFocusMenuButtonAction={onFocusMenuButtonAction}
        // onBlurMenuButtonAction={onBlurMenuButtonAction}
        onPressMenuButtonAction={onPressMenuButtonAction}
      />
      {/* 
      <View style={{ flex: 1, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
        {settingOptionSelected === false ? (
        <TokenScreen />
        ) : <View style={{backgroundColor:'red', width:100,height:100}}></View>}
      </View> */}
      {menuSelected === false ?
       <View style={{ flex: 1, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
         <TokenScreen />
          </View> : (
        <View
          style={{
            // flex: 1,
            // width: '100%',
            // flexDirection: isRTL ? 'row-reverse' : 'row',
            // backgroundColor: 'transparent',
            // position: 'absolute',
            // marginTop: perfectSize(100),
            flex: 1, flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
          <LeftViewComponent
            onFocusLogoutMenuAction={onFocusLogoutMenuAction}
            isMenuLogoutFocused={isMenuLogoutFocused}
          />
          {settingOptionSelected === false ? null : (
            <View
              style={
                {
                  // marginLeft: isRTL ? undefined : perfectSize(180),
                  // marginRight: isRTL ? perfectSize(180) : undefined,
                }
              }>
              <SettingSelection
                onFocusSplitScreenAction={onFocusSplitScreenAction}
                onFocusDisplayLanguageAction={onFocusDisplayLanguageAction}
                onFocusVoiceLanguageAction={onFocusVoiceLanguageAction}
                isVoiceLanguageSelected={isVoiceLanguageSelected}
                isSplitScreenSelected={isSplitScreenSelected}
                isSelectTvPointSelected={isSelectTvPointSelected}
                isDisplayLanguageSelected={isDisplayLanguageSelected}
                onFocusSelectTvPointAction={onFocusSelectTvPointAction}
                onFocusLogoutOption={onFocusLogoutOption}
                onPressLogoutOption={onPressLogoutOption}
                onBlurLogoutOption={onBlurLogoutOption}
                isLogOutOptionSelected={isLogOutOptionSelected}
              />
              <View style={{ width: perfectSize(20) }} />
            </View>
          )}
          {isMenuLogoutFocused ? (
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}>
              <LogoutSection
                confirmButtonAction={confirmButtonAction}
                cancelButtonAction={cancelButtonAction}
              />
            </View>
          ) : null}
        </View>
      )}

      <BottomBar />
    </View>
  );
};

export default Home;
