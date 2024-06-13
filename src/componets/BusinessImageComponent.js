import {StyleSheet, Text, View,Image} from 'react-native';
import React from 'react';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import { Globals } from '../constants';
import {Colors} from '../constants';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const BusinessImageComponent = ({url}) => (
  <View
    style={[
      {
        justifyContent: 'center',
        width: perfectSize(44),
        height: perfectSize(44),
        alignSelf: 'center',
        borderRadius: perfectSize(44) / 2,
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
        overflow: 'hidden',
        marginHorizontal: perfectSize(4),
        padding:perfectSize(5)
      },
    ]}>
    <Image
      style={{
        // width: perfectSize(54),
        // height: perfectSize(54),
    alignSelf: 'center',
        // resizeMode: 'center',
        // borderRadius: perfectSize(54) / 2,
        // overflow: 'hidden',
        flex: 1,
        aspectRatio: 1.1,
      resizeMode: 'cover',
      }}
      source={{
        uri: url,
      }}
    />
  </View>
);

export default BusinessImageComponent;

const styles = StyleSheet.create({});
