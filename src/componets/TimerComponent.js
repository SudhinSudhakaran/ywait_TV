import {View, Text, Image, FlatList, Platform , StyleSheet} from 'react-native';
import React,{useState,useEffect} from 'react';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import {Colors, Fonts, Images,Globals} from '../constants';
import NoAppointmentScheduleText from './NoAppointmentScheduleText';
import moment from 'moment';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const TimerComponent = () => {

  const [time, setTime] = useState(
    moment()
      .utcOffset(Globals.BUSINESS_DETAILS?.timeZone?.offset || '+5:30')
      .format('MMMM Do YYYY, hh:mm:ss A'),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        moment()
          .utcOffset(Globals.BUSINESS_DETAILS?.timeZone?.offset || '+5:30')
          .format('MMMM Do YYYY, hh:mm:ss A'),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <View>
      <Text style={styles.topBarTime}>{time}</Text>
    </View>
  );
};

export default TimerComponent;

const styles = StyleSheet.create({
  topBarTime: {
    color: Colors.WHITE_COLOR,
    marginLeft: perfectSize(24),
    fontFamily: Fonts.Poppins_Medium,
    fontSize: perfectSize(20),
    marginTop:'3%'
  },
});
