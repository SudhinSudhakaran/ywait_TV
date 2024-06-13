import {StyleSheet, Text, View, Image, FlatList, Platform} from 'react-native';
import React, {useRef, useMemo} from 'react';
import {Images, Fonts, Globals} from '../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Strings, Colors} from '../constants';
import Utils from '../helpers/utils/Utils';
import moment from 'moment';
import NoAppointmentScheduleText from './NoAppointmentScheduleText';
import EmptyTokenList from './EmptyTokenList';
import TokenNumberCell from './TokenNumberCell';
import ItemSeparator from './ItemSeparator';
import LineSeparator from './LineSeparator';
import ConsultantImage from './ConsultantImage';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {BUILD_SOURCE} from '../enums/Enums';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const SplitTokenStatusItem = props => {
  const {t, i18n} = useTranslation();
  const {isRTL} = useSelector(state => state.AlignmentState);
// console.log('props.servingUserDetail',props.item)
  var imageUri = '';
  if (props.item?.type === 'ROOM') {
    const words = props.item.name.split(' ');

    imageUri = Utils.isValidUrl(props.item?.image)
      ? props.item?.image
      : Utils.getDefaultAvatarImageURL(words[0] + '+' + words[1]);
  } else {
    imageUri = Utils.isValidUrl(props.item?.image)
      ? props.item?.image
      : Utils.getDefaultAvatarImageURL(
          props.item?.firstName + '+' + props.item?.lastName,
        );
  }
  return (
    <View
      style={[
        styles.servingShadowView,
        {flexDirection: isRTL ? 'row-reverse' : 'row'},
      ]}>
      <View
        style={{
          //flex: 1,
          //  justifyContent: 'center',
          width: '40%',
          // backgroundColor:'red'
          marginRight: isRTL ? perfectSize(50) : undefined,
        }}>
        <Text
          style={[
            styles.servingPersonTitle,
            {
              marginLeft: props?.isFromSplitScreen
                ? perfectSize(35)
                : perfectSize(65),
              marginTop: perfectSize(10),
              textAlign: isRTL ? 'right' : 'left',
            },
          ]}
          numberOfLines={1}>
          {t(
            props?.type === 'ROOM'
              ? Translations.SERVING_ROOM
              : Translations.SERVING_PERSON,
          )}
        </Text>
        <Text
          style={[
            styles.servingPersonNameTitle,
            {
              color: Colors.PRIMARY_COLOR,
              marginLeft: props?.isFromSplitScreen
                ? perfectSize(35)
                : perfectSize(65),
              marginTop: perfectSize(5),
              textAlign: isRTL ? 'right' : 'left',
            },
          ]}
          // adjustsFontSizeToFit
          numberOfLines={1}>
          {props?.item?.name}
        </Text>
        {Globals.CUSTOM_BUILD_SOURCE === BUILD_SOURCE.YWAIT ? (
          <Text
            style={[
              styles.servingDepartmentNameTitle,
              {
                color: Colors.SECONDARY_COLOR,
                marginLeft: props?.isFromSplitScreen
                  ? perfectSize(35)
                  : perfectSize(65),
                marginTop: perfectSize(6),
                // textTransform: 'capitalize',
                textAlign: isRTL ? 'right' : 'left',
              },
            ]}
            numberOfLines={1}>
            {props?.item?.designation_id?.designation?.toLowerCase()}
          </Text>
        ) : props?.type === 'ROOM' ? null : (
          <Text
            style={[
              styles.servingDepartmentNameTitle,
              {
                color: Colors.SECONDARY_COLOR,
                marginLeft: props?.isFromSplitScreen
                  ? perfectSize(35)
                  : perfectSize(65),
                marginTop: perfectSize(6),
                // textTransform: 'capitalize',
                textAlign: isRTL ? 'right' : 'left',
              },
            ]}
            numberOfLines={1}>
            {/* {props.item?.designation_id?.designation.toLowerCase()} */}
            Room Number : {props?.item?.roomNumber}
          </Text>
        )}

        {/* <ConsultantImage
          uri={imageUri}
          isSplitScreen={true}
          style={{
            marginLeft: props?.isFromSplitScreen
              ? perfectSize(35)
              : perfectSize(0),
          }}
        /> */}

        <View
          style={{
            height: perfectSize(141),
            alignItems: isRTL ? 'flex-end' : 'flex-start',
          }}>
          <Image
            style={{
              marginTop: perfectSize(23),
              marginBottom: perfectSize(47),
              width: perfectSize(141),
              height: perfectSize(141),
              borderRadius: perfectSize(141) / 2,
              overflow: 'hidden',
              borderWidth: perfectSize(3),
              borderColor: Colors.SECONDARY_COLOR,
              resizeMode: 'cover',
              marginLeft: perfectSize(35),
            }}
            source={{
              uri: imageUri,
            }}
          />
        </View>
      </View>

      <LineSeparator style={{height: '100%'}} />
      <View
        style={{
          flex: 1,
          // justifyContent: 'center',
        }}>
        <Text
          style={[
            styles.servingPersonTitle,
            {
              marginLeft: props?.isFromSplitScreen
                ? perfectSize(35)
                : perfectSize(100),
              marginTop: perfectSize(10),
              textAlign: isRTL ? 'right' : 'left',
              marginRight: perfectSize(35),
            },
          ]}
          numberOfLines={1}>
          {t(Translations.SERVING_NOW)}
        </Text>
        <Text
          style={[
            styles.servingPersonNameTitle,
            {
              color: Colors.PRIMARY_COLOR,
              marginLeft: props?.isFromSplitScreen
                ? perfectSize(35)
                : perfectSize(100),
              marginTop: perfectSize(0),
              textAlign: isRTL ? 'right' : 'left',
              marginRight: perfectSize(35),
            },
          ]}
          numberOfLines={1}>
          {t(Translations.TOKEN_NUMBER)}
        </Text>

        {props.servingList?.length === 1 ? (
          <TokenNumberCell
            tokenDetails={props?.servingList[0]}
            index={props?.index}
            containerStyle={{
              marginLeft: perfectSize(100),
              marginTop: perfectSize(20),
              marginBottom: perfectSize(44),
              // width: perfectSize(350),
              // height: perfectSize(201),
              width: responsiveWidth(18),
              height: responsiveHeight(18),
              borderRadius: perfectSize(10),
              backgroundColor: '#FFF',
            }}
            textStyle={{
              // fontSize:
              //   Platform.OS === 'windows' ? perfectSize(80) : perfectSize(70),
              fontSize:
                Platform.OS === 'windows'
                  ? responsiveFontSize(3.5)
                  : perfectSize(70),
            }}
            fontSize={Platform.OS === 'windows' ? 48 : perfectSize(70)}
          />
        ) : props?.servingList?.length === 2 ? (
          <View
            style={{
              height: perfectSize(295),
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'center',
            }}>
            <TokenNumberCell
              tokenDetails={props?.servingList[0]}
              index={props?.index}
              containerStyle={{
                marginLeft: perfectSize(0),
                marginTop: perfectSize(20),
                marginBottom: perfectSize(44),
                // width: perfectSize(199),
                // height: perfectSize(131),
                width: responsiveWidth(10.5),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize:
                //   Platform.OS === 'windows' ?
                //    perfectSize(45) :
                //    perfectSize(70),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
            />
            <ItemSeparator />
            <TokenNumberCell
              tokenDetails={props?.servingList[1]}
              index={props?.index}
              containerStyle={{
                marginLeft: perfectSize(0),
                marginTop: perfectSize(20),
                marginBottom: perfectSize(44),
                // width: perfectSize(199),
                // height: perfectSize(131),
                width: responsiveWidth(10.5),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize:
                //   Platform.OS === 'windows' ?
                //    perfectSize(43)
                //    : perfectSize(70),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
            />
          </View>
        ) : props.servingList?.length === 3 ? (
          <View
            style={{
              height: perfectSize(295),
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'center',
              }}>
              <TokenNumberCell
                tokenDetails={props?.servingList[0]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(20),
                  // width: perfectSize(169),
                  // height: perfectSize(100),
                  width: responsiveWidth(9.5),
                  height: responsiveHeight(9),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(
                  //   Platform.OS === 'windows' ? perfectSize(50) : perfectSize(70),
                  // ),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.8)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
              <TokenNumberCell
                tokenDetails={props?.servingList[1]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(20),
                  // width: perfectSize(169),
                  // height: perfectSize(100),
                  width: responsiveWidth(9.5),
                  height: responsiveHeight(9),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(
                  //   Platform.OS === 'windows' ? perfectSize(50) : perfectSize(70),
                  // ),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.8)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TokenNumberCell
                tokenDetails={props?.servingList[2]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(20),
                  // width: perfectSize(169),
                  // height: perfectSize(100),
                  width: responsiveWidth(9.5),
                  height: responsiveHeight(9),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(
                  //   Platform.OS === 'windows' ? perfectSize(50) : perfectSize(70),
                  // ),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.8)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
            </View>
          </View>
        ) : props.servingList?.length === 4 ? (
          <View
            style={{
              height: perfectSize(295),
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'center',
              }}>
              <TokenNumberCell
                tokenDetails={props?.servingList[0]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(20),
                  //     width: perfectSize(169),
                  // height: perfectSize(100),
                  width: responsiveWidth(9.5),
                  height: responsiveHeight(9),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#fff',
                }}
                textStyle={{
                  // fontSize: perfectSize(
                  //   Platform.OS === 'windows' ? 50 : 70,
                  // ),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.8)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
              <TokenNumberCell
                tokenDetails={props?.servingList[1]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(20),
                  //     width: perfectSize(169),
                  // height: perfectSize(100),
                  width: responsiveWidth(9.5),
                  height: responsiveHeight(9),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(
                  //   Platform.OS === 'windows' ? 50 : 70,
                  // ),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.8)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'center',
              }}>
              <TokenNumberCell
                tokenDetails={props?.servingList[2]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(20),
                  //     width: perfectSize(169),
                  // height: perfectSize(100),
                  width: responsiveWidth(9.5),
                  height: responsiveHeight(9),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(
                  //   Platform.OS === 'windows' ? 50 : 70,
                  // ),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.8)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
              <TokenNumberCell
                tokenDetails={props?.servingList[3]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(20),
                  //     width: perfectSize(169),
                  // height: perfectSize(100),
                  width: responsiveWidth(9.5),
                  height: responsiveHeight(9),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(
                  //   Platform.OS === 'windows' ? 50 : 70,
                  // ),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.8)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
            </View>
          </View>
        ) : props.servingList?.length === 5 ? (
          <View
            style={{
              height: perfectSize(295),
              justifyContent: 'center',
              marginRight: perfectSize(25),
            }}>
            <View
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'center',
              }}>
              <TokenNumberCell
                tokenDetails={props?.servingList[0]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(20),
                  // width: perfectSize(159),
                  // height: perfectSize(90),
                  width: responsiveWidth(8),
                  height: responsiveHeight(8),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#fff',
                }}
                textStyle={{
                  // fontSize: perfectSize(Platform.OS === 'windows' ?
                  //  32 : 70),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.5)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
              <TokenNumberCell
                tokenDetails={props?.servingList[1]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(10),
                  // width: perfectSize(159),
                  // height: perfectSize(90),
                  width: responsiveWidth(8),
                  height: responsiveHeight(8),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(Platform.OS === 'windows' ?
                  //  32 : 70),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.5)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
              <TokenNumberCell
                tokenDetails={props?.servingList[2]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(10),
                  // width: perfectSize(159),
                  // height: perfectSize(90),
                  width: responsiveWidth(8),
                  height: responsiveHeight(8),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(Platform.OS === 'windows' ?
                  //  32 : 70),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.5)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'center',
              }}>
              <TokenNumberCell
                tokenDetails={props?.servingList[3]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(10),
                  // width: perfectSize(159),
                  // height: perfectSize(90),
                  width: responsiveWidth(8),
                  height: responsiveHeight(8),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(Platform.OS === 'windows' ?
                  //  32 : 70),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.5)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
              <TokenNumberCell
                tokenDetails={props?.servingList[4]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(10),
                  // width: perfectSize(159),
                  // height: perfectSize(90),
                  width: responsiveWidth(8),
                  height: responsiveHeight(8),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(Platform.OS === 'windows' ?
                  //  32 : 70),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.5)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
            </View>
          </View>
        ) : props.servingList?.length > 5 ? (
          <View
            style={{
              height: perfectSize(295),
              justifyContent: 'center',
              marginRight: perfectSize(15),
            }}>
            <View
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'center',
              }}>
              <TokenNumberCell
                tokenDetails={props?.servingList[0]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(10),
                  // width: perfectSize(159),
                  // height: perfectSize(90),
                  width: responsiveWidth(8),
                  height: responsiveHeight(8),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#fff',
                }}
                textStyle={{
                  // fontSize: perfectSize(Platform.OS === 'windows' ?
                  //  32 : 70),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.5)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
              <TokenNumberCell
                tokenDetails={props?.servingList[1]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(10),
                  // width: perfectSize(159),
                  // height: perfectSize(90),
                  width: responsiveWidth(8),
                  height: responsiveHeight(8),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(Platform.OS === 'windows' ?
                  //  32 : 70),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.5)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
              <TokenNumberCell
                tokenDetails={props?.servingList[2]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(10),
                  // width: perfectSize(159),
                  // height: perfectSize(90),
                  width: responsiveWidth(8),
                  height: responsiveHeight(8),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(Platform.OS === 'windows' ?
                  //  32 : 70),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.5)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'center',
              }}>
              <TokenNumberCell
                tokenDetails={props?.servingList[3]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(10),
                  // width: perfectSize(159),
                  // height: perfectSize(90),
                  width: responsiveWidth(8),
                  height: responsiveHeight(8),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(Platform.OS === 'windows' ?
                  //  32 : 70),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.5)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
              <TokenNumberCell
                tokenDetails={props?.servingList[4]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(10),
                  // width: perfectSize(159),
                  // height: perfectSize(90),
                  width: responsiveWidth(8),
                  height: responsiveHeight(8),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(Platform.OS === 'windows' ?
                  //  32 : 70),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.5)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
              <TokenNumberCell
                tokenDetails={props?.servingList[5]}
                index={props?.index}
                containerStyle={{
                  marginTop: perfectSize(20),
                  marginLeft: perfectSize(10),
                  // width: perfectSize(159),
                  // height: perfectSize(90),
                  width: responsiveWidth(8),
                  height: responsiveHeight(8),
                  borderRadius: perfectSize(10),
                  backgroundColor: '#FFF',
                }}
                textStyle={{
                  // fontSize: perfectSize(Platform.OS === 'windows' ?
                  // 32 : 70),
                  fontSize:
                    Platform.OS === 'windows'
                      ? responsiveFontSize(1.5)
                      : perfectSize(70),
                }}
                fontSize={Platform.OS === 'windows' ? 20 : perfectSize(70)}
              />
            </View>
          </View>
        ) : (
          <EmptyTokenList isSplitScreen={true} />
        )}
      </View>
    </View>
  );
};

export default SplitTokenStatusItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },

  servingListView: {
    marginTop: perfectSize(30),
    width: perfectSize(960),
    height: perfectSize(380),
    alignSelf: 'center',
  },

  servingShadowView: {
    width: perfectSize(960),
    height: perfectSize(380),
  },
  servingPersonTitle: {
    color: '#222222',
    fontFamily: Fonts.Poppins_Medium,
    fontSize: perfectSize(20),
    textAlign: 'left',
  },
  servingPersonNameTitle: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: perfectSize(30),
    textAlign: 'left',
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
