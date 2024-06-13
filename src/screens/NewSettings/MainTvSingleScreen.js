/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Alert,
  TouchableHighlight,
  Platform,
  BackHandler,
} from 'react-native';
import TokenStatusScreen from '../tokenStatus/TokenStatusScreen';
import TokenStatusDoubleScreen from '../tokenStatus/TokenStatusDoubleScreen';

import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';



let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const MainTvSingleScreen = ({showSplitScreen}) => {
  return showSplitScreen ? <TokenStatusDoubleScreen /> : <TokenStatusScreen />;
};

export default MainTvSingleScreen;
