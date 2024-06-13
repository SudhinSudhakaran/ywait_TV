import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import React from 'react';
import {Images, Fonts} from '../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Strings, Globals, Colors} from '../constants';
import Utils from '../helpers/utils/Utils';
import ConsultantImage from './ConsultantImage';
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
const NoNetworkComponent = ({isFromSettings}) => {
  const {t, i18n} = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>

        <Image
          source={Images.NO_INTERNET}
          style={{
            height: isFromSettings ? '20%' : '33%',
            aspectRatio: 1.1,
            resizeMode: 'cover',
            tintColor: Colors.PRIMARY_COLOR,
          }}
        />
      
      <Text
        style={{
          fontSize: isFromSettings ? perfectSize(30) : perfectSize(50),
          marginTop: perfectSize(10),
          color: Colors.SECONDARY_COLOR,
          fontWeight: 'bold',
          textAlign: 'left',
        }}>
        {t(Translations.NO_INTERNET_CONNECTION)}
      </Text>
    </View>
  );
};

export default NoNetworkComponent;

const styles = StyleSheet.create({});
