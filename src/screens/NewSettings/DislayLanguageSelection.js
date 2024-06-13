import { StyleSheet, Text, View, Image, TouchableOpacity,I18nManager } from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Images, Colors,Fonts,Globals,} from '../../constants';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import { PixelRatio, Dimensions } from 'react-native';
import { create } from 'react-native-pixel-perfect';
import StorageManager from '../../helpers/storage/StorageManager';
import {useDispatch, useSelector} from 'react-redux';
import { DisplayLanguageActions,AlignmentActions } from '../../redux/actions';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
const DislayLanguageSelection = () => {
  const {
    languagechanged,
    selectedlanguage,
  } = useSelector(state => state?.DisplayLanguageState);
  const [isEnglishChecked, setIssEnglishChecked] = useState(true);
  const [isArabicChecked, setIsArabicChecked] = useState(false);
  const [isFrenchChecked, setIsFrenchChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [applied, setApplied] = useState(false);
  const {t, i18n} = useTranslation();
  const {isRTL} = useSelector(state=> state.AlignmentState)
  const dispatch = useDispatch();
  // const [selectedLanguage, setSelectedLanguage] = useState(
  //   Globals.SELECTED_LANGUAGE === 'ar'
  //     ? 'Arabic'
  //     : Globals.SELECTED_LANGUAGE === 'en'
  //     ? 'English'
  //     : 'French',
  // );

  useEffect(() => {
    if (selectedlanguage === 'en'){
    dispatch(DisplayLanguageActions.setLanguage('en'));
    }
    else  if (selectedlanguage === 'ar'){
      dispatch(DisplayLanguageActions.setLanguage('ar'));
    }
    else {
      dispatch(DisplayLanguageActions.setLanguage('fr'));
    }
    console.log('Globals.SELECTED_LANGUAGE', Globals.SELECTED_LANGUAGE);
    return () => {};
  }, []);

  const SwitchLanuageToEnglish = () => {
      dispatch(DisplayLanguageActions.setLanguage('en'));
  };
  const SwitchLanuageToArabic = () => {
      dispatch(DisplayLanguageActions.setLanguage('ar'));
  };
  const SwitchLanuageToFrench = () => {
    dispatch(DisplayLanguageActions.setLanguage('fr'));
  };
  const LanguageApplyAction = () => {
    setApplied(true);
      if (selectedlanguage === 'en' || selectedlanguage === 'fr') {
        onPressEnglishOk();
      } else if (selectedlanguage === 'ar') {
        onPressOk();
      }
  };
  const onPressEnglishOk = () => {
    i18next.changeLanguage(selectedlanguage).then(t => {
      StorageManager.saveLanguage(selectedlanguage);
      StorageManager.saveIsLanguageChanged('CHANGED');
       dispatch(AlignmentActions.setRTL(false));
       StorageManager.setIsRtl(false)
      // I18nManager.forceRTL(false);
    
    });
  };
  const onPressOk = () => {
    i18next.changeLanguage(selectedlanguage).then(t => {
      console.log('language====',)
      StorageManager.saveLanguage(selectedlanguage);
      StorageManager.saveIsLanguageChanged('CHANGED');
      dispatch(AlignmentActions.setRTL(true))
       StorageManager.setIsRtl(true);
      // I18nManager.forceRTL(true);
   
    });
  };

  return (
    <View>
      <View
        style={{
          marginLeft: 30,
          marginTop: 50,
          flexDirection: isRTL ? 'row-reverse' : 'row',
          width: perfectSize(1300),
        }}>
        <TouchableOpacity onPress={() => {
              selectedlanguage === 'en' ? null : SwitchLanuageToEnglish()}}>
             {selectedlanguage === 'en' ? (
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor:Colors.PRIMARY_COLOR,
              }}
              source={Images.TICK}
            />
          ) : (
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor:Colors.PRIMARY_COLOR,
              }}
              source={Images.TICK_Round}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 10,
            color: Colors.PRIMARY_TEXT_COLOR,
            fontSize: perfectSize(32),
            fontFamily: Fonts.Poppins_Regular,
            textAlign: isRTL ? 'right' : 'left',
            marginRight : isRTL ?  perfectSize(80) : undefined,
          }}>
          {t(Translations.ENGLISH)}
        </Text>
      </View>
      <View style={{marginLeft: 30, marginTop: 20,
      flexDirection: isRTL ? 'row-reverse' : 'row',}}>
        <TouchableOpacity onPress={() => {
               selectedlanguage === 'ar' ? null : SwitchLanuageToArabic()}}>
          {selectedlanguage === 'ar'  ? (
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor:Colors.PRIMARY_COLOR,
              }}
              source={Images.TICK}
            />
          ) : (
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor:Colors.PRIMARY_COLOR,
              }}
              source={Images.TICK_Round}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 10,
            color: Colors.PRIMARY_TEXT_COLOR,
            fontSize: perfectSize(32),
            fontFamily: Fonts.Poppins_Regular,
            textAlign: isRTL ? 'right' : 'left',
            marginRight : isRTL ?  perfectSize(80) : undefined,
          }}>
         {t(Translations.ARABIC)}
        </Text>
      </View>
      <View style={{marginLeft: 30, marginTop: 20,
          flexDirection: isRTL ? 'row-reverse' : 'row',}}>
        <TouchableOpacity onPress={() => {
         selectedlanguage === 'fr' ? null : SwitchLanuageToFrench()}}>
          {selectedlanguage === 'fr' ? (
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor:Colors.PRIMARY_COLOR,
              }}
              source={Images.TICK}
            />
          ) : (
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor:Colors.PRIMARY_COLOR,
              }}
              source={Images.TICK_Round}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 10,
            color: Colors.PRIMARY_TEXT_COLOR,
            fontSize: perfectSize(32),
            fontFamily: Fonts.Poppins_Regular,
            textAlign: isRTL ? 'right' : 'left',
            marginRight : isRTL ?  perfectSize(80) : undefined,
          }}>
          {t(Translations.FRENCH)}
        </Text>
      </View>
      <View>
    <TouchableOpacity
          style={{
            backgroundColor: Colors.SECONDARY_COLOR,
            width: perfectSize(190),
            height: perfectSize(60),
            marginLeft:isRTL ?  perfectSize(450): 450,
            marginTop: 100,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() =>{
            LanguageApplyAction()}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: perfectSize(32),
              fontFamily: Fonts.Poppins_Regular,
            }}>
           {t(Translations.APPLY)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DislayLanguageSelection;

const styles = StyleSheet.create({});
