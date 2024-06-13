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
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {mainSingleCarouselRef} from '../screens/newCarouselScreen/NewSingleCarouselScreen';
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
const SingleTokenStatusItem = ({item, index, length}) => {
  const {t} = useTranslation();
  const {isRTL} = useSelector(state => state.AlignmentState);

  const topFlatListRef = useRef();
  const bottomFlatListRef = useRef();
  const focused = useIsFocused();
  const {showLiveTokensEnabled} = useSelector(
    state => state.ShowLiveTokenState,
  );

  return (
    <View
      key={`TvApp_single-item-${index}`}
      style={{
        width: perfectSize(2000),
  
        paddingRight:
          isRTL === true && showLiveTokensEnabled === true
            ? responsiveWidth(20)
            : undefined,
      }}>
      <>
        <View style={styles.servingListView}>
          <TokenComponent item={item} index={index} type={item.type} />
        </View>
        <View
          style={{
            width: '100%',
            height: '50%',
            marginTop: perfectSize(20),
          marginRight: isRTL === true ? responsiveWidth(5) : undefined,

          }}>
          {/* Next section */}
          {(item?.arrivedList?.length ?? 0) > 0 ? (
            <Text
              style={[
                styles.nextTitle,
                {
                  color: Colors.PRIMARY_COLOR,
                  marginLeft: isRTL ? undefined : perfectSize(125),
                  marginRight: isRTL ? perfectSize(150) : undefined,
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
            item={
              (item?.arrivedList?.length ?? 0) > 0
                ? showLiveTokensEnabled === true
                  ? item?.arrivedList.slice(0, 7)
                  : item?.arrivedList.slice(0, 8)
                : []
            }
            type={item?.type}
            isFormSplit={false}
          />
          {/* Bottom list */}
          <BottomArrivingList
            bottomFlatListRef={bottomFlatListRef}
            item={
              (item?.arrivedList?.length ?? 0) > 0
                ? showLiveTokensEnabled === true
                  ? item?.arrivedList.slice(7, 100)
                  : item?.arrivedList.slice(8, 100)
                : []
            }
            type={item?.type}
            isFormSplit={false}
          />
        </View>
      </>
    </View>
  );
};

export default SingleTokenStatusItem;

const styles = StyleSheet.create({
  servingListView: {
    marginTop: perfectSize(0),
    width: perfectSize(1344),
    height: perfectSize(444),
    alignSelf: 'center',
    backgroundColor: '#F2F2F2',
  },

  nextTitle: {
    fontFamily: Fonts.Poppins_SemiBoldItalic,
    fontSize: perfectSize(32),
  },
});
