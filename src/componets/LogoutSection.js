import React from 'react';
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
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const LogoutSection = props =>{
  const {t, i18n} = useTranslation();
  const {isRTL} = useSelector(state=> state.AlignmentState)
return(
  <View
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      position: 'absolute',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: '100%',
      height: '100%',
    }}>
    <View
      style={{
        backgroundColor: Colors.BLACK_COLOR,
        marginRight:isRTL? perfectSize(600) : perfectSize(100),
        marginBottom: perfectSize(50),
        width: perfectSize(870),
        height: perfectSize(246),
      }}>
      <Text
        style={{
          color: Colors.SETTINGS_ACTIVE_TEXT_COLOR,
          fontFamily: Fonts.Poppins_Regular,
          fontSize: perfectSize(24),
          marginTop: perfectSize(43),
          marginLeft: perfectSize(53),
          textAlign: isRTL ? 'right' : 'left',
          marginRight : isRTL ?  perfectSize(50) : undefined
        }}>
       {t(Translations.CONFIRM)}
      </Text>

      <Text
        style={{
          color: Colors.SETTINGS_ACTIVE_TEXT_COLOR,
          fontFamily: Fonts.Poppins_Regular,
          fontSize: perfectSize(20),
          marginTop: perfectSize(20),
          marginLeft: perfectSize(53),
          textAlign: isRTL ? 'right' : 'left',
          marginRight : isRTL ?  perfectSize(50) : undefined
        }}>
        {t(Translations.EXIT)} ?
      </Text>

      <TouchableHighlight
        ref={props.onLogoutCancelButtonRef}
        underlayColor={Colors.PRIMARY_COLOR}
        onFocus={() => props.cancelButtonAction()}
        // onBlur={() => props.onBlurLogoutCancelButtonAction()}
        onPress={() => props.cancelButtonAction()}
        style={{
          position: 'absolute',
          bottom: perfectSize(32),
          width: perfectSize(110),
          height: perfectSize(40),
          backgroundColor: Colors.WHITE_COLOR,
          justifyContent: 'center',
          right: isRTL ? perfectSize(700) :  perfectSize(169),
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
        onFocus={() => props.confirmButtonAction()}
        // onBlur={() => props.onBlurLogoutYesButtonAction()}
        onPress={() => props.confirmButtonAction()}
        style={{
          position: 'absolute',
          bottom: perfectSize(32),
          width: perfectSize(110),
          height: perfectSize(40),
          backgroundColor: Colors.WHITE_COLOR,
          justifyContent: 'center',
          right: isRTL ? perfectSize(550) :  perfectSize(49),
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
        }
export default LogoutSection;

const styles = StyleSheet.create({});
