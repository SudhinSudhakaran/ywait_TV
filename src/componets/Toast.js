import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Fonts} from '../constants';
import {useFocusEffect} from '@react-navigation/native';
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
const Toast = ({isVisible, message, title}) => {
  const {t, i18n} = useTranslation();
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          width: perfectSize(1000),
          position: 'absolute',
          bottom: perfectSize(100),
        }}>
        <View
          style={{
            borderTopLeftRadius: perfectSize(10),
            borderBottomLeftRadius: perfectSize(10),
            backgroundColor: '#FFA500',
            width: perfectSize(6),
          }}
        />
        <View style={styles.toast}>
          <Text style={styles.title}>{title || t(Translations.FAILED)}</Text>
          <Text style={styles.message}>{message || ''}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Toast;

const styles = StyleSheet.create({
  modal: {},
  toast: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: perfectSize(10),
    borderTopRightRadius: perfectSize(10),
    borderBottomRightRadius: perfectSize(10),
  },
  message: {
    fontSize: perfectSize(20),
    color: '#000',
    marginTop: perfectSize(2),
    marginBottom: perfectSize(5),
    fontFamily: Fonts.Poppins_Medium,
  },
  title: {
    fontSize: perfectSize(25),
    color: '#000',
    marginTop: perfectSize(10),
    fontFamily: Fonts.Poppins_Medium,
  },
});
