import {View, Text, Image, FlatList, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import {Colors, Fonts, Globals, Images} from '../constants';
import NoAppointmentScheduleText from './NoAppointmentScheduleText';
import moment from 'moment';
import {useSelector} from 'react-redux';
import NextListComponent from './NextListComponent';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const TopArrivingList = props => {
  // console.log('Top Arrived list',props.item)
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
  const {isRTL} = useSelector(state => state.AlignmentState);
  // console.log('props.item>>>>>>>>>>>>>>>>>>>>>>>>>', props.item);
  const renderItem = ({item, index}) => {
    return (
      <NextListComponent
        item={item}
        index={index}
        type={props?.type}
        isSplitScreen={props?.isSplitScreen}
      />
    );
  };

  return (
    <FlatList
      listKey={(item, index) =>
        item?._id ? `${item?._id.toString()}+1231jhj23` : index.toString()
      }
      keyExtractor={(item, index) =>
        item?._id ? item?._id.toString() : index.toString()
      }
      ref={props.topFlatListRef}
      showsHorizontalScrollIndicator={false}
      decelerationRate={0}
      snapToInterval={perfectSize(210)} //your element width
      snapToAlignment={'center'}
      style={{
        // alignSelf: 'center',
        flexDirection: isRTL ? 'row-reverse' : 'row',
        marginTop: perfectSize(36),
        // marginLeft: isRTL ?  props?.isSplitScreen ? perfectSize(700) :
        // props?.isSplitScreen ? perfectSize(50) :perfectSize(125) : perfectSize(700),
        marginLeft: isRTL
          ? props?.isSplitScreen
            ? perfectSize(700)
            : perfectSize(550)
          : props?.isSplitScreen
          ? perfectSize(50)
          : perfectSize(125),
        marginRight: isRTL
          ? props?.isSplitScreen
            ? perfectSize(50)
            : perfectSize(125)
          : perfectSize(50),
      }}
      data={props?.item || []}
      // data={DATA}
      horizontal={true} // contentContainerStyle={{backgroundColor:'green',alignItems:'flex-start',flex:1}}
      renderItem={renderItem}
    />
  );
};

export default TopArrivingList;
