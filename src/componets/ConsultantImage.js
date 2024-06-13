import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import React, {useState, useEffect} from 'react';
import {Images, Fonts} from '../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Strings, Colors} from '../constants';
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
const ConsultantImage = ({uri, isSplitScreen, style}) => {
const {isRTL} =
  useSelector(
    state => state.AlignmentState,
  )

  return (
    <View
      style={{
       
        height: perfectSize(141),
        alignItems: isRTL ? 'flex-end' : 'flex-start',
      }}>
      <Image
        style={{
          marginLeft: isSplitScreen ? perfectSize(65) : perfectSize(90),
          marginTop: isSplitScreen ? perfectSize(23) : perfectSize(33),
          marginBottom: perfectSize(47),
          width: perfectSize(141),
          height: perfectSize(141),
          borderRadius: perfectSize(141) / 2,
          overflow: 'hidden',
          borderWidth: perfectSize(3),
          borderColor: Colors.SECONDARY_COLOR,
          resizeMode: 'cover',
          ...style,
          
        }}
        source={{
          uri: uri,
        }}
      />
    </View>
  );
};
const areEqual = (prevProps, nextProps) => {
  // Return true if the data prop is the same, false otherwise
  return prevProps.uri !== nextProps.uri;
};
export default React.memo(ConsultantImage, areEqual);

const styles = StyleSheet.create({});
