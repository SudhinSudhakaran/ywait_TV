import {StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react';
import StorageManager from '../../helpers/storage/StorageManager';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native';
import APIConnection from '../../helpers/api/APIConnection';
import DataManager from '../../helpers/api/DataManager';
import Utils from '../../helpers/utils/Utils';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import {Colors, Fonts, Globals, Images, Strings} from '../../constants';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
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

const SelectTvPointSelection = props => {
  const {t, i18n} = useTranslation();
  const {isRTL} = useSelector(state => state.AlignmentState);
  const onPress = useCallback(() => {
    // setIsSelectedItem(true);
    props.onFocusSelectTvitemAction();
    props.onSelectTVPoint(props.itemIndex);

    // if (Platform.OS === 'windows') {
    //     onSelectTVPoint(itemIndex);
    // }
  }, []);

  if (props.isSelectedItem === true) {
  }

  return (
    <View
      style={{
        // flex:1,
        //  backgroundColor: 'red',
        // width:perfectSize(500),
        height: perfectSize(100),
        flexDirection: isRTL ? 'row-reverse' : 'row',
      }}>
      <TouchableHighlight
        underlayColor={Colors.PRIMARY_COLOR}
        onPress={onPress}
        style={{
          backgroundColor:
            props.isSelectedItem === true
              ? Colors.PRIMARY_COLOR
              : Colors.SECONDARY_COLOR,
          width: perfectSize(530),
          marginTop: perfectSize(20),
          height: perfectSize(70),
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: isRTL ? 'row-reverse' : 'row'}}>
          <Text
            style={[
              styles.text,
              {
                textAlign: isRTL ? 'right' : 'left',
                marginRight: isRTL ? perfectSize(80) : undefined,
              },
            ]}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {props.title}
          </Text>
          {props.isSelectedItem === true ? (
            <Image
              style={{
                // marginLeft: perfectSize(100),
                // // tintColor: Colors.PRIMARY_COLOR,
                width: perfectSize(35),
                height: perfectSize(35),
                marginHorizontal: perfectSize(10),
                marginTop: perfectSize(6),
              }}
              source={Images.WHITE_TICK}
            />
          ) : null}
        </View>
      </TouchableHighlight>
    </View>
  );
};
export default SelectTvPointSelection;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    // marginTop: perfectSize(10),
    textAlign: 'left',
    marginLeft: perfectSize(30),
    fontSize: perfectSize(32),
    fontFamily: Fonts.Poppins_Regular,
    flex: 1,
  },
});
