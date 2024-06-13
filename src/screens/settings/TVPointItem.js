import React, { useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  findNodeHandle,
} from 'react-native';
import { Colors, Fonts, Images } from '../../constants';
import { FlatGrid } from 'react-native-super-grid';
import Utils from '../../helpers/utils/Utils';

import { PixelRatio, Dimensions } from 'react-native';
import { create } from 'react-native-pixel-perfect';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const TVPointItem = ({ itemIndex, isSelectedItem = false, title, consultants, hasTVPreferredFocus, blockFocusRight, onSelectTVPoint }) => {
  const [focus, setFocus] = useState(false);
  //const [isSelectedItem, setIsSelectedItem] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const onPress = useCallback(() => {
    // setIsSelectedItem(true);
    onSelectTVPoint(itemIndex);
  }, []);

  const touchableHighlightRef = useRef(null);
  const onRef = useCallback((ref) => {
    if (ref) {
      touchableHighlightRef.current = ref;
    }
  }, []);

  return (
    <TouchableHighlight
      underlayColor={Colors.SECONDARY_COLOR}
      onPress={onPress}
      onFocus={onFocus}
      onBlur={onBlur}
      hasTVPreferredFocus={hasTVPreferredFocus}
      style={[styles.wrapper, { backgroundColor: Colors.SECONDARY_COLOR },]}
      ref={onRef}
      nextFocusRight={
        blockFocusRight ? findNodeHandle(touchableHighlightRef.current) : null
      }>
      <View style={[styles.itemView, focus ? { borderColor: Colors.PRIMARY_COLOR } : null]}>
        <View style={{ marginTop: perfectSize(8), marginLeft: perfectSize(15), marginRight: perfectSize(8), flexDirection: 'row', alignContent: 'space-around' }}>
          {
            isSelectedItem
              ?
              <Image style={{ tintColor: Colors.PRIMARY_COLOR, width: perfectSize(50), height: perfectSize(50), borderRadius: perfectSize(50) / 2, overflow: 'hidden', resizeMode: 'cover' }} source={Images.TICK_IMAGE} />
              :
              <View style={{ width: perfectSize(50), height: perfectSize(50) }} />
          }
          <Text style={styles.text} numberOfLines={1}>{title}</Text>
        </View>
        <FlatGrid
          itemDimension={perfectSize(200)}
          style={styles.gridView}
          data={consultants}
          spacing={perfectSize(10)}
          fixed={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer]}>

              <Image style={{
                width: perfectSize(80), height: perfectSize(80), borderRadius: perfectSize(80) / 2,
                alignSelf: 'center',
                overflow: 'hidden',
                borderWidth: perfectSize(2),
                borderColor: Colors.PRIMARY_COLOR,
                resizeMode: 'cover',
              }} source={{
                uri: Utils.isValidUrl(item?.image) ? item?.image : Utils.getDefaultAvatarImageURL((item?.firstName) + '+' + (item?.lastName)),
              }}
              />
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>

            </View>
          )}
        />

      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: perfectSize(10),
    marginHorizontal: perfectSize(10),
  },
  itemView: {
    flex: 1,
    borderColor: 'transparent',
    borderWidth: perfectSize(10),
    width: perfectSize(500),
    borderRadius: perfectSize(10),
  },
  text: {
    position: 'absolute',
    top: perfectSize(0),
    left: perfectSize(50),
    right: perfectSize(50),
    color: 'white',
    fontSize: perfectSize(38),
    fontWeight: 'bold',
    textAlign: 'center',
  },

  gridView: {
    marginTop: perfectSize(10),
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: perfectSize(5),
    padding: perfectSize(5),
    height: perfectSize(140),
  },
  itemName: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: perfectSize(25),
    color: Colors.WHITE_COLOR,
    textAlign: 'center',
    marginLeft: perfectSize(2),
    marginRight: perfectSize(2),
  },
});

export default TVPointItem;
