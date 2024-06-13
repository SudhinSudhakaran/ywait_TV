import {View, Text} from 'react-native';
import React from 'react';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import {Colors, Fonts} from '../constants';
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
const ListEmptyComponent = () => {
  const {t, i18n} = useTranslation();
  const {isRTL} = useSelector(state => state.AlignmentState);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{
          color: Colors.PRIMARY_COLOR,
          fontFamily: Fonts.Poppins_SemiBold,
          fontSize: perfectSize(35),
          textAlign: isRTL ? 'right' : 'left',
        }}>
        {' '}
        {t(Translations.CONSULTANT_NOT_AVAILABLE)}{' '}
      </Text>
    </View>
  );
};

export default ListEmptyComponent;
