import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {Images, Colors, Globals, Fonts} from '../../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {useNavigation} from '@react-navigation/core';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import LanguageItem from '../../componets/LanguageItem';
import {useFocusEffect} from '@react-navigation/native';
import {configure} from '@react-native-community/netinfo';
import Utils from '../../helpers/utils/Utils';
import Tts from 'react-native-tts';
import {LanguageActions, VoiceLanguageActions} from '../../redux/actions';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import StorageManager from '../../helpers/storage/StorageManager';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
const VoiceLanguageSelection = () => {
  const {
    languageList,
    selectedLanguageIndex,
    selectedLanguageList,
    dummyLanguageList,
  } = useSelector(state => state?.LanguageState);
  const {isSpeakDisabled, noneIsSelected} = useSelector(
    state => state?.VoiceLanguageState,
  );

  const [applied, setApplied] = useState(false);
  const {isRTL} = useSelector(state => state.AlignmentState);
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  useFocusEffect(
    React.useCallback(() => {
      // setSelectedLanguageArray([...selectedLanguageList]);
      dispatch(VoiceLanguageActions.selectNoneOption(isSpeakDisabled));
      return () => {
        dispatch(VoiceLanguageActions.selectNoneOption(isSpeakDisabled));
      };
    }, []),
  );

  const applyButtonAction = () => {
    if (noneIsSelected !== isSpeakDisabled) {
      if (isSpeakDisabled === true) {
        StorageManager.setSpeakDisabled(false);
        dispatch(VoiceLanguageActions.disableSpeak(false));
      } else {
        StorageManager.setSpeakDisabled(true);
        dispatch(VoiceLanguageActions.disableSpeak(true));
      }
    } else {
      console.log('---------', dummyLanguageList);
      dispatch(LanguageActions.addLanguage([...dummyLanguageList]));
      StorageManager.saveSelectedLanguageIndex([...dummyLanguageList]);
      setApplied(true);
    }
  };
  const selectionItem = async _item => {
    setApplied(false);
    var arr = [];
    var newArr = [];
    const message = t(Translations.LANGUAGE_NOT_SUPPORTED);

    const __index = dummyLanguageList.findIndex(i => i.id === _item.id);
    console.log('item found', __index), arr;
    if (__index === -1) {
      console.log('inside not found');
      // arr.push(_item);
      try {
        await Tts.setDefaultLanguage(_item.languageCode);
        dispatch(
          LanguageActions.setDummyLanguageList([...dummyLanguageList, _item]),
        );
      } catch (err) {
        // My Samsung S9 has always this error: "Language is not supported"
        console.log(`setDefaultLanguage error `, err);

        console.log('------------------ ', err);
        if (Platform.OS === 'windows') {
          Utils.showToast(
            t(Translations.FAILED),
            message,
            'tomatoToast',
            'bottom',
          );
          if (Platform.OS === 'windows') {
            setTimeout(() => {
              Utils.hideToast();
            }, 3000);
          }
        }

        if (err?.code === 'lang_not_supported') {
          Utils.showToast(
            t(Translations.FAILED),
            message,
            'tomatoToast',
            'bottom',
          );
          if (Platform.OS === 'windows') {
            setTimeout(() => {
              Utils.hideToast();
            }, 3000);
          }
        }
      }
    } else {
      if (dummyLanguageList.length > 1) {
        dispatch(LanguageActions.removeDummyLanguageList(_item));
      } else {
        Utils.showToast(
          t(Translations.FAILED),
          t(Translations.FAILED_VOICE_MSG),
          'tomatoToast',
          'bottom',
        );
        if (Platform.OS === 'windows') {
          setTimeout(() => {
            Utils.hideToast();
          }, 3000);
        }
      }
    }
  };

  const selectNoneOption = () => {
    // console.log(
    //   '===========<><><><>',
    //   dummyLanguageList,
    //   selectedLanguageList,
    // );
    dispatch(VoiceLanguageActions.selectNoneOption(!noneIsSelected));
  };

  return (
    <View
      style={{
        marginLeft: perfectSize(55),
        marginRight: isRTL ? perfectSize(55) : undefined,
      }}>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: perfectSize(410),
            marginTop: perfectSize(50),
          }}
          contentContainerStyle={{
            flexGrow: 1,
            // marginTop: perfectSize(100),
          }}>
          {languageList.map((item, i) => {
            let include = false;
            let newItem = {...item};
            include = dummyLanguageList.some(d => d.id === item.id);

            {
              /* console.log('=', item.title, include); */
            }

            return (
              <LanguageItem
                item={newItem}
                index={i}
                selectionItem={selectionItem}
                include={include}
              />
            );
          })}
        </ScrollView>
        <View
          style={{
            marginTop: 20,
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}>
          <TouchableWithoutFeedback
            style={{opacity: 1}}
            // onFocus={() => props.onFocusSplitScreenEnableAction()}
            // onBlur={() => props.onBlurSplitScreenEnableAction()}
            onPress={() => {
              selectNoneOption();
            }}>
            {noneIsSelected === true ? (
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: Colors.PRIMARY_COLOR,
                }}
                source={Images.TICK}
              />
            ) : (
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: Colors.PRIMARY_COLOR,
                }}
                source={Images.TICK_Round}
              />
            )}
          </TouchableWithoutFeedback>
          <Text
            style={{
              marginHorizontal: 10,
              color: Colors.PRIMARY_TEXT_COLOR,
              fontSize: perfectSize(32),
              fontFamily: Fonts.Poppins_Regular,
              textAlign: isRTL ? 'right' : 'left',
              // marginRight: isRTL ? perfectSize(80) : undefined,
            }}>
            {t(Translations.NONE)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          applyButtonAction();
        }}
        style={{
          backgroundColor: Colors.SECONDARY_COLOR,
          width: perfectSize(190),
          height: perfectSize(60),
          left: isRTL ? undefined : perfectSize(450),
          right: isRTL ? perfectSize(900) : undefined,

          borderRadius: 5,
          bottom: perfectSize(100),
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',

            fontFamily: Fonts.Poppins_Regular,
            fontSize: perfectSize(32),
          }}>
          {t(Translations.APPLY)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoiceLanguageSelection;

const styles = StyleSheet.create({});
