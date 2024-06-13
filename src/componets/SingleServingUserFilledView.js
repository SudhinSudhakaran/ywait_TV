import {StyleSheet, Text, View, Image, FlatList, Platform} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Globals} from '../constants';
import {Colors, Fonts, Strings} from '../constants';
import moment from 'moment';
import Utils from '../helpers/utils/Utils';
import Tts from 'react-native-tts';
import TokenComponent from './TokenComponent';
import NoAppointmentScheduleText from './NoAppointmentScheduleText';
import TopArrivingList from './TopArrivingList';
import BottomArrivingList from './BottomArrivingList';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const SingleServingUserFilledView = ({
  item,
  index,
  leftArrivedCustomerListTop,
  leftArrivedCustomerListBottom,
}) => {
  const {t, i18n} = useTranslation();
  const isFocused = useIsFocused();
  const servingFlatListRef = useRef();
  const topFlatListRef = useRef();
  const bottomFlatListRef = useRef();
  const {isRTL} = useSelector(state => state.AlignmentState);

    // console.log('leftArrivedCustomerListTop',item?.leftServingUserDetails.name, leftArrivedCustomerListTop);
  let newItem = {
    consultantDetails: item?.leftServingUserDetails,
    arrivedList: item.leftArrivedList || [],
    name: item?.leftServingUserDetails.name || '',
    roomNumber: item?.leftServingUserDetails.roomNumber || '',
    servingList: item?.leftServingList || [],
    type: item?.leftServingUserDetails.type || '',
  };
  return (
    <View
      key={`TvApp_single-item-${index}`}
      style={{
        width: perfectSize(2000),
        marginTop: Platform.OS === 'windows' ? perfectSize(-150) : undefined,
      }}>
      <>
        <View style={styles.servingListView}>
          <TokenComponent item={newItem} index={index} />
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            width: '100%',
            height: '50%',

            marginTop: perfectSize(20),
          }}>
          {/* Next section */}
          {leftArrivedCustomerListTop?.length > 0 ? (
            <Text
              style={[
                styles.nextTitle,
                {
                  color: Colors.PRIMARY_COLOR,
                  marginLeft: perfectSize(125),
                  textAlign: isRTL ? 'right' : 'left',
                },
              ]}>
              {t(Translations.NEXT)}
            </Text>
          ) : (
            <NoAppointmentScheduleText splitScreen={false} bottom={'38%'} />
          )}

          {/* Top list */}
          <TopArrivingList
            topFlatListRef={topFlatListRef}
            item={leftArrivedCustomerListTop}
            type={item?.type}
          />
          {/* Bottom list */}
          <BottomArrivingList
            bottomFlatListRef={bottomFlatListRef}
            item={leftArrivedCustomerListBottom}
            type={item?.type}
            isFormSplit={true}
          />
        </View>
      </>
    </View>
  );
};

export default SingleServingUserFilledView;

const styles = StyleSheet.create({
  servingListView: {
    marginTop: perfectSize(20),
    width: perfectSize(1344),
    height: perfectSize(444),
    alignSelf: 'center',
    //Shadow props
    backgroundColor: '#F2F2F2',

    // shadowColor: '#00000029',
    // shadowOffset: {width: 0, height: perfectSize(1)},
    // shadowOpacity: 0.8,
    // shadowRadius: perfectSize(6),
    // elevation: 6,
  },

  nextTitle: {
    fontFamily: Fonts.Poppins_SemiBoldItalic,
    fontSize: perfectSize(32),
  },
});
