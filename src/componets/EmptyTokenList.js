import {StyleSheet, Text, View, Image, Platform, FlatList} from 'react-native';
import React from 'react';
import {Images, Fonts} from '../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Strings, Colors} from '../constants';
import Utils from '../helpers/utils/Utils';

import moment from 'moment';
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

const EmptyTokenList = ({isSplitScreen}) => {
  const {t, i18n} = useTranslation();
  const {isRTL} = useSelector(state => state.AlignmentState);
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: isSplitScreen === true ? perfectSize(180) : perfectSize(140),
          height: isSplitScreen === true ? perfectSize(120) : perfectSize(100),
          alignSelf: 'center',
          transform: [{scaleX: isRTL ? -1 : 1}],
        }}
        source={Images.EMPTY_CUSTOMER}
      />
      <Text
        style={{
          color: Colors.SECONDARY_COLOR,
          fontFamily: Fonts.Poppins_Medium,
          fontSize: isSplitScreen === true ? perfectSize(30) : perfectSize(30),
          alignSelf: 'center',
          marginTop: perfectSize(20),
        }}>
        {t(Translations.NO_CUSTOMER_AVAILABLE)}
      </Text>
    </View>
  );
};

export default EmptyTokenList;

const styles = StyleSheet.create({
  container: {alignSelf: 'center', marginTop: perfectSize(60)},
});
