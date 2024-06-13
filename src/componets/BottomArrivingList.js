import {View, Text, Image, FlatList, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import {Colors, Fonts, Globals, Images} from '../constants';
import NoAppointmentScheduleText from './NoAppointmentScheduleText';
import moment from 'moment';
import NextListBottomComponent from './NextListBottomComponent';
import {useSelector} from 'react-redux';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
const BottomArrivingList = props => {
  const {isRTL} = useSelector(state => state.AlignmentState);
  const DATA = [
    {id: 1, token: 'PMM256', estimatedTime: '2016-08-25T15:17:21.033-10:00'},
    {id: 2, token: 'PMM252', estimatedTime: '2016-08-25T15:17:21.033-10:00'},
    {id: 3, token: 'PMM226', estimatedTime: '2016-08-25T15:17:21.033-10:00'},
    {id: 4, token: 'PMM226', estimatedTime: '2016-08-25T15:17:21.033-10:00'},
    {id: 5, token: 'PMM226', estimatedTime: '2016-08-25T15:17:21.033-10:00'},
    {id: 6, token: 'PMM226', estimatedTime: '2016-08-25T15:17:21.033-10:00'},
    {id: 7, token: 'PMM226', estimatedTime: '2016-08-25T15:17:21.033-10:00'},
    {id: 8, token: 'PMM226', estimatedTime: '2016-08-25T15:17:21.033-10:00'},
  ];
  // console.log('type============================================', props.type);

  const renderItem = ({item, index}) => {
    return (
      <NextListBottomComponent
        item={item}
        index={index}
        type={props?.type}
        isSplitScreen={props?.isSplitScreen}
      />
    );
  };
  return (
    <FlatList
      ref={props.bottomFlatListRef}
      listKey={(item, index) =>
        item?._id ? `${item?._id.toString()}+123123` : index.toString()
      }
      keyExtractor={(item, index) =>
        item?._id ? item?._id.toString() : index.toString()
      }
      sliderWidth={perfectSize(1680)}
      itemWidth={perfectSize(140)} //loop={false}
      //loopClonesPerSide={1}
      //autoplay={true}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1} // enableSnap={true}
      // activeSlideAlignment={'start'}
      //snapToInterval={perfectSize(140)} //your element width
      //snapToAlignment={'start'}
      // onSnapToItem={(slideIndex) => {
      //     console.log('onSnapToItem: ', slideIndex);
      //     if (slideIndex === item?.arrivedCustomerListBottom?.length - 1) {
      //         // bottomFlatListRef.current.scrollToIndex(1);
      //         bottomFlatListRef.current.snapToItem(0, true, true);
      //     }
      // }}
      style={{
        flexDirection: isRTL ? 'row-reverse' : 'row',
        height: perfectSize(180),

        marginTop: perfectSize(35),
        marginLeft: props?.isSplitScreen ? perfectSize(50) : perfectSize(125),
        marginRight: props?.isSplitScreen ? perfectSize(50) : perfectSize(125),
      }}
      data={props?.item || []}
      //   data={DATA}
      horizontal={true}
      renderItem={renderItem}
    />
  );
};
export default BottomArrivingList;
