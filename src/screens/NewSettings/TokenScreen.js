import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Globals} from '../../constants';
import Translations from '../../constants/Translations';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import TokenStatusDoubleScreen from '../tokenStatus/TokenStatusDoubleScreen';
import TokenStatusScreen from '../tokenStatus/TokenStatusScreen';
import NewSingleCarouselScreen from '../newCarouselScreen/NewSingleCarouselScreen';
import NewSplitCarouselScreen from '../newCarouselScreen/NewSplitCarouselScreen';
const TokenScreen = () => {
  const {t, i18n} = useTranslation();
  const {menuSelected, settingOptionSelected, isSplitScreenEnabled} =
    useSelector(state => state.MenuState);
  return (
    <View style={{flex: 1}}>
      {Globals.SAVED_TV_POINT_DETAILS !== undefined ? (
        isSplitScreenEnabled ? (
          <>
            {/* <TokenStatusDoubleScreen /> */}
            <NewSplitCarouselScreen />
          </>
        ) : (
          <>
            {/* <TokenStatusScreen /> */}
            <NewSingleCarouselScreen />
          </>
        )
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: Colors.PRIMARY_TEXT_COLOR}}>
            {t(Translations.PLEASE_SELECT_TV_POINT)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TokenScreen;

const styles = StyleSheet.create({});
