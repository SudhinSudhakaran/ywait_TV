import {StyleSheet, Text, View, Image, Platform, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Images, Fonts} from '../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {Strings, Colors} from '../constants';
import Utils from '../helpers/utils/Utils';
import TokenNumberCell from './TokenNumberCell';
import moment from 'moment';
import EmptyTokenList from './EmptyTokenList';
import ItemSeparator from './ItemSeparator';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import fontSize from '../helpers/fontSize';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const ServingTokenList = ({item, index,type}) => {
  const {t, i18n} = useTranslation();
  const {isRTL} = useSelector(state => state.AlignmentState);
  // console.log('ServingTokenList |||||||||||||||||', item);
  const {showLiveTokensEnabled} = useSelector(
    state => state.ShowLiveTokenState,
  );
  return (
    <View
      style={{
        width: '60%',
        // justifyContent: 'center',
      }}>
      <Text
        style={[
          styles.servingPersonTitle,
          {
            marginLeft: isRTL ? undefined : perfectSize(90),
            marginRight: isRTL ? perfectSize(90) : undefined,
            marginTop:
              Platform.OS === 'windows' ? perfectSize(90) : perfectSize(60),
            textAlign: isRTL ? 'right' : 'left',
          },
        ]}
        numberOfLines={1}>
        {t(Translations.SERVING_NOW)}
      </Text>
      {item?.servingList?.length > 0 ? (
        <Text
          style={[
            styles.servingPersonNameTitle,
            {
              color: Colors.PRIMARY_COLOR,
              marginLeft: isRTL ? undefined : perfectSize(90),
              marginRight: isRTL ? perfectSize(90) : undefined,
              marginTop: perfectSize(20),
              textAlign: isRTL ? 'right' : 'left',
            },
          ]}
          numberOfLines={1}>
          {t(Translations.TOKEN_NUMBER)}
        </Text>
      ) : null}

      {item?.servingList?.length === 1 ? (
        <TokenNumberCell
          tokenDetails={item?.servingList[0]}
          type={type}
          index={index}
          containerStyle={{
            backgroundColor: '#FFF',
            marginLeft: perfectSize(180),
            marginBottom: perfectSize(44),
            // width: perfectSize(350),
            // height: perfectSize(201),
            width: responsiveWidth(18),
            height: responsiveHeight(18),
            borderRadius: perfectSize(10),
          }}
          textStyle={{
            // fontSize: perfectSize(
            //   Platform.OS === 'windows' ?
            //     80 :
            //     70,
            // ),
            fontSize:
              Platform.OS === 'windows'
                ? responsiveFontSize(3.5)
                : perfectSize(70),
          }}
          fontSize={Platform.OS === 'windows' ? 48 : perfectSize(70)}
        />
      ) : item?.servingList?.length === 2 ? (
        <View
          style={{
            height: perfectSize(295),
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'center',
          }}>
          <TokenNumberCell
            tokenDetails={item?.servingList[0]}
            type={type}
            index={index}
            length={1}
            containerStyle={{
              marginLeft: perfectSize(0),
              marginTop: perfectSize(50),
              marginBottom: perfectSize(44),
              // width: perfectSize(265),
              // height: perfectSize(151),
              width: responsiveWidth(13),
              height: responsiveHeight(13),
              borderRadius: perfectSize(10),
              backgroundColor: '#FFF',
            }}
            textStyle={{
              // fontSize:
              //   Platform.OS === 'windows' ?
              //     perfectSize(60) :
              //     perfectSize(70),
              fontSize:
                Platform.OS === 'windows'
                  ? responsiveFontSize(2.5)
                  : perfectSize(70),
            }}
            fontSize={Platform.OS === 'windows' ? 35 : perfectSize(70)}
          />
          <ItemSeparator />
          <TokenNumberCell
            tokenDetails={item?.servingList[1]}
            type={type}
            index={index}
            length={1}
            containerStyle={{
              marginLeft: perfectSize(0),
              marginTop: perfectSize(50),
              marginBottom: perfectSize(44),
              // width: perfectSize(265),
              // height: perfectSize(151),
              width: responsiveWidth(13),
              height: responsiveHeight(13),
              borderRadius: perfectSize(10),
              backgroundColor: '#FFF',
            }}
            textStyle={{
              // fontSize:
              //   Platform.OS === 'windows' ?
              //     perfectSize(60) :
              //     perfectSize(70),
              fontSize:
                Platform.OS === 'windows'
                  ? responsiveFontSize(2.5)
                  : perfectSize(70),
            }}
            fontSize={Platform.OS === 'windows' ? 35 : perfectSize(70)}
          />
        </View>
      ) : item?.servingList?.length === 3 ? (
        <View
          style={{
            height: perfectSize(295),
            // justifyContent: 'center',
            // backgroundColor: 'red',
            // alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'center',
              alignItems: 'center',

              marginTop: perfectSize(30),
            }}>
            <TokenNumberCell
              tokenDetails={item?.servingList[0]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),
                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(13),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.8)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 32 : perfectSize(70)}
            />
            <ItemSeparator />
            <TokenNumberCell
              tokenDetails={item?.servingList[1]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(13),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.8)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 32 : perfectSize(70)}
            />
          </View>

          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: perfectSize(30),
            }}>
            <TokenNumberCell
              tokenDetails={item?.servingList[2]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(13),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.8)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 32 : perfectSize(70)}
            />
          </View>
        </View>
      ) : item?.servingList?.length === 4 ? (
        <View
          style={{
            height: perfectSize(295),
            // justifyContent: 'center',
            // backgroundColor: 'red',
            // alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'center',
              alignItems: 'center',

              marginTop: perfectSize(30),
            }}>
            <TokenNumberCell
              tokenDetails={item?.servingList[0]}
              index={index}
              type={type}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),
                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 32 : perfectSize(70)}
            />
            <ItemSeparator />
            <TokenNumberCell
              tokenDetails={item?.servingList[1]}
              index={index}
              type={type}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 32 : perfectSize(70)}
            />
          </View>

          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: perfectSize(30),
            }}>
            <TokenNumberCell
              tokenDetails={item?.servingList[2]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 32 : perfectSize(70)}
            />
            <ItemSeparator />
            <TokenNumberCell
              tokenDetails={item?.servingList[3]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 32 : perfectSize(70)}
            />
          </View>
        </View>
      ) : item?.servingList?.length === 5 ? (
        <View
          style={{
            height: perfectSize(295),
            // justifyContent: 'center',
            // backgroundColor: 'red',
            // alignItems: 'center',
            marginLeft: isRTL ? perfectSize(-200) : perfectSize(200),
          }}>
          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'center',
              alignItems: 'center',

              marginTop: perfectSize(30),
            }}>
            <TokenNumberCell
              tokenDetails={item?.servingList[0]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width:  responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 25 : perfectSize(70)}
            />
            <ItemSeparator />
            <TokenNumberCell
              tokenDetails={item?.servingList[1]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 25 : perfectSize(70)}
            />
            <ItemSeparator />
            <TokenNumberCell
              tokenDetails={item?.servingList[2]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 25 : perfectSize(70)}
            />
          </View>

          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: perfectSize(30),
            }}>
            <TokenNumberCell
              tokenDetails={item?.servingList[3]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 25 : perfectSize(70)}
            />
            <ItemSeparator />
            <TokenNumberCell
              tokenDetails={item?.servingList[4]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 25 : perfectSize(70)}
            />
          </View>
        </View>
      ) : item?.servingList?.length > 5 ? (
        <View
          style={{
            height: perfectSize(295),
            // justifyContent: 'center',
            // backgroundColor: 'red',
            // alignItems: 'center',
            marginLeft: isRTL ? 0 : perfectSize(200),
            marginRight: isRTL ? perfectSize(200) : undefined,
          }}>
          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'center',
              alignItems: 'center',

              marginTop: perfectSize(30),
            }}>
            <TokenNumberCell
              tokenDetails={item?.servingList[0]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 25 : perfectSize(70)}
            />
            <ItemSeparator />
            <TokenNumberCell
              tokenDetails={item?.servingList[1]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 25 : perfectSize(70)}
            />
            <ItemSeparator />
            <TokenNumberCell
              tokenDetails={item?.servingList[2]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 25 : perfectSize(70)}
            />
          </View>

          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: perfectSize(30),
            }}>
            <TokenNumberCell
              tokenDetails={item?.servingList[3]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 25 : perfectSize(70)}
            />
            <ItemSeparator />
            <TokenNumberCell
              tokenDetails={item?.servingList[4]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),

                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 25 : perfectSize(70)}
            />
            <ItemSeparator />
            <TokenNumberCell
              tokenDetails={item?.servingList[5]}
              type={type}
              index={index}
              length={1}
              containerStyle={{
                marginLeft: perfectSize(0),
                // width: perfectSize(265),
                // height: perfectSize(131),
                width: responsiveWidth(14),
                height: responsiveHeight(12),
                borderRadius: perfectSize(10),
                backgroundColor: '#FFF',
              }}
              textStyle={{
                // fontSize: perfectSize(
                //   Platform.OS === 'windows' ? 60 : 70,
                // ),
                fontSize:
                  Platform.OS === 'windows'
                    ? responsiveFontSize(2.6)
                    : perfectSize(70),
              }}
              fontSize={Platform.OS === 'windows' ? 25 : perfectSize(70)}
            />
          </View>
        </View>
      ) : (
        <EmptyTokenList isSplitScreen={false} />
      )}
    </View>
  );
};

export default ServingTokenList;

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
