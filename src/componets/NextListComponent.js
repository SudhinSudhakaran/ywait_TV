import {View, Text, Image, FlatList, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import {Colors, Fonts, Globals, Images} from '../constants';
import NoAppointmentScheduleText from './NoAppointmentScheduleText';
import moment from 'moment';
import {useSelector} from 'react-redux';
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

const NextListComponent = ({item, index, type, isSplitScreen}) => {
  // console.log('NextListComponent============================',item);
  const {isRTL} = useSelector(state => state.AlignmentState);
  const [showTime, setShowTime] = useState(type !== 'ROOM');

  const fromTime = moment(item?.dateFrom);
  const currentTime = moment();

  const tokenFontSize = a => {
    const fontScale = PixelRatio.getFontScale();
    return a * fontScale;
  };
  const getTimeString = () => {
  
    let timeOver = false;
    const now = moment().toISOString();
    const itemTime = moment(item?.estimatedTime || item?.dateTo).toISOString();
    if (itemTime < now) {
      // console.log(`The time ${moment(item?.dateTo).fromNow()} is in the past`);
      timeOver = true;
    } else {
      // console.log(
      //   `The time ${moment(item?.dateTo).fromNow()} is in the future`,
      // );
    }
    const timeFromNow = moment(item?.estimatedTime || item?.dateTo).fromNow();

    if (Globals.PRACTO_BUILD) {
      return timeOver === true || timeFromNow === 'a few seconds ago'
        ? 'in few minutes'
        : timeFromNow;
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
        width: perfectSize(210),
      }}>
      <View
        style={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}>
        {item?.type === 'ROOM' ? null : (
          <>
            <View
              style={{
                // flex:1,
                backgroundColor: '#1D1D1D',
                width: perfectSize(50),
                height: perfectSize(30),
                marginLeft: isRTL
                  ? isSplitScreen === true
                    ? perfectSize(0)
                    : perfectSize(0)
                  : perfectSize(0),
                marginRight: isRTL
                  ? isSplitScreen === true
                    ? perfectSize(160)
                    : perfectSize(160)
                  : perfectSize(0),
                textAlign: isRTL ? 'right' : 'left',
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: Fonts.Poppins_SemiBoldItalic,
                  fontSize: perfectSize(18),
                  alignSelf: 'center',
                }}>
                #{(index + 1).toString()}
              </Text>
            </View>

            <Text
              style={{
                color: '#1D1D1D',
                fontFamily: Fonts.Poppins_Italic,
                fontSize: perfectSize(18),
                position: 'absolute',
                marginRight: isRTL
                  ? isSplitScreen === true
                    ? perfectSize(60)
                    : perfectSize(60)
                  : perfectSize(0),
                textAlign: isRTL ? 'right' : 'left',
                marginLeft: isRTL
                  ? isSplitScreen === true
                    ? perfectSize(0)
                    : perfectSize(0)
                  : isSplitScreen === true
                  ? perfectSize(60)
                  : perfectSize(60),
                width: perfectSize(200),
              }}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {getTimeString()}
            </Text>
          </>
        )}
      </View>
      <View
        style={{
          //  position:'absolute',
          marginTop: perfectSize(20),
          width: perfectSize(190),
          height: perfectSize(100),
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
              fontSize:
                Platform.OS === 'windows' ? perfectSize(40) : perfectSize(53),
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

export default NextListComponent;
