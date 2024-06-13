import {StyleSheet, Text, View, Image, Platform, FlatList} from 'react-native';
import React from 'react';
import {Images, Fonts} from '../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Strings, Colors} from '../constants';
import Utils from '../helpers/utils/Utils';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
const ItemSeparator = () => {
  return <View style={{width: perfectSize(30)}} />;
};

export default ItemSeparator;

const styles = StyleSheet.create({});
