import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,

  TouchableHighlight,
  Alert,
  Platform,
  BackHandler,
} from 'react-native';
import Utils from '../helpers/utils/Utils';
import {Images, Fonts, Colors, Globals} from '../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Strings} from '../constants';
import BusinessImageComponent from './BusinessImageComponent';
import moment from 'moment';
import TimerComponent from './TimerComponent';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import { useSelector } from 'react-redux';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
const HeaderComponent = props => {
  const {t, i18n} = useTranslation();
  const {isRTL} = useSelector(state=> state.AlignmentState)
  return (
    <View
      style={[styles.topBar, {flexDirection: isRTL ? 'row-reverse' : 'row'}]}>
      <View
        style={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
          alignItems: 'center',
          justifyContent: isRTL ? 'flex-start' : 'flex-end',
        }}>
        {Platform.OS === 'web' ? null : (
          <TouchableHighlight
            onFocus={() => props.onPressMenuButtonAction()}
            // onBlur={() => props.onBlurMenuButtonAction()}
            onPress={() => props.onPressMenuButtonAction()}>
            <Image
              style={[
                {
                  width: perfectSize(37),
                  height: perfectSize(37),
                  resizeMode: 'contain',
                  marginLeft: isRTL ? undefined : perfectSize(44),
                  tintColor: 'white',
                  transform: [{scaleX: isRTL ? -1 : 1}],
                  marginRight: isRTL ? perfectSize(44) : undefined,
                },
              ]}
              source={Images.MENU_ICON}
            />
          </TouchableHighlight>
        )}
        <Text
          style={[
            styles.topBarTitle,
            {marginRight: isRTL ? perfectSize(20) : undefined},
          ]}>
          {t(Translations.TOKEN_STATUS)}
        </Text>
        <TimerComponent />
      </View>
      <View
        style={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
          height: '100%',
          alignItems: 'center',
        }}>
        <View
          style={[
            {
              flexDirection: isRTL ? 'row-reverse' : 'row',
              maxWidth: perfectSize(251),
              height: '55%',
              marginRight: perfectSize(44),
              backgroundColor: Colors.WHITE_COLOR,
              borderRadius: 8,
              justifyContent: 'space-around',
              paddingLeft: perfectSize(4),
              paddingRight: perfectSize(4),
              alignItems: 'center',
            },
          ]}>
          <BusinessImageComponent url={Globals?.BUSINESS_DETAILS?.image} />
          {Globals?.BUSINESS_DETAILS?.businessNameImage === undefined ||
          Globals?.BUSINESS_DETAILS?.businessNameImage === null ||
          Utils.isValidUrl(Globals?.BUSINESS_DETAILS?.businessNameImage) ===
            false ? (
            <Text
              style={{
                color: Colors.SECONDARY_COLOR,
                fontFamily: Fonts.Poppins_SemiBold,
                // fontSize: perfectSize(35),
                alignSelf: 'center',
                marginLeft: perfectSize(3),
                marginTop: perfectSize(3),
              }}
              numberOfLines={1}>
              {Globals?.BUSINESS_DETAILS?.name}
            </Text>
          ) : (
            <Image
              style={{
                width: '55%',
                height: '95%',
                resizeMode: 'contain',
                alignSelf: 'center',
                marginLeft: perfectSize(3),
              }}
              source={{
                uri: Globals.BUSINESS_DETAILS
                  ? Globals.BUSINESS_DETAILS.businessNameImage
                  : null,
              }}
            />
          )}
        </View>

        {/* <TouchableHighlight
          onFocus={() => props.onFocusHomeButtonAction()}
          onBlur={() => props.onBlurHomeButtonAction()}
          onPress={() => props.onPressHomeButtonAction()}>
          <Image
            style={[
              {
                width: perfectSize(40),
                height: perfectSize(40),
                resizeMode: 'contain',
                marginRight: perfectSize(64),
                tintColor: props.isHomeFocused
                  ? Colors.PRIMARY_COLOR
                  : Colors.SECONDARY_COLOR,
              },
            ]}
            source={Images.HOME_IMAGE}
          />
        </TouchableHighlight>  */}
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  topBar: {
 
    height: perfectSize(100),
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    alignItems: 'center',
    //alignContent: 'center',
  },
  topBarTitle: {
    color: Colors.WHITE_COLOR,
    marginLeft: perfectSize(64),
    fontFamily: Fonts.Poppins_Medium,
    fontSize: perfectSize(38),
  },

  topBarRightLogoView: {
    right: perfectSize(130),
    position: 'absolute',
    width: perfectSize(306),
    height: perfectSize(101),
    backgroundColor: Colors.WHITE_COLOR,
    borderRadius: 8,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  topBarRightSettingsView: {
    marginRight: perfectSize(8),
    width: perfectSize(101),
    height: perfectSize(101),
    backgroundColor: Colors.WHITE_COLOR,
    borderRadius: 8,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  topBarRightSettingsImage: {
    width: '70%',
    height: '70%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  topBarRightLogoImage: {
    width: '95%',
    height: '95%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
