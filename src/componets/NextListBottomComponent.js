import { View, Text, Image, FlatList, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { create } from 'react-native-pixel-perfect';
import { PixelRatio, Dimensions } from 'react-native';
import { Colors, Fonts, Globals, Images } from '../constants';
import NoAppointmentScheduleText from './NoAppointmentScheduleText';
import moment from 'moment';
import { useSelector } from 'react-redux';
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const NextListBottomComponent = ({ item, index, type, isSplitScreen }) => {
  const { isRTL } = useSelector(state => state.AlignmentState);
  const [showTime, setShowTime] = useState(type !== 'ROOM');


  const fromTime = moment(item?.dateFrom);
  const currentTime = moment();

  const tokenFontSize = (a) => {
    const fontScale = PixelRatio.getFontScale();
    return a * fontScale;
  }
  const getTimeString = () => {
    let timeOver = false
    if (moment(item?.estimatedTime || item?.dateFrom).toISOString() >
      moment().toISOString()) {
      // console.log(`The time ${fromTime.fromNow()} is in the past`);
      timeOver = false
    } else {
      // console.log(`The time ${fromTime.fromNow()} is in the future`);
      timeOver = true;
    }
    const timeFromNow = moment(item?.estimatedTime || item?.dateFrom).fromNow();
    if (Globals.PRACTO_BUILD) {
      return timeOver === true || timeFromNow === 'a few seconds ago' ? 'in few minutes' : timeFromNow;
    } else {
      return timeFromNow === 'a few seconds ago' ||
        timeFromNow === 'in a few seconds'
        ? 'in a minute'
        : timeFromNow;
    }
  };

  return (
    <View
    style={{
      width: perfectSize(140),
    }}>
    {type === 'ROOM' ? null : (
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            backgroundColor: '#1D1D1D',
            width: perfectSize(28),
            height: perfectSize(15),
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: Fonts.Poppins_SemiBoldItalic,
              fontSize: perfectSize(9),
              alignSelf: 'center',
            }}>
            #
            {(
              index + (isSplitScreen === true ? 5 : 9)
            ).toString()}
          </Text>
        </View>
        <Text
          style={{
            color: '#1D1D1D',
            fontFamily: Fonts.Poppins_Italic,
            fontSize: perfectSize(14),
            marginLeft: perfectSize(10),
          }}
          adjustsFontSizeToFit
          numberOfLines={1}>
          {/* {Globals.PRACTO_BUILD === true
            ? timeOver === true ||
              moment(
                item?.estimatedTime || item?.dateFrom,
              ).fromNow() === 'a few seconds ago'
              ? 'in few minutes'
              : moment(item?.estimatedTime || item?.dateFrom).fromNow()
            : moment(
                item?.estimatedTime || item?.dateFrom,
              ).fromNow() === 'a few seconds ago' ||
              moment(
                item?.estimatedTime || item?.dateFrom,
              ).fromNow() === 'in a few seconds'
            ? 'in a minute'
            : moment(item?.estimatedTime || item?.dateFrom).fromNow()} */}
        {getTimeString()}
        </Text>
      </View>
    )}
    <View
      style={{
        marginTop: perfectSize(10),
        width: perfectSize(120),
        height: perfectSize(81),
        borderRadius: perfectSize(10),
        backgroundColor: '#FFF',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftColor: Colors.SECONDARY_COLOR,
        borderRightColor: Colors.SECONDARY_COLOR,
        borderBottomColor: Colors.SECONDARY_COLOR,
      }}>
      <View
        style={{
          height: perfectSize(8),
          borderTopLeftRadius: perfectSize(10),
          borderTopRightRadius: perfectSize(10),
          backgroundColor: Colors.PRIMARY_COLOR,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: Colors.SECONDARY_COLOR,
            fontFamily: Fonts.Poppins_MediumItalic,
            fontSize:Platform.OS === 'windows' ?  perfectSize(25) : perfectSize(35),
            alignSelf: 'center',
          }}
          adjustsFontSizeToFit
          numberOfLines={1}>
          #{item?.token}
        </Text>
      </View>
    </View>
  </View>
  );
};

export default React.memo(NextListBottomComponent);
