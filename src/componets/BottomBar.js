import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Images, Fonts} from '../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Strings} from '../constants';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
const BottomBar = () => {
  const {t, i18n} = useTranslation();
  const {isRTL} = useSelector(state => state.AlignmentState);
  return (
    <View
      style={[
        styles.bottomBar,
        {flexDirection: isRTL ? 'row-reverse' : 'row'},
      ]}>
      <Text
        style={{
          color: '#FFFFFF',
          marginLeft: isRTL ? undefined : perfectSize(64),
          marginRight: isRTL ? perfectSize(64) : undefined,
          fontFamily: Fonts.Poppins_Regular,
          fontSize: perfectSize(15),
          marginTop: perfectSize(20),
        }}>
        © 2023 V {Strings.APP_VERSION}
      </Text>
      <View
        style={{
          right: perfectSize(10),
          height: '70%',
          width: '12%',
        }}>
        <View
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            marginTop: perfectSize(4),
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: Fonts.Poppins_Regular,
              fontSize: perfectSize(15),
              alignSelf: 'center',
              marginTop: perfectSize(15),
              marginLeft: isRTL ? perfectSize(5) : undefined,
            }}>
            {t(Translations.POWERED_BY)}
          </Text>
          <Image
            style={styles.bottomBarRightLogoImage}
            source={Images.YWAIT_SMALL_LOGO}
          />
        </View>
      </View>
    </View>
  );
};
export default BottomBar;

const styles = StyleSheet.create({
  bottomBar: {
    width: '100%',
    height: '5%',
    backgroundColor: '#000000',

    justifyContent: 'space-between',
    zIndex: 5,
  },
  bottomBarCopyLeftText: {},
  bottomBarCopyRightText: {},
  bottomBarRightLogo: {},
  bottomBarRightLogoImage: {
    marginLeft: perfectSize(10),
    width: perfectSize(70),
    height: perfectSize(30),
    resizeMode: 'contain',
    marginTop: perfectSize(10),
  },
});
