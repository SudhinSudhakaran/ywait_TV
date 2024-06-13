import {View, Text, Image,ImageBackground} from 'react-native';
import React from 'react';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import {Colors, Fonts, Images} from '../constants';
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
const NoAppointmentScheduleText = ({splitScreen, bottom}) => {
  const {t, i18n} = useTranslation();
  const {isRTL} = useSelector(state=>state.AlignmentState)
  return (
    <View
      style={{
        position: 'absolute',
        bottom: bottom,
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <Image
        source={Images.NO_APPOINTMENT}
        style={{
          width: splitScreen === true ? perfectSize(100) : perfectSize(150),
          height: splitScreen === true ? perfectSize(100) : perfectSize(150),
          marginTop: splitScreen ? perfectSize(100) : perfectSize(100),
          tintColor: Colors.PRIMARY_COLOR,
          transform: [{scaleX: isRTL ? -1 : 1}],
        }}
      />
      <Text
        style={{
          alignSelf: 'center',
          color: Colors.SECONDARY_COLOR,
          fontFamily: Fonts.Poppins_SemiBold,
          textAlign: isRTL ? 'right' : 'left',
          fontSize: splitScreen === true ? perfectSize(30) : perfectSize(35),
          // marginTop: perfectSize(-50),
        }}>
        {t(Translations.NO_APPOINMENT_TEXT)}
      </Text>
    </View>
  );
};

export default React.memo(NoAppointmentScheduleText);
