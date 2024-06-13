import {StyleSheet, Text, View, Animated, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';

import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Colors, Fonts} from '../constants';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
import * as Animatable from 'react-native-animatable';
import {useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {mainSplitCarouselRef} from '../screens/newCarouselScreen/NewSplitCarouselScreen';
import {mainSingleCarouselRef} from '../screens/newCarouselScreen/NewSingleCarouselScreen';
const TokenNumberCell = ({
  tokenDetails,
  type,
  index,
  containerStyle = {},
  textStyle = {},
}) => {
  //  console.log('🚀 ~ file: TokenNumberCell.js:31 ~ isNew:', tokenDetails);
  const [animation, setAnimation] = useState('');
  const {selectedAnimationIndex} = useSelector(state => state?.AnimationState);
  const {menuSelected, settingOptionSelected, isSplitScreenEnabled} =
    useSelector(state => state.MenuState);
  // console.log('tokenDetails', tokenDetails);
  const {showLiveTokensEnabled} = useSelector(
    state => state.ShowLiveTokenState,
  );
  let carouselIndex = 0;
  if (isSplitScreenEnabled) {
    carouselIndex = mainSplitCarouselRef.current?.currentIndex ?? 0;
  } else {
    carouselIndex = mainSingleCarouselRef.current?.currentIndex ?? 0;
  }
  // useEffect(() => {
  //   // console.log('tokenDetails', tokenDetails);
  //   // Get the currently displayed item's index

  //   // console.log(`Item ${index}  ${carouselIndex}is currently displayed`);
  //   // Check if the item is currently displayed
  //   if (carouselIndex === index) {
  //     // console.log(`Item ${index} is currently displayed`);
  //     if (tokenDetails.type === 'ROOM') {
  //       if (tokenDetails.isNewInRoom === true) {
  //         // console.log('inside room =====================');

  //         setAnimation('zoomIn');
  //       } else {
  //         setAnimation('');
  //       }
  //     } else if (tokenDetails.type === 'CONSULTANT') {
  //       if (tokenDetails.isNewInConsultant === true) {
  //         // console.log('inside consultant =====================');

  //         setAnimation('zoomIn');
  //       } else {
  //         setAnimation('');
  //       }
  //     }
  //     // console.log('aaaaanimation', animation);
  //   }
  //   return () => {};
  // }, [carouselIndex, tokenDetails]);

  return (tokenDetails.type === 'ROOM' &&
    tokenDetails.isNewInRoom &&
    showLiveTokensEnabled === false) ||
    (tokenDetails.type === 'CONSULTANT' &&
      tokenDetails.isNewInConsultant &&
      showLiveTokensEnabled === false) ? (
    <Animatable.View
      animation={'zoomIn'}
      iterationCount={3}
      duration={3000}
      key={`TvApp-item-${tokenDetails.token}${carouselIndex}`}
      style={{
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftColor: Colors.SECONDARY_COLOR,
        borderRightColor: Colors.SECONDARY_COLOR,
        borderBottomColor: Colors.SECONDARY_COLOR,
        ...containerStyle,
      }}>
      <View
        style={{
          height: perfectSize(8),
          borderTopLeftRadius: perfectSize(10),
          borderTopRightRadius: perfectSize(10),
          backgroundColor: Colors.PRIMARY_COLOR,
        }}
      />
      {/* <Text>{tokenDetails.isNewInConsultant ? 'true' : 'false'}</Text> */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: Colors.SECONDARY_COLOR,
            fontFamily: Fonts.Poppins_MediumItalic,

            alignSelf: 'center',
            ...textStyle,
          }}
          adjustsFontSizeToFit
          allowFontScaling={true}
          numberOfLines={1}>
          #{tokenDetails?.token}
        </Text>
      </View>
    </Animatable.View>
  ) : (
    <View
      key={`TvApp-item-no-animation${tokenDetails.token}`}
      style={{
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftColor: Colors.SECONDARY_COLOR,
        borderRightColor: Colors.SECONDARY_COLOR,
        borderBottomColor: Colors.SECONDARY_COLOR,
        ...containerStyle,
      }}>
      <View
        style={{
          height: perfectSize(8),
          borderTopLeftRadius: perfectSize(10),
          borderTopRightRadius: perfectSize(10),
          backgroundColor: Colors.PRIMARY_COLOR,
        }}
      />
      {/* <Text>{tokenDetails.isNewInConsultant ? 'true' : 'false'}</Text> */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: Colors.SECONDARY_COLOR,
            fontFamily: Fonts.Poppins_MediumItalic,

            alignSelf: 'center',
            ...textStyle,
          }}
          adjustsFontSizeToFit
          allowFontScaling={true}
          numberOfLines={1}>
          #{tokenDetails?.token}
        </Text>
      </View>
    </View>
  );
};
export default TokenNumberCell;

const styles = StyleSheet.create({});
