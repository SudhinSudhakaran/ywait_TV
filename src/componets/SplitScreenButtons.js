import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Colors, Fonts, Globals, Images, Strings} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {TvPointActions} from '../redux/actions';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const SplitScreenButtons = props => {
  const {t, i18n} = useTranslation();
  const {tvPointListLength, splitScreenEnabled} = useSelector(
    state => state?.TvPointState,
  );

  return (
    <View
      style={{
        flex: 0.75,
        backgroundColor: 'transparent',
        left: '15%',
        justifyContent: 'center',
      }}>
      {/* Enable button */}
      <TouchableHighlight
        underlayColor={Colors.TRANSPARENT}
        onFocus={() =>
          tvPointListLength > 1 ? props.onFocusSplitScreenEnableAction() : null
        }
        onBlur={() =>
          tvPointListLength > 1 ? props.onBlurSplitScreenEnableAction() : null
        }
        onPress={() =>
          tvPointListLength > 1 ? props.splitEnableAction() : null
        }>
        <ImageBackground
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginRight: '10%',
            width: perfectSize(280),
            height: perfectSize(170),
            resizeMode: 'contain',
          }}
          source={
            props.isSplitScreenEnableFocused
              ? Images.SPLIT_SCREEN_OPTION_FOCUSED
              : Images.SPLIT_SCREEN_OPTION_NON_FOCUSED
          }>
          <Image
            style={{
              width: perfectSize(32),
              height: perfectSize(32),
            }}
            source={
              props.isSplitScreenEnabled
                ? Images.RADIO_ON_ICON
                : Images.RADIO_OFF_ICON
            }
          />
          <Text
            style={{
              marginLeft: perfectSize(40),
              fontFamily: Fonts.Poppins_Regular,
              fontSize: perfectSize(27),
              color: Colors.SETTINGS_ACTIVE_TEXT_COLOR,
              textAlign:'left',
            }}>
            {t(Translations.ENABLE)}
          </Text>
        </ImageBackground>
      </TouchableHighlight>

      {/* Disable button */}
      <TouchableHighlight
        underlayColor={Colors.TRANSPARENT}
        onFocus={() =>
          tvPointListLength > 1 ? props.onFocusSplitScreenDisableAction() : null
        }
        onBlur={() =>
          tvPointListLength > 1 ? props.onBlurSplitScreenDisableAction() : null
        }
        onPress={() =>
          tvPointListLength > 1 ? props.splitDisableAction() : null
        }>
        <ImageBackground
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginRight: '10%',
            marginBottom: '5%',
            width: perfectSize(280),
            height: perfectSize(170),
            resizeMode: 'contain',
          }}
          source={
            props.isSplitScreenDisableFocused
              ? Images.SPLIT_SCREEN_OPTION_FOCUSED
              : Images.SPLIT_SCREEN_OPTION_NON_FOCUSED
          }>
          <Image
            style={{
              width: perfectSize(32),
              height: perfectSize(32),
            }}
            source={
              !props.isSplitScreenEnabled
                ? Images.RADIO_ON_ICON
                : Images.RADIO_OFF_ICON
            }
          />
          <Text
            style={{
              marginLeft: perfectSize(40),
              fontFamily: Fonts.Poppins_Regular,
              fontSize: perfectSize(27),
              color: Colors.SETTINGS_ACTIVE_TEXT_COLOR,
              textAlign:'left',
            }}>
            {t(Translations.DISABLE)}
          </Text>
        </ImageBackground>
      </TouchableHighlight>
    </View>
  );
};
export default SplitScreenButtons;

const styles = StyleSheet.create({});
