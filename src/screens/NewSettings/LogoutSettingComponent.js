import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {Colors, Fonts, Globals, Images, Strings} from '../../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import {MenuActions} from '../../redux/actions';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import StorageManager from '../../helpers/storage/StorageManager';
import {LanguageActions} from '../../redux/actions';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const LogoutSettingComponent = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const {isRTL} = useSelector(state => state.AlignmentState);
  const onFocusSplitScreenAction = () => {};
  const {} = useSelector(state => state.MenuState);
  const confirmButtonAction = () => {
    // console.log('confirm pressed');
    (Globals.PREVIOUS_TOKENS_LIST =  [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]),
      (Globals.PREVIOUS_SPLIT_SCREEN_TOKENS_LIST = [
        { leftServingUserDetails: [], rightServingUserDetails: [] },
        { leftServingUserDetails: [], rightServingUserDetails: [] },
        { leftServingUserDetails: [], rightServingUserDetails: [] },
        { leftServingUserDetails: [], rightServingUserDetails: [] },
        { leftServingUserDetails: [], rightServingUserDetails: [] },
        { leftServingUserDetails: [], rightServingUserDetails: [] },
        { leftServingUserDetails: [], rightServingUserDetails: [] },
        { leftServingUserDetails: [], rightServingUserDetails: [] },
        { leftServingUserDetails: [], rightServingUserDetails: [] },
        { leftServingUserDetails: [], rightServingUserDetails: [] },
      ]),
      (Globals.SAVED_TV_POINT_DETAILS = {});
    Globals.IS_TV_POINT_SELECTED = false;
    dispatch(LanguageActions.setDummyLanguageList([]));
    StorageManager.ClearUserRelatedData();
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };
  const cancelButtonAction = () => {
    dispatch(MenuActions.selectLogoutSettings(false));
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors.SECONDARY_COLOR,
          flexDirection: isRTL ? 'row-reverse' : 'row',
        },
      ]}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: perfectSize(35),
            color: 'white',
            marginLeft: 10,
            fontFamily: Fonts.Poppins_Regular,
            textAlign: isRTL ? 'right' : 'left',
            marginRight: isRTL ? perfectSize(80) : undefined,
          }}>
          {t(Translations.CONFIRM)}
        </Text>
        <Text
          style={{
            fontSize: perfectSize(30),
            color: 'white',
            marginTop: perfectSize(10),
            marginLeft: 10,
            fontFamily: Fonts.Poppins_Regular,
            textAlign: isRTL ? 'right' : 'left',
            marginRight: isRTL ? perfectSize(80) : undefined,
          }}>
          {t(Translations.LOG_OUT_MSG)} ?
        </Text>
        <TouchableHighlight
          ref={props.onLogoutCancelButtonRef}
          underlayColor={Colors.PRIMARY_COLOR}
          onFocus={() => cancelButtonAction()}
          // onBlur={() => props.onBlurLogoutCancelButtonAction()}
          onPress={() => cancelButtonAction()}
          style={{
            position: 'absolute',
            right: isRTL ? perfectSize(1000) : perfectSize(40),
            bottom: perfectSize(0),
            width: perfectSize(110),
            height: perfectSize(40),
            backgroundColor: Colors.WHITE_COLOR,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Regular,
              fontSize: perfectSize(16),
              color: props.isLogoutCancelFocused
                ? Colors.WHITE_COLOR
                : Colors.BLACK_COLOR,
              alignSelf: 'center',
              textAlign: isRTL ? 'right' : 'left',
            }}
            numberOfLines={1}>
            {t(Translations.CANCEL)}
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          ref={props.onLogoutYesButtonRef}
          underlayColor={Colors.PRIMARY_COLOR}
          onFocus={() => confirmButtonAction()}
          // onBlur={() => props.onBlurLogoutYesButtonAction()}
          onPress={() => confirmButtonAction()}
          style={{
            position: 'absolute',
            right: isRTL ? perfectSize(850) : perfectSize(180),
            bottom: perfectSize(0),
            width: perfectSize(110),
            height: perfectSize(40),
            backgroundColor: Colors.WHITE_COLOR,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Regular,
              fontSize: perfectSize(16),
              color: props.isLogoutYesFocused
                ? Colors.WHITE_COLOR
                : Colors.BLACK_COLOR,
              alignSelf: 'center',
              textAlign: isRTL ? 'right' : 'left',
            }}
            numberOfLines={1}>
            {t(Translations.YES)}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default LogoutSettingComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    width: perfectSize(1200),

    height: perfectSize(200),
    marginTop: 50,
    marginLeft: perfectSize(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
