import React from 'react';
import { View, Image, TouchableHighlight, Platform } from 'react-native';
import { Colors, Globals, Images } from '../../constants';
import { PixelRatio, Dimensions } from 'react-native';
import { create } from 'react-native-pixel-perfect';
import { MenuActions, TvPointActions } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import Utils from '../../helpers/utils/Utils';
import Translations from '../../constants/Translations';
import { useTranslation } from 'react-i18next';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const LeftViewComponent = props => {
  const { t, i18n } = useTranslation();
  const { isRTL } = useSelector(state => state.AlignmentState);
  const dispatch = useDispatch();
  const {
    menuSelected,
    tvOptionSelected,
    settingOptionSelected,
    selectTvPointOptionSelected,
    isLogoutSelected,
  } = useSelector(state => state.MenuState);
  const { tvPointList, selectedTvPointForToast } = useSelector(
    state => state.TvPointState,
  );
  const onFocusTVPointMenuAction = () => {
    dispatch(MenuActions.selectTvOption(true));
    dispatch(MenuActions.selectSettingsOption(false));
  };
  const onPressTvButtonAction = () => {
    if (Globals.IS_TV_POINT_SELECTED === true) {
      //Navigate to token page
      dispatch(MenuActions.selectTvOption(true));
      dispatch(MenuActions.selectSettingsOption(false));


      setTimeout(() => {
         dispatch(MenuActions.selectTvMenu(false));
       }, 2000);
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
  const onFocusSettingsMenuAction = () => {
    dispatch(MenuActions.selectTvOption(false));
    dispatch(MenuActions.selectSettingsOption(true));
  };
  const onPressSettingsMenuAction = () => {
    dispatch(MenuActions.selectTvOption(false));
    dispatch(MenuActions.selectSettingsOption(true));
    dispatch(MenuActions.selectLogoutSettings(false));

    if (selectTvPointOptionSelected === false) {
      dispatch(TvPointActions.setIsTvItemSelected(false));
    } else {
      dispatch(TvPointActions.setIsTvItemSelected(true));
    }
  };

  return (
    <View
      style={{
        //   flex:1,
        backgroundColor: Colors.SECONDARY_COLOR,
        width: perfectSize(180),
        height: perfectSize(980),
        // position: 'absolute',
      }}>
      <TouchableHighlight
        underlayColor={Colors.PRIMARY_COLOR}
        onFocus={() => onFocusTVPointMenuAction()}
        onPress={() => onPressTvButtonAction()}
        style={{
          width: perfectSize(180),
          height: perfectSize(100),
          marginTop: 10,
          backgroundColor:
            tvOptionSelected === true
              ? Colors.PRIMARY_COLOR
              : Colors.SECONDARY_COLOR,
          borderRadius: 6,
        }}>
        <Image
          style={{
            width: perfectSize(50),
            height: perfectSize(50),
            resizeMode: 'contain',
            marginLeft: perfectSize(60),
            marginTop: 13,
            tintColor: 'white',
          }}
          source={Images.SPLIT_SCREEN_ICON}
        />
      </TouchableHighlight>
      {/* Settings selection button */}
      <TouchableHighlight
        underlayColor={Colors.PRIMARY_COLOR}
        onPress={() => onPressSettingsMenuAction()}
        onFocus={() => onFocusSettingsMenuAction()}
        style={{
          width: perfectSize(180),
          height: perfectSize(100),
          marginTop: 10,
          backgroundColor:
            settingOptionSelected === true
              ? Colors.PRIMARY_COLOR
              : Colors.SECONDARY_COLOR,
          borderRadius: 6,
        }}>
        <Image
          style={{
            width: perfectSize(50),
            height: perfectSize(50),
            resizeMode: 'contain',
            marginLeft: perfectSize(60),
            marginTop: 13,
            tintColor: 'white',
          }}
          source={Images.SETTINGS_GEAR_IMAGE}
        />
      </TouchableHighlight>
      {/* {
        Platform.OS === 'windows' ? <View style={{height: perfectSize(100)}} /> : null
      } */}
      <TouchableHighlight
        underlayColor={Colors.PRIMARY_COLOR}
        onFocus={() => props.onFocusLogoutMenuAction()}
        // onBlur={() => props.onBlurLogoutMenuAction()}
        onPress={() => props.onFocusLogoutMenuAction()}
        style={{
          width: perfectSize(180),
          height: perfectSize(100),
          marginTop: 260,
          borderRadius: 6,

          position: 'absolute',
          bottom:
            Platform.OS === 'windows' ? perfectSize(120) : perfectSize(50),
          backgroundColor:
            isLogoutSelected === true
              ? Colors.PRIMARY_COLOR
              : Colors.SECONDARY_COLOR,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: perfectSize(props.isMenuLogoutFocused ? 32 : 30),
            height: perfectSize(props.isMenuLogoutFocused ? 32 : 30),
            resizeMode: 'contain',
            // marginLeft: perfectSize(80),
            // marginTop: 10,
            tintColor: 'white',
          }}
          source={Images.LOGOUT_ICON}
        />
      </TouchableHighlight>
    </View>
  );
};
export default LeftViewComponent;
