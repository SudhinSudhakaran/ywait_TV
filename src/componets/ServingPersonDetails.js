/* eslint-disable no-unreachable */
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import React, { useMemo } from 'react';
import { Images, Fonts } from '../constants';
import { PixelRatio, Dimensions } from 'react-native';
import { create } from 'react-native-pixel-perfect';
import { Strings, Globals, Colors } from '../constants';
import Utils from '../helpers/utils/Utils';
import ConsultantImage from './ConsultantImage';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BUILD_SOURCE } from '../enums/Enums';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
const ServingPersonDetails = ({ item,index,type }) => {
  const { t, i18n } = useTranslation();
    // console.log('ServingPersonDetails ====', item);
  const { isRTL } = useSelector(state => state?.AlignmentState);
  var imageUri = '';
  if (type === 'ROOM') {
    const words = item?.display_name?.split(' ');

    imageUri =  Utils.getDefaultAvatarImageURL(words[0] + '+' + words[1]);
  } else {
    imageUri = Utils.isValidUrl(item?.image)
      ? item?.image
      : Utils.getDefaultAvatarImageURL(item?.firstName + '+' + item?.lastName);
  }

  return (
    <View
      style={{
        width: '40%',
        // justifyContent: 'center',
      }}>
      <Text
        style={[
          styles.servingPersonTitle,
          {
            marginLeft: perfectSize(90),
            marginTop:
              Platform.OS === 'windows' ? perfectSize(90) : perfectSize(60),
            textAlign: isRTL ? 'right' : 'left',
          },
        ]}
        numberOfLines={1}>
        {t(
         type === 'ROOM'
            ? Translations.SERVING_ROOM
            : Translations.SERVING_PERSON,
        )}
      </Text>
      <Text
        style={[
          styles.servingPersonNameTitle,
          {
            color: Colors.PRIMARY_COLOR,
            marginLeft: perfectSize(90),
            marginTop: perfectSize(20),
            textAlign: isRTL ? 'right' : 'left',
          },
        ]}
        numberOfLines={1}>
        {item?.name}
      </Text>
      {Globals.CUSTOM_BUILD_SOURCE === BUILD_SOURCE.YWAIT ? (
        <Text
          style={[
            styles.servingDepartmentNameTitle,
            {
              color: Colors.SECONDARY_COLOR,
              marginLeft: perfectSize(90),
              marginTop: perfectSize(6),
              // textTransform: 'capitalize',
              textAlign: isRTL ? 'right' : 'left',
            },
          ]}
          numberOfLines={1}>
          {item?.designation_id?.designation?.toLowerCase()}
        </Text>
      ) : type === 'ROOM' ? null : (
        <Text
          style={[
            styles.servingDepartmentNameTitle,
            {
              color: Colors.SECONDARY_COLOR,
              marginLeft: perfectSize(90),
              marginTop: perfectSize(6),
              // textTransform: 'capitalize',
              textAlign: isRTL ? 'right' : 'left',
            },
          ]}
          numberOfLines={1}>
          {/* {item?.designation_id?.designation.toLowerCase()} */}
          Room Number : {item?.roomNumber}
        </Text>
      )}

      {/* <ConsultantImage uri={imageUri} isSplitScreen={false} /> */}

      <View
        style={{
          height: perfectSize(141),
          alignItems: isRTL ? 'flex-end' : 'flex-start',
        }}>
        <Image
          style={{
            marginLeft:  perfectSize(90),
            marginTop:  perfectSize(33),
            marginBottom: perfectSize(47),
            width: perfectSize(141),
            height: perfectSize(141),
            borderRadius: perfectSize(141) / 2,
            overflow: 'hidden',
            borderWidth: perfectSize(3),
            borderColor: Colors.SECONDARY_COLOR,
            resizeMode: 'cover',
            
          }}
          source={{
            uri: imageUri,
          }}
        />
      </View>
    </View>
  );
};
export default ServingPersonDetails;

const styles = StyleSheet.create({
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
