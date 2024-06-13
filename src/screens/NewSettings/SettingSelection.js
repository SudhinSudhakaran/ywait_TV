import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import {Platform} from 'react-native';
import APIConnection from '../../helpers/api/APIConnection';
import DataManager from '../../helpers/api/DataManager';
import Utils from '../../helpers/utils/Utils';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import {Colors, Fonts, Globals} from '../../constants';

import SplitScreenSelection from './SplitScreenSelection';
import DislayLanguageSelection from './DislayLanguageSelection';
import SelectTvPointSelection from './SelectTvPointSelection';
import VoiceLanguageSelection from './VoiceLanguageSelection';
import StorageManager from '../../helpers/storage/StorageManager';
import TvItem from './TvItem';
import {useDispatch, useSelector} from 'react-redux';
import Translations from '../../constants/Translations';
import {useTranslation} from 'react-i18next';
import NetInfo from '@react-native-community/netinfo';
import {MenuActions, TvPointActions} from '../../redux/actions';
import {useFocusEffect} from '@react-navigation/native';
import LogoutSettingComponent from './LogoutSettingComponent';
import ShowLiveTokenOptionContainer from './ShowLiveTokenOptionContainer';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const SettingSelection = props => {
  const [isLoading, setIsLoading] = useState(false);
  // const [tvPointList, setTvPointList] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [isMenuSettingSelected, setIsMenuSettingSelected] = useState(false);
  const [isSplitScreenSelected, setIsSplitScreenSelected] = useState(false);
  const [isScreenSettingsSelected, setIsScreenSettingsSelected] = useState(false);
 
  const [isMenuTVPointFocused, setIsMenuTVPointFocused] = useState(false);
  const [isDisplayLanguageSelected, setIsDisplayLanguageSelected] =
    useState(false);
  const [isVoiceLanguageSelected, setIsVoiceLanguageSelected] = useState(false);
  const [isSelectTvPointSelected, setIsSelectTvPointSelected] = useState(false);
  const [isSelectTvItemSelected, setIsSelectTvItemSelected] = useState(false);
  const [isSettingSelected, setIsSettingSelected] = useState(false);
  // const [isTvItemSelected, setIsTvItemSelected] = useState(false);
  const [assignButtonSelected, setAssignButtonSelected] = useState(false);
  const [assignedButtonSelected, setAssignedButtonSelected] = useState(false);
  const [isTvPointSelected, setIsTvPointSelected] = useState(false);
  const [isMainTvSelected, setIsMainTvSelected] = useState(true);
  const [focusedTVPointIndex, setFocusedTVPointIndex] = useState(0);
  const [tvPointName, setTvPointName] = useState('');
  const [tvSelected, setTvSelected] = useState(false);
  const [selectedConsultantList, setSelectedConsultantList] = useState([]);
  const [nameStore, setNameStore] = useState(selectedConsultantList.name);
  const [splitScreenEnableButton, setSplitScreenEnableButton] = useState(false);
  const [splitScreenDisableButton, setSplitScreenDisableButton] =
    useState(false);
  const [showSplitScreen, setShowSplitScreen] = useState(false);
  const [emptyTvPoint, setEmptyTvPoint] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuLogoutFocused, setIssMenuLogoutFocused] = useState(false);
  const {t, i18n} = useTranslation();
  const {tvPointListLength, splitScreenEnabled} = useSelector(
    state => state?.TvPointState,
  );
  const {isRTL} = useSelector(state => state.AlignmentState);
  const dispatch = useDispatch();
  const {
    languageList,
    selectedLanguageIndex,
    selectedLanguageList,
    dummyLanguageList,
  } = useSelector(state => state?.LanguageState);
  const {
    menuSelected,
    tvOptionSelected,
    settingOptionSelected,
    selectTvPointOptionSelected,
    isLogoutSettingSelected,
  } = useSelector(state => state.MenuState);
  const {tvPointList, isTvItemSelected} = useSelector(
    state => state.TvPointState,
  );

  useLayoutEffect(() => {
    getTVPointsList();
    // console.log('$$$$$$$$$$$',tvPointListLength)

    return () => {};
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getTVPointsList = () => {
    // console.log('getTVPointsList');
    let url = APIConnection.BASE_URL + APIConnection.ENDPOINTS.TV_POINTS_LIST;
    setIsLoading(true);
    DataManager.getUserDetails(url).then(
      ([isSuccess, message, responseData]) => {
        var responseTVPoints = [];
        // console.log('getTVPointsList isSuccess: ', isSuccess);
        // console.log('getTVPointsList MSG: ', message);
        // console.log('getTVPointsList DATA: ', responseData);

        if (isSuccess === true) {
          if (responseData) {
            if (responseData.objects && responseData.objects.length > 0) {
              responseData.objects.map((item, index) => {
                // console.log('item tvtvtvtvtv', item);
                let tvItem = {...item};
                let _mainConsultantList = [];
                if (tvItem.consultants && tvItem.consultants.length > 0) {
                  tvItem.consultants.map((_item, i) => {
                    let _mainItem = {..._item};
                    if (_item?.role_id?.key === 'Consultant') {
                      _mainItem.type = 'CONSULTANT';
                    } else {
                      _mainItem.type = 'ROOM';
                    }
                    _mainConsultantList.push(_mainItem);
                  });
                }
                tvItem.consultants = _mainConsultantList;
                // console.log('Tv items', tvItem);
                responseTVPoints.push(tvItem);
                return null; // add this return statement
              });
            }

            // Check if already selected a point
            StorageManager.getSavedSelectedTVPoint().then(res => {
              // console.log('getSavedSelectedTVPoint: ', res);
              if (res && responseTVPoints.length > 0) {
                for (let i = 0; i < responseTVPoints.length; i++) {
                  if (responseTVPoints[i]._id === res?._id) {
                    // console.log('responseTVPoints Saved: ', res?._id);
                    responseTVPoints[i].isSelectedItem = true;
                  }
                }
                // setTvPointList(responseTVPoints);
              }
              dispatch(TvPointActions.setTvPointList(responseTVPoints));
              setIsLoading(false);
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

          setIsLoading(false);
        }
      },
    );
  };

  const onFocusSplitScreenAction = () => {
    if (Globals.IS_TV_POINT_SELECTED === true) {
      setIsMainTvSelected(false);
      setIsMenuSettingSelected(true);
      setIsSplitScreenSelected(true);
      setIsScreenSettingsSelected(false);
      setIsDisplayLanguageSelected(false);
      setIsVoiceLanguageSelected(false);
      setIsSelectTvPointSelected(false);
      // setIsTvItemSelected(false);
      dispatch(TvPointActions.setIsTvItemSelected(false));
      setIsSelectTvItemSelected(false);
      setIssMenuLogoutFocused(false);
      dispatch(MenuActions.selectTvPointOption(false));
      dispatch(MenuActions.selectLogoutSettings(false));
    } else {
      Utils.showToast(
        t(Translations.SORRY),
        t(Translations.PLEASE_SELECT_TV_POINT_TO_PROCEED),
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

  const onFocusShowLiveScreenAction = () => {
    if (Globals.IS_TV_POINT_SELECTED === true) {
      setIsMainTvSelected(false);
      setIsMenuSettingSelected(false);
      setIsScreenSettingsSelected(true);
      setIsSplitScreenSelected(false);
      setIsDisplayLanguageSelected(false);
      setIsVoiceLanguageSelected(false);
      setIsSelectTvPointSelected(false);

      dispatch(TvPointActions.setIsTvItemSelected(false));
      setIsSelectTvItemSelected(false);
      setIssMenuLogoutFocused(false);
      dispatch(MenuActions.selectTvPointOption(false));
      dispatch(MenuActions.selectLogoutSettings(false));
    } else {
      Utils.showToast(
        t(Translations.SORRY),
        t(Translations.PLEASE_SELECT_TV_POINT_TO_PROCEED),
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

  const onFocusDisplayLanguageAction = () => {
    if (Globals.IS_TV_POINT_SELECTED === true) {
      setIsMainTvSelected(false);
      setIsMenuSettingSelected(true);
      setIsSplitScreenSelected(false);
      setIsScreenSettingsSelected(false);
      setIsDisplayLanguageSelected(true);
      setIsVoiceLanguageSelected(false);
      setIsSelectTvPointSelected(false);
      // setIsTvItemSelected(false);
      dispatch(TvPointActions.setIsTvItemSelected(false));
      setIsSelectTvItemSelected(false);
      setIssMenuLogoutFocused(false);
      dispatch(MenuActions.selectTvPointOption(false));
      dispatch(MenuActions.selectLogoutSettings(false));
    } else {
      Utils.showToast(
        t(Translations.SORRY),
        t(Translations.PLEASE_SELECT_TV_POINT_TO_PROCEED),
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
  const onFocusVoiceLanguageAction = () => {
    if (Globals.IS_TV_POINT_SELECTED === true) {
      setIsMainTvSelected(false);
      setIsMenuSettingSelected(true);
      setIsSplitScreenSelected(false);
      setIsScreenSettingsSelected(false);
      setIsDisplayLanguageSelected(false);
      setIsVoiceLanguageSelected(true);
      setIsSelectTvPointSelected(false);
      // setIsTvItemSelected(false);
      dispatch(TvPointActions.setIsTvItemSelected(false));
      setIsSelectTvItemSelected(false);
      setIssMenuLogoutFocused(false);
      dispatch(MenuActions.selectTvPointOption(false));
      dispatch(MenuActions.selectLogoutSettings(false));
    } else {
      Utils.showToast(
        t(Translations.SORRY),
        t(Translations.PLEASE_SELECT_TV_POINT_TO_PROCEED),
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
  const onFocusSelectTvitemAction = () => {
    console.log('Pressed tv point item');
    setIsMainTvSelected(false);
    setIsMenuSettingSelected(true);
    setIsSplitScreenSelected(false);
    setIsScreenSettingsSelected(false);
    setIsDisplayLanguageSelected(false);
    setIsVoiceLanguageSelected(false);
    setIsSelectTvPointSelected(true);
    setIsSelectTvItemSelected(true);
    // setIsTvItemSelected(true);
    dispatch(TvPointActions.setIsTvItemSelected(true));

    setAssignButtonSelected(false);
    setIssMenuLogoutFocused(false);
    dispatch(MenuActions.selectLogoutSettings(false));
  };
  const onFocusSelectTvPointAction = () => {
    dispatch(MenuActions.selectTvPointOption(true));
    dispatch(MenuActions.selectLogoutSettings(false));
    setIsMainTvSelected(false);
    // getTVPointsList();
    setIsMenuSettingSelected(true);
    setIsSplitScreenSelected(false);
    setIsScreenSettingsSelected(false);
    setIsDisplayLanguageSelected(false);
    setIsVoiceLanguageSelected(false);
    setIsSelectTvPointSelected(true);
    setAssignButtonSelected(false);

    setIssMenuLogoutFocused(false);
    // setIsSelectTvItemSelected(true);

    if (Globals.SELECTED_TV_POINT !== undefined) {
      setSelectedConsultantList(Globals.SELECTED_TV_POINT);
      // setIsTvItemSelected(true);
      dispatch(TvPointActions.setIsTvItemSelected(true));
    } else {
    }
  };

  const onPressLogoutOption = () => {
    dispatch(MenuActions.selectLogoutSettings(true));
    dispatch(TvPointActions.setIsTvItemSelected(false));
    dispatch(MenuActions.selectTvPointOption(false));
    setIsMainTvSelected(false);
    // getTVPointsList();
    setIsMenuSettingSelected(true);
    setIsSplitScreenSelected(false);
    setIsScreenSettingsSelected(false);
    setIsDisplayLanguageSelected(false);
    setIsVoiceLanguageSelected(false);
    setIsSelectTvPointSelected(true);
    setAssignButtonSelected(false);

    setIssMenuLogoutFocused(false);
  };
  const SplitScreenEnable = () => {
    //Save to storage manager
    StorageManager.saveIsSplitScreenEnabled(true);
    Globals.IS_SPLIT_TOKEN_SCREEN = true;
    // dispatch(SplitScreenActions.setEnableSplitScreen(true));
    setSplitScreenEnableButton(true);
  };

  const SplitScreenDisable = () => {
    //Save to storage manager
    StorageManager.saveIsSplitScreenEnabled(false);
    Globals.IS_SPLIT_TOKEN_SCREEN = false;
    // dispatch(SplitScreenActions.setEnableSplitScreen(false));
    setSplitScreenEnableButton(false);
  };

  const onFocusAssignedButtonAction = () => {
    setAssignButtonSelected(true);
    setAssignedButtonSelected(true);
  };

  const onFocusAssignButtonAction = () => {
    let newArr = [...tvPointList]; // copying the old tvPointList array
    // console.log('newarr=====', newArr, focusedTVPointIndex);
    for (let i = 0; i < newArr?.length; i++) {
      newArr[i].isSelectedItem = false;
      // console.log('=====',newArr[i].isSelectedItem);
    }
    newArr[focusedTVPointIndex].isSelectedItem = true; // update new value

    // setTvPointList(newArr);
    dispatch(TvPointActions.setTvPointList(newArr));
    setAssignButtonSelected(true);

    // console.log('tvPointList=====', tvPointList);
    //Save to storage manager
    StorageManager.saveSelectedTVPoint(tvPointList[focusedTVPointIndex]);
    Globals.SAVED_TV_POINT_DETAILS = tvPointList[focusedTVPointIndex];
    Globals.IS_TV_POINT_SELECTED = true;
    Globals.PREVIOUS_TOKEN_LIST = [];

    if (tvPointList[focusedTVPointIndex]?.consultants?.length < 2) {
      dispatch(MenuActions.setIsSplitScreenEnable(false));
    } else {
      StorageManager.getSavedIsSplitScreenEnabled().then(isSplitEnabled => {
        Globals.IS_SPLIT_TOKEN_SCREEN = isSplitEnabled === true ? true : false;
        dispatch(
          MenuActions.setIsSplitScreenEnable(
            isSplitEnabled === true ? true : false,
          ),
        );
      });
    }
  };

  //Child callback
  const didSelectedTVPoint = index => {
    // console.log('didSelectedTVPoint: ', index);
    let newArr = [...tvPointList]; // copying the old tvPointList array
    for (let i = 0; i < newArr?.length; i++) {
      newArr[i].isSelectedItem = false;
    }
    newArr[index].isSelectedItem = true; // update new value
    // setTvPointList(newArr);
    dispatch(TvPointActions.setTvPointList(newArr));
    setTvPointName(newArr[index].name);
    setFocusedTVPointIndex(index);
    setTvSelected(newArr[index].isSelectedItem);
    setSelectedConsultantList(newArr[index]);
  };

  return (
    <View
      style={{
        flexDirection: isRTL ? 'row-reverse' : 'row',
        height: perfectSize(980),
        width: perfectSize(405),
      }}>
      <View
        style={{
          backgroundColor: Colors.SECONDARY_DARK_COLOR,
          width: '100%',
          height: perfectSize(980),
        }}>
        <TouchableHighlight
          underlayColor={Colors.PRIMARY_COLOR}
          onPress={() => onFocusSelectTvPointAction()}
          onFocus={() => onFocusSelectTvPointAction()}
          style={{
            width: perfectSize(400),
            height: perfectSize(70),
            marginTop: 20,

            backgroundColor:
              selectTvPointOptionSelected === true
                ? Colors.PRIMARY_COLOR
                : Colors.SECONDARY_DARK_COLOR,
            borderRadius: 5,
            // marginLeft: perfectSize(1),
            marginLeft: isRTL ? undefined : perfectSize(1),
            marginRight: isRTL ? perfectSize(200) : undefined,
            justifyContent: 'center',
          }}>
          <Text
            style={[
              styles.text,
              {
                textAlign: isRTL ? 'right' : 'left',
                marginRight: isRTL ? perfectSize(80) : undefined,
              },
            ]}>
            {t(Translations.SELECT_TV_POINT)}
          </Text>
        </TouchableHighlight>
        {/* <TouchableHighlight
          underlayColor={Colors.PRIMARY_COLOR}
          onPress={() => onFocusSplitScreenAction()}
          style={{
            width: perfectSize(400),
            height: perfectSize(70),
            marginTop: 10,

            backgroundColor:
              isSplitScreenSelected === true
                ? Colors.PRIMARY_COLOR
                : Colors.SECONDARY_DARK_COLOR,
            borderRadius: 5,
            marginLeft: perfectSize(1),
            justifyContent: 'center',
          }}>
          <Text
            style={[
              styles.text,
              {
                textAlign: isRTL ? 'right' : 'left',
                marginRight: isRTL ? perfectSize(80) : undefined,
              },
            ]}>
            {t(Translations.SPLIT_SCREEN)}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={Colors.PRIMARY_COLOR}
          onPress={() => onFocusShowLiveScreenAction()}
          style={{
            width: perfectSize(400),
            height: perfectSize(70),
            marginTop: 10,

            backgroundColor:
              isScreenSettingsSelected === true
                ? Colors.PRIMARY_COLOR
                : Colors.SECONDARY_DARK_COLOR,
            borderRadius: 5,
            marginLeft: perfectSize(1),
            justifyContent: 'center',
          }}>
          <Text
            style={[
              styles.text,
              {
                textAlign: isRTL ? 'right' : 'left',
                marginRight: isRTL ? perfectSize(80) : undefined,
              },
            ]}>
            {t(Translations.SHOW_LIVE_TOKEN)}
          </Text>
        </TouchableHighlight> */}

{/* Screen options */}
<TouchableHighlight
          underlayColor={Colors.PRIMARY_COLOR}
          onPress={() => onFocusShowLiveScreenAction()}
          style={{
            width: perfectSize(400),
            height: perfectSize(70),
            marginTop: 10,

            backgroundColor:
              isScreenSettingsSelected === true
                ? Colors.PRIMARY_COLOR
                : Colors.SECONDARY_DARK_COLOR,
            borderRadius: 5,
            marginLeft: perfectSize(1),
            justifyContent: 'center',
          }}>
          <Text
            style={[
              styles.text,
              {
                textAlign: isRTL ? 'right' : 'left',
                marginRight: isRTL ? perfectSize(80) : undefined,
              },
            ]}>
            {t(Translations.SCREEN_SETTINGS)}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={Colors.PRIMARY_COLOR}
          onPress={() => onFocusDisplayLanguageAction()}
          style={{
            width: perfectSize(400),
            height: perfectSize(70),
            marginTop: 10,
            backgroundColor:
              isDisplayLanguageSelected === true
                ? Colors.PRIMARY_COLOR
                : Colors.SECONDARY_DARK_COLOR,
            borderRadius: 5,
            marginLeft: perfectSize(1),
            justifyContent: 'center',
          }}>
          <Text
            style={[
              styles.text,
              {
                textAlign: isRTL ? 'right' : 'left',
                marginRight: isRTL ? perfectSize(80) : undefined,
              },
            ]}>
            {t(Translations.DISPLAY_LANGUAGE)}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={Colors.PRIMARY_COLOR}
          onPress={() => onFocusVoiceLanguageAction()}
          style={{
            width: perfectSize(400),
            height: perfectSize(70),
            marginTop: 10,
            backgroundColor:
              isVoiceLanguageSelected === true
                ? Colors.PRIMARY_COLOR
                : Colors.SECONDARY_DARK_COLOR,
            borderRadius: 5,
            marginLeft: perfectSize(1),
            justifyContent: 'center',
          }}>
          <Text
            style={[
              styles.text,
              {
                textAlign: isRTL ? 'right' : 'left',
                marginRight: isRTL ? perfectSize(80) : undefined,
              },
            ]}>
            {t(Translations.VOICE_LANGUAGE)}
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor={Colors.PRIMARY_COLOR}
          onPress={() => {
            onPressLogoutOption();
          }}
          style={{
            width: perfectSize(400),
            height: perfectSize(70),
            marginTop: 10,
            backgroundColor:
              isLogoutSettingSelected === true
                ? Colors.PRIMARY_COLOR
                : Colors.SECONDARY_DARK_COLOR,
            borderRadius: 5,
            marginLeft: perfectSize(1),
            justifyContent: 'center',
          }}>
          <Text
            style={[
              styles.text,
              {
                textAlign: isRTL ? 'right' : 'left',
                marginRight: isRTL ? perfectSize(80) : undefined,
              },
            ]}>
            {t(Translations.LOG_OUT)}
          </Text>
        </TouchableHighlight>
      </View>



      {isScreenSettingsSelected === true ? (
        <View style={{marginLeft: perfectSize(60)}}>
        <ShowLiveTokenOptionContainer
            showTokenEnable={SplitScreenEnable}
            showTokenDisable={SplitScreenDisable}
            showTokenEnableButton={splitScreenEnableButton}
            showTokenDisableButton={splitScreenDisableButton}
          />
        <SplitScreenSelection
            SplitScreenEnable={SplitScreenEnable}
            SplitScreenDisable={SplitScreenDisable}
            splitScreenEnableButton={splitScreenEnableButton}
            splitScreenDisableButton={splitScreenDisableButton}
          />
     
        </View>
      ) : null}
      {isMenuTVPointFocused === true ? <TvItem /> : null}
      {isDisplayLanguageSelected === true ? <DislayLanguageSelection /> : null}
      {isVoiceLanguageSelected === true ? <VoiceLanguageSelection /> : null}
      {tvPointList.length >= 1 && selectTvPointOptionSelected === true ? (
        <View
          style={[
            {
              backgroundColor: Colors.SECONDARY_COLOR,
              width: perfectSize(550),
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
            {
              height:
                Platform.OS === 'windows' ? perfectSize(930) : perfectSize(930),
            },
          ]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: Colors.SECONDARY_COLOR,
              // backgroundColor: 'red',
              // width:perfectSize(350),
              // height: perfectSize(60),
              marginTop:
                Platform.OS === 'windows' ? perfectSize(8) : perfectSize(20),
              paddingBottom: perfectSize(100),
              // flexDirection: isRTL ? 'row-reverse' : 'row',
            }}>
            {tvPointList.map((item, i) => (
              <SelectTvPointSelection
                key={i}
                itemIndex={i}
                isSelectedItem={item.isSelectedItem || false}
                title={item.name}
                onFocusSelectTvitemAction={onFocusSelectTvitemAction}
                isTvItemSelected={isTvItemSelected}
                onSelectTVPoint={didSelectedTVPoint}
                consultants={item.consultants}
              />
            ))}
          </ScrollView>
        </View>
      ) : selectTvPointOptionSelected === false || isLoading === true ? null : (
        <Text
          style={[
            styles.emptypoint,
            {
              backgroundColor: Colors.SECONDARY_COLOR,
              height:
                Platform.OS === 'windows' ? perfectSize(930) : perfectSize(930),
            },
          ]}>
          No tv point found
        </Text>
      )}

      {isTvItemSelected === true ? (
        <View
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            marginLeft: isRTL ? perfectSize(1) : undefined,
          }}>
          <View style={{position: 'absolute'}}>
            <TvItem
              tvPointList={tvPointList}
              focusedTVPointIndex={focusedTVPointIndex}
              assignButtonSelected={assignButtonSelected}
              onSelectTVPoint={didSelectedTVPoint}
              onFocusAssignButtonAction={onFocusAssignButtonAction}
              assignedButtonSelected={assignedButtonSelected}
              onFocusAssignedButtonAction={onFocusAssignedButtonAction}
            />
          </View>
        </View>
      ) : null}
      {isLogoutSettingSelected === true ? <LogoutSettingComponent /> : null}
    </View>
  );
};

export default SettingSelection;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginLeft: 15,
    fontSize: perfectSize(35),
    // fontFamily: Fonts.Poppins_Medium,
    fontFamily: Fonts.Poppins_Regular,
  },
  emptypoint: {
    color: 'white',
    fontSize: perfectSize(35),
    paddingLeft: perfectSize(120),
    paddingTop: perfectSize(440),
    // fontFamily: Fonts.Poppins_Medium,
    fontFamily: Fonts.Poppins_Regular,
    // backgroundColor: Colors.SECONDARY_COLOR,
    width: perfectSize(550),
  },
});
