import React, {useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  findNodeHandle,
  ImageBackground,
  Platform,
} from 'react-native';
import {Colors, Fonts, Images} from '../../constants';
import {FlatGrid} from 'react-native-super-grid';
import Utils from '../../helpers/utils/Utils';

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

const TVPointItem = ({
  itemIndex,
  isSelectedItem = false,
  isFocusedItem = false,
  title,
  consultants,
  hasTVPreferredFocus,
  blockFocusTop,
  blockFocusBottom,
  onSelectTVPoint,
  onFocusTVPoint,
}) => {
  const [focus, setFocus] = useState(false);
  //const [isSelectedItem, setIsSelectedItem] = useState(false);

  const onFocus = useCallback(() => {
    onFocusTVPoint(itemIndex);
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const onPress = useCallback(() => {
    // setIsSelectedItem(true);
    onSelectTVPoint(itemIndex);
    // if (Platform.OS === 'windows') {
    //     onSelectTVPoint(itemIndex);
    // }
  }, []);

  const touchableHighlightRef = useRef(null);
  const onRef = useCallback(ref => {
    if (ref) {
      touchableHighlightRef.current = ref;
    }
  }, []);

  // console.log(`Title: ${title} blockFocusTop: ${blockFocusTop} blockFocusBottom: ${blockFocusBottom}`);

  return (
    <TouchableHighlight
      underlayColor={Colors.TRANSPARENT}
      onPress={onPress}
      onFocus={onFocus}
      onBlur={onBlur}
      hasTVPreferredFocus={hasTVPreferredFocus}
      style={[
        focus === true || isFocusedItem === true
          ? {
              marginLeft: perfectSize(20),
              width: perfectSize(387),

              height: perfectSize(104),
            }
          : {width: perfectSize(383),
             height: perfectSize(105),
             marginTop:itemIndex ===0 ? 100: 0},
      ]}
      ref={onRef}
      nextFocusUp={
        blockFocusTop ? findNodeHandle(touchableHighlightRef.current) : null
      }
      nextFocusDown={
        blockFocusBottom ? findNodeHandle(touchableHighlightRef.current) : null
      }>
      <ImageBackground
        style={{
          backgroundColor:
            focus === true || isFocusedItem === true
              ? Colors.TRANSPARENT
              : Colors.TV_POINT_INACTIVE_BG_COLOR,
          flex: 1,
          flexDirection: 'row',
          resizeMode: 'contain',
          alignItems: 'center',
        }}
        source={
          focus === true || isFocusedItem === true
            ? Images.TV_POINT_OPTION_FOCUSED
            : Images.TRANSPARENT_IMAGE
        }>
        <Text
          style={[
            {width: '50%', fontFamily: Fonts.Poppins_Regular},
            focus === true || isFocusedItem === true
              ? {
                  marginLeft: perfectSize(120),
                  fontSize: perfectSize(24),
                  color: Colors.SETTINGS_ACTIVE_TEXT_COLOR,
                }
              : {
                  marginLeft: perfectSize(140),
                  fontSize: perfectSize(20),
                  color: Colors.SETTINGS_INACTIVE_TEXT_COLOR,
                },
          ]}
          numberOfLines={2}>
          {title}
        </Text>

        <Image
          style={{
            marginLeft: perfectSize(5),
            tintColor: Colors.PRIMARY_COLOR,
            width: perfectSize(24),
            height: perfectSize(24),
          }}
          source={isSelectedItem ? Images.TICK_IMAGE : Images.TRANSPARENT_IMAGE}
        />
      </ImageBackground>
    </TouchableHighlight>
  );
};

export default TVPointItem;
