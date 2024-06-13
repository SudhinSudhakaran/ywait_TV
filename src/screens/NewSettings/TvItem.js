import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  findNodeHandle,
  Alert,
  Switch,
  ScrollView,
  Platform,
  ImageBackground,
  BackHandler,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import Utils from '../../helpers/utils/Utils';
import {Colors, Fonts, Globals, Images, Strings} from '../../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import ConsultantsList from './ConsultantsList';

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

const TvItem = props => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const {selectTvPointOptionSelected} = useSelector(state => state.MenuState);
  const {tvPointList} = useSelector(state => state.TvPointState);
  const {isRTL} = useSelector(state => state.AlignmentState);
  // console.log('====', props.selectedConsultantList);
  const selectedItem = tvPointList.find(i => i.isSelectedItem === true);
  // console.log('ppppppp', tvPointList,selectedItem);
  const renderConsultantsFlatList = ({item, index}) => {
    let type = 'CONSULTANT';
    let found = [];
    let _name = '';
    if (selectedItem?.rooms) {
      // found = selectedItem?.rooms.find(room => room._id === item._id);
      found = selectedItem?.rooms.findIndex(i => i.id === item.id);
      if (found !== -1) {
        type = 'ROOM';
      } else {
        type = 'CONSULTANT';
      }
    }

    return <ConsultantsList item={item} subIndex={index} type={type} />;
  };

  return (
    <View>
      <View
        style={
          {
            // flex: 0.54,
            // left: '44%',
            // zIndex: -2,
            // position: 'absolute',
            // bottom: perfectSize(0),
            // top: perfectSize(100),
            // backgroundColor:BACKGROUND_COLOR,
          }
        }>
        <View
          style={{
            width: perfectSize(900),
            height: perfectSize(910),
            backgroundColor: Colors.BACKGROUND_COLOR,
            // backgroundColor: 'green',
          }}>
          <Text
            style={[
              styles.header,
              {
                textAlign: isRTL ? 'right' : 'left',
                marginRight: isRTL ? perfectSize(120) : undefined,
              },
            ]}>
            {selectedItem?.name}
          </Text>

          <FlatGrid
            itemDimension={perfectSize(273)}
            style={{
              marginTop: perfectSize(0),
              marginRight: isRTL ? perfectSize(200) : perfectSize(40),
              marginLeft: isRTL ? perfectSize(200) : undefined,
              width: perfectSize(650),

              // marginBottom: perfectSize(150),
              // flex: 1,
              flexDirection: isRTL ? 'row-reverse' : 'row',
              //  backgroundColor: 'red',
            }}
            data={selectedItem?.consultants || []}
            spacing={perfectSize(8)}
            fixed={true}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={renderConsultantsFlatList}
          />
          <View
            style={{
              alignSelf: 'flex-end',
              // backgroundColor: 'blue',
              width: '100%',
              height: perfectSize(70),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {selectedItem?.consultants.length > 0 ? (
              <TouchableHighlight
                style={{
                  width: perfectSize(230),
                  height: perfectSize(65),
                  marginRight: isRTL ? perfectSize(-160) : perfectSize(160),
                  borderRadius: 5,
                  backgroundColor:
                    Globals.SAVED_TV_POINT_DETAILS?._id === selectedItem?._id
                      ? Colors.PRIMARY_COLOR
                      : Colors.SECONDARY_COLOR,

                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
                underlayColor={Colors.PRIMARY_COLOR}
                onPress={() => props.onFocusAssignButtonAction()}>
                <Text style={styles.assigntext}>
                  {Globals.SAVED_TV_POINT_DETAILS?._id === selectedItem?._id
                    ? t(Translations.ASSIGNED)
                    : t(Translations.ASSIGN)}
                </Text>
              </TouchableHighlight>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default TvItem;

const styles = StyleSheet.create({
  header: {
    color: 'black',
    marginTop: perfectSize(50),
    marginLeft: perfectSize(120),
    textAlign: 'left',
    fontSize: 20,
    // fontWeight: '800',
    fontFamily: Fonts.Poppins_Regular,
  },
  assigntext: {
    color: 'white',
    textAlign: 'center',

    fontFamily: Fonts.Poppins_Regular,
    fontSize: perfectSize(32),
  },
  assignbutton: {},
});
