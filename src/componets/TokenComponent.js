import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import React from 'react';

import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Strings, Colors, Images, Fonts} from '../constants';
import Utils from '../helpers/utils/Utils';
import ServingPersonDetails from './ServingPersonDetails';
import ServingTokenList from './ServingTokenList';
import {useSelector} from 'react-redux';
import {responsiveWidth} from 'react-native-responsive-dimensions';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const TokenComponent = ({item, index, type}) => {
  // console.log('TokenComponent=====', item);
  const {isRTL} = useSelector(state => state.AlignmentState);
  const {showLiveTokensEnabled} = useSelector(
    state => state.ShowLiveTokenState,
  );
  return (
    <View
      style={[
        styles.servingShadowView,
        {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginLeft:
            isRTL === false && showLiveTokensEnabled === true
              ? responsiveWidth(-10)
              : undefined,
        },
      ]}>
      <ServingPersonDetails
        item={item.consultantDetails}
        index={index}
        type={item.type}
      />
      <View
        style={{
          backgroundColor: '#989898',
          alignSelf: 'center',
          width: perfectSize(1.5),
          height: perfectSize(342),
        }}
      />
      <ServingTokenList item={item} index={index} type={type} />
    </View>
  );
};

export default TokenComponent;

const styles = StyleSheet.create({
  servingShadowView: {
    width: perfectSize(1344),
    height: perfectSize(444),

    backgroundColor: '#F2F2F2',
  },
  servingPersonTitle: {
    color: '#222222',
    fontFamily: Fonts.Poppins_Medium,
    fontSize: perfectSize(20),
  },
  servingPersonNameTitle: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: perfectSize(30),
  },
  servingDepartmentNameTitle: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: perfectSize(20),
  },
});
