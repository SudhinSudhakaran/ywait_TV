import {View, Text, Image, FlatList, Platform, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import {Colors, Fonts, Images} from '../../constants';
import NoAppointmentScheduleText from '../NoAppointmentScheduleText';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import SplitTokenStatusItem from '../SplitTokenStatusItem';
import TopArrivingList from '../TopArrivingList';
import BottomArrivingList from '../BottomArrivingList';
import {useSelector} from 'react-redux';
import Translations from '../../constants/Translations';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const SplitScreenItem = ({
  servingList,
  topList,
  bottomList,
  type,
  servingUserDetails,
  index 
}) => {
  const servingListRef = useRef();
  const {t, i18n} = useTranslation();
  const {isRTL} = useSelector(state => state.AlignmentState);

  const topFlatListRef = useRef();
  const bottomFlatListRef = useRef();

  //console.log('splitScreen item servingUserDetails', servingUserDetails);
  return (
    <View
      style={{
        // flex: 1,
        borderWidth: 0,
        // backgroundColor:'blue'
      }}>
      <>
        <View>
          <SplitTokenStatusItem
            item={servingUserDetails}
            isFromSplitScreen={true}
            type={type}
            servingList={servingList}
            index={index}
          />
        </View>
        <View
          style={{
            flex: 1,
            width: perfectSize(960),
            alignItems: isRTL ? 'flex-end' : 'flex-start',
          }}>
          {/* Next section */}
          {topList?.length > 0 ? (
            <Text
              style={[
                styles.nextTitle,
                {
                  color: Colors.PRIMARY_COLOR,
                  marginLeft: isRTL ? undefined : perfectSize(65),
                  marginTop: '2%',
                  textAlign: isRTL ? 'right' : 'left',
                  marginRight: isRTL ? perfectSize(65) : perfectSize(65),
                },
              ]}>
              {t(Translations.NEXT)}
            </Text>
          ) : (
            <NoAppointmentScheduleText
              splitScreen={true}
              bottom={Platform.OS === 'windows' ? '50%' : '20%'}
            />
          )}
          {/* Top list */}

          <View
            style={{
              marginRight: isRTL ? perfectSize(0) : '4%',
              overflow: 'hidden',
            }}>
            <TopArrivingList
              topFlatListRef={topFlatListRef}
              item={topList}
              isSplitScreen={true}
              type={type}
            />
            {/* Bottom list */}
            <BottomArrivingList
              bottomFlatListRef={bottomFlatListRef}
              item={bottomList}
              isSplitScreen={true}
              type={type}
            />
          </View>
        </View>
      </>
    </View>
  );
};

export default SplitScreenItem;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
    // backgroundColor:'green',
    height: perfectSize(380),
  },

  servingListView: {
    marginTop: perfectSize(0),
    width: perfectSize(960),
    height: perfectSize(380),
    alignSelf: 'center',
  },

  servingShadowView: {
    width: perfectSize(960),
    height: perfectSize(380),
    flexDirection: 'row',

    // //Shadow props
    // backgroundColor: '#F2F2F2',
    // shadowColor: '#00000029',
    // shadowOffset: { width: 0, height: perfectSize(1) },
    // shadowOpacity: 0.8,
    // shadowRadius: perfectSize(6),
    // elevation: 6,
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
  nextTitle: {
    fontFamily: Fonts.Poppins_SemiBoldItalic,
    fontSize: perfectSize(32),
  },
});

{
  /* <SplitScreenItem
        servingList={item?.rightServingUserDetails}
        topList={item?.rightArrivedCustomerListTop}
        bottomList={item?.rightArrivedCustomerListBottom}
      /> */
}
