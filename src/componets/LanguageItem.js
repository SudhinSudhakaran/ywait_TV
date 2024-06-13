import React, {useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  findNodeHandle,
  ImageBackground,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {Colors, Fonts, Images} from '../../constants';
import {FlatGrid} from 'react-native-super-grid';
import Utils from '../../helpers/utils/Utils';
import {useDispatch, useSelector} from 'react-redux';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {LanguageActions} from '../redux/actions';
import Tts from 'react-native-tts';

import StorageManager from '../helpers/storage/StorageManager';
import {Globals} from '../constants';

let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const LanguageItem = ({
  item,
  index,
  itemIndex,
  isSelectedItem = false,
  isFocusedItem = false,
  selectionItem,
  include,
}) => {
  const dispatch = useDispatch();
  const {isRTL} = useSelector(state=> state.AlignmentState)
  const {isSpeakDisabled,noneIsSelected} = useSelector(state=> state.VoiceLanguageState)
  const {
    languageList,
    selectedLanguageIndex,
    selectedLanguageList,
    dummyLanguageList,
  } = useSelector(state => state?.LanguageState);

  //   const [focus, setFocus] = useState(true);
  //const [isSelectedItem, setIsSelectedItem] = useState(false);
  // console.log('======== dummy', dummyLanguageList);
  const touchableHighlightRef = useRef(null);
  const onRef = useCallback(ref => {
    if (ref) {
      touchableHighlightRef.current = ref;
    }
  }, []);

  return (
    <View
      style={{
     
        marginTop: 20,
        flexDirection: isRTL ? 'row-reverse' : 'row',
      }}
      key={`language-item-${index}`}>
      <TouchableWithoutFeedback
        style={{opacity: 1}}
        // onFocus={() => props.onFocusSplitScreenEnableAction()}
        // onBlur={() => props.onBlurSplitScreenEnableAction()}
        onPress={() => {
          noneIsSelected ? null : selectionItem(item);
        }}>
        {include === true ? (
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: noneIsSelected ? 'gray' : Colors.PRIMARY_COLOR,
            }}
            source={Images.TICK}
          />
        ) : (
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: noneIsSelected ? 'gray' : Colors.PRIMARY_COLOR,
            }}
            source={Images.TICK_Round}
          />
        )}
      </TouchableWithoutFeedback>
      <Text
        style={{
          marginHorizontal: 10,
          color: isSpeakDisabled ? 'gray' : Colors.PRIMARY_TEXT_COLOR,
          fontSize: perfectSize(32),
          fontFamily: Fonts.Poppins_Regular,
          textAlign: isRTL ? 'right' : 'left',
          // marginRight: isRTL ? perfectSize(80) : undefined,
        }}>
        {item?.title}
      </Text>
    </View>
  );
};

export default LanguageItem;
