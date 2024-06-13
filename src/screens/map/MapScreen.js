



import {

  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { create } from 'react-native-pixel-perfect';
import { PixelRatio, Dimensions } from 'react-native';
import { Colors, Fonts, Globals, Images } from '../constants';




import { useNavigation } from '@react-navigation/core';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const MapScreen = () => {
  const navigation = useNavigation()
  const mainCarouselRef = useRef()
  const [index, setIndex] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      mainCarouselRef.current.scrollToIndex({
        index: index + 1,
        animated: true,
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} >
        <Text>Back</Text>
      </TouchableOpacity>
      {/* <WebView
        geolocationEnabled={true}
        source={{
          uri: 'https://www.blablabla',
        }}
        originWhitelist={['https://www.blavla.org', 'https://www.blabla.com']}
        style={{marginHorizontal: 0, backgroundColor: 'transparent'}}
      /> */}

    
    </View>
  );
}

export default MapScreen

const styles = StyleSheet.create({
  container: { flex: 1 }
});