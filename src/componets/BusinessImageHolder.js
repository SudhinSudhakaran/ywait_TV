import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Colors, Globals} from '../constants';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
const BusinessImageHolder = props => (
  <View style={styles.businessImageHolderView}>
    <Image
      style={styles.businessLogoImage}
      source={{
        uri: Globals.BUSINESS_DETAILS?.image || '',
      }}
    />
  </View>
);

export default BusinessImageHolder;

const styles = StyleSheet.create({
  businessImageHolderView: {
    justifyContent: 'center',
    width: perfectSize(104),
    height: perfectSize(104),
    alignSelf: 'center',
    borderRadius: perfectSize(104) / 2,
    resizeMode: 'cover',
    //Shadow props
    borderWidth: perfectSize(0.3),
    borderColor: Colors.BORDER_COLOR,
    backgroundColor: Colors.WHITE_COLOR,
    shadowColor: '#0006',
    shadowOffset: {width: 0, height: perfectSize(6)},
    shadowOpacity: 0.8,
    shadowRadius: perfectSize(10),
    elevation: perfectSize(8),
    padding: perfectSize(8),
  },
  businessLogoImage: {
    width: perfectSize(90),
    height: perfectSize(90),
    alignSelf: 'center',
    resizeMode: 'cover',
    borderRadius: perfectSize(90) / 2,
    overflow: 'hidden',
  },
});
