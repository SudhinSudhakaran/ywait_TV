import React from 'react';
import {useSelector} from 'react-redux';
import {View, Platform} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import SplitScreenItem from './splitScreenComponents/SplitScreenItem';

let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const MultipleServingUserSplitView = ({item, index}) => {
  const {isRTL} = useSelector(state => state.AlignmentState);
  // console.log('item mul <><><><>', item);

  return (
    <View
      key={`TvApp_r-item-${index}`}
      style={{
        alignContent: 'center',
        // alignItems:'center',
        justifyContent: 'center',
        flexDirection: isRTL ? 'row-reverse' : 'row',
        height: perfectSize(Platform.OS === 'windows' ? 980 : 890),
      }}>
      <SplitScreenItem
        servingList={item?.leftServingList}
        topList={
          (item?.leftArrivedList.length ?? 0) > 0
            ? item?.leftArrivedList?.slice(0, 4)
            : []
        }
        bottomList={
          (item?.leftArrivedList.length ?? 0) > 0
            ? item?.leftArrivedList?.slice(4, 100)
            : []
        }
        type={item?.leftServingUserDetails?.type}
        servingUserDetails={item?.leftServingUserDetails}
        index={index}
      />

      <View
        style={{
          width: 1,
          backgroundColor: '#989898',
          marginTop: perfectSize(-50),
          height: Platform.OS === 'windows' ? perfectSize(830) : '87%',
        }}
      />
      {/* Right side items */}

      <SplitScreenItem
        servingList={item?.rightServingList}
        topList={
          (item?.rightArrivedList.length ?? 0) > 0
            ? item?.rightArrivedList?.slice(0, 4)
            : []
        }
        bottomList={
          (item?.rightArrivedList.length ?? 0) > 0
            ? item?.rightArrivedList?.slice(4, 100)
            : []
        }
        type={item?.rightServingUserDetails?.type}
        servingUserDetails={item?.rightServingUserDetails}
        index={index}
      />
    </View>
  );
};

export default MultipleServingUserSplitView;
