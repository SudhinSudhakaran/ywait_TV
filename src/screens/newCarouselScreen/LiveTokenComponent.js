/* eslint-disable no-lone-blocks */
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {t} from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import Utils from '../../helpers/utils/Utils';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import React, {useEffect, useState, useRef, createRef} from 'react';
import DataManager from '../../helpers/api/DataManager';
import Translations from '../../constants/Translations';
import APIConnection from '../../helpers/api/APIConnection';
import {Colors, Fonts, Globals, Images} from '../../constants';
import * as Animatable from 'react-native-animatable';
import Tts from 'react-native-tts';
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
/**
 <---------------------------------------------------------------------------------------------->
 * Purpose: Live token component
 * Created/Modified By: Sudhin Sudhakaran
 * Created/Modified Date: 05-07-2023
 * Steps:
 * 1.   
 <---------------------------------------------------------------------------------------------->
 */
const LiveTokenComponent = ({liveTokenList}) => {
  const dummyData = [
    {roomNumber: 1, token: 'MM101'},
    {roomNumber: 1, token: 'M102'},
    {roomNumber: 2, token: 'R103'},
    {roomNumber: 3, token: 'MM104'},
    {roomNumber: 4, token: 'MM105'},
    {roomNumber: 5, token: 'MM106'},
    {roomNumber: 3, token: 'MM104'},
    {roomNumber: 4, token: 'MM105'},
  ];
  const {isRTL} = useSelector(state => state.AlignmentState);
  let speakedToken = [];
  if (liveTokenList.length > 0) {
    var speakText = '';
    liveTokenList.map(item => {
      let check = false;
      if (speakedToken.length > 0) {
        for (let i = 0; i < speakedToken.length; i++) {
          console.log(speakedToken[i].token , item.token)
          if (item.token === speakedToken[i].token  ) {
        
            check = true;
            return;
          }
        }
      }
      console.log('check', speakedToken, 'iiiii',item.token, check);

      if (check === false) {
        if (item.type === 'ROOM') {
          if (item.isNewInRoom === true) {
            for (let i = 0; i < Globals.PREVIOUS_TOKEN_LIST?.length; i++) {
              if (Globals.PREVIOUS_TOKEN_LIST[i].token === item.token) {
                Globals.PREVIOUS_TOKEN_LIST[i].isNewInRoom = false;
              }
            }
            let roomNo = '';
            if (item.roomNumber) {
              roomNo = Utils.addSpace(item?.roomNumber);
            }
            const [letters, numbers] = item.token.match(/[A-Za-z]+|[0-9]+/g);
            const spacedLetters = letters.split('').join(' , '); // add spaces between letters
            let _t = `${spacedLetters},  ${numbers}`;
            speakedToken.push({type: 'ROOM', token: item.token});
            speakText =
              speakText +
              `Token number     ${_t} for room   ${item?.roomName}        `;
          }
        } else {
          if (item.isNewInConsultant === true) {
            for (let i = 0; i < Globals.PREVIOUS_TOKEN_LIST?.length; i++) {
              if (Globals.PREVIOUS_TOKEN_LIST[i].token === item.token) {
                Globals.PREVIOUS_TOKEN_LIST[i].isNewInConsultant = false;
              }
            }
            let roomNo = '';
            if (item.roomNumber) {
              roomNo = Utils.addSpace(item?.roomNumber);
            }
            const [letters, numbers] = item.token.match(/[A-Za-z]+|[0-9]+/g);
            const spacedLetters = letters.split('').join(' , '); // add spaces between letters
            let _t = `${spacedLetters},  ${numbers}`;
            speakedToken.push({type: 'ROOM', token: item.token});
            speakText =
              speakText +
              `Token number     ${_t} for room number   ${roomNo}         `;
          }
        }
        // Tts.speak(speakText);
      }
    });
    console.log(' Globals.PREVIOUS_TOKEN_LIST', Globals.PREVIOUS_TOKEN_LIST);
    console.log('speakText ;;;;;;;;;;;;;;;;;;;;;;;;;;;;', speakText);
  }

  const LiveTokenEmptyComponent = () => {
    return (
      <View style={{flex: 1, marginTop: responsiveHeight(20)}}>
        <Image
          style={{
            width: perfectSize(140),
            height: perfectSize(100),
            alignSelf: 'center',
            transform: [{scaleX: isRTL ? -1 : 1}],
          }}
          source={Images.EMPTY_CUSTOMER}
        />
        <Text
          style={{
            color: Colors.SECONDARY_COLOR,
            fontFamily: Fonts.Poppins_Medium,
            fontSize: perfectSize(20),
            alignSelf: 'center',
            marginTop: perfectSize(20),
          }}>
          {t(Translations.NO_CUSTOMER_AVAILABLE)}
        </Text>
      </View>
    );
  };
  /**
 <---------------------------------------------------------------------------------------------->
 * Purpose: render item for flat list 
 * Created/Modified By: Sudhin Sudhakaran
 * Created/Modified Date: 05-07-2023
 * Steps:
 * 1.   render the each item in the list
 * 2.   
 <---------------------------------------------------------------------------------------------->
 */
  const renderItem = ({item, index}) => {
    console.log('renderItem live token', item);
    const needAnimation =
      item.type === 'ROOM' ? item.isNewInRoom : item.isNewInConsultant;

    return (
      <>
        <View>
          <View
            style={{
              flexDirection: 'row',
              height: responsiveHeight(7.5),
            }}>
            <View
              style={{
                height: '100%',
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'black',
                  height: responsiveWidth(3.5),
                  width: responsiveWidth(3.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: perfectSize(10),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Medium,
                    color: 'white',
                    fontSize: responsiveFontSize(1.3),
                  }}>
                  {item.type === 'ROOM'
                    ? item.roomAbbreviation
                    : item.roomNumber}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: '100%',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Animatable.View
                iterationCount={3}
                duration={3000}
                animation={needAnimation ? 'zoomIn' : ''}
                style={{
                  backgroundColor: 'white',
                  height: responsiveWidth(3.5),
                  width: responsiveWidth(8),
                  borderRadius: responsiveWidth(0.4),
                  marginLeft: responsiveWidth(1),
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,

                  // flex:1
                }}>
                <View
                  style={{
                    backgroundColor: Colors.PRIMARY_COLOR,
                    height: responsiveHeight(0.7),
                    width: '100%',
                    borderTopLeftRadius: responsiveWidth(0.4),
                    borderTopRightRadius: responsiveWidth(0.4),
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Medium,
                      color: Colors.SECONDARY_COLOR,
                      fontSize: responsiveFontSize(1.4),
                    }}>
                    #{item?.token}
                  </Text>
                </View>
              </Animatable.View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#989898',
            alignSelf: 'center',
            width: '90%',
            height: responsiveHeight(0.1),
            marginVertical: responsiveHeight(1.2),
          }}
        />
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{flexDirection: 'row', height: perfectSize(40), width: '100%'}}>
        <View
          style={{
            height: perfectSize(40),

            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Medium,
              fontSize: responsiveFontSize(1.3),
            }}>
            Room
          </Text>
        </View>
        <View
          style={{
            height: perfectSize(40),
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(1.3),
              fontFamily: Fonts.Poppins_Medium,
              marginLeft: '6%',
            }}>
            Token
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#989898',
          alignSelf: 'center',
          width: '90%',
          height: perfectSize(1),
          marginVertical: perfectSize(4),
        }}
      />
      <FlatList
        listKey={'unique-list-key-4654646626654465466624'}
        keyExtractor={(item, index) =>
          item?._id ? item?._id.toString() : index.toString()
        }
        data={liveTokenList}
        // data={dummyData}
        renderItem={renderItem}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={LiveTokenEmptyComponent}
      />
    </View>
  );
};

export default LiveTokenComponent;

const styles = StyleSheet.create({});
