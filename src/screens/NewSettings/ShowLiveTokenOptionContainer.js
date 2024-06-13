import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {Colors, Fonts, Globals, Images, Strings} from '../../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';

import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import {MenuActions, ShowLiveTokensActions} from '../../redux/actions';
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

const ShowLiveTokenOptionContainer = props => {
  const {t, i18n} = useTranslation();

  const dispatch = useDispatch();
  const {isRTL} = useSelector(state => state.AlignmentState);
  // const {isSplitScreenEnabled} = useSelector(state => state.MenuState);
  // const {allowSplitScreen} = useSelector(state => state?.DataListState);
  const {showLiveTokensEnabled} = useSelector(
    state => state.ShowLiveTokenState,
  );
  const showLiveTokenButtonAction = () => {
    if (showLiveTokensEnabled === true) {
      dispatch(ShowLiveTokensActions.setShowLiveTokens(false));
      StorageManager.saveIsLiveTokensEnabled(false);
      dispatch(MenuActions.setIsSplitScreenEnable(false));
    } else {
      dispatch(ShowLiveTokensActions.setShowLiveTokens(true));
      StorageManager.saveIsLiveTokensEnabled(true);
      dispatch(MenuActions.setIsSplitScreenEnable(false));
      StorageManager.saveIsSplitScreenEnabled(false);
    }
    Globals.PREVIOUS_TOKEN_LIST = [];
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors.SECONDARY_COLOR,
          flexDirection: isRTL ? 'row-reverse' : 'row',
        },
      ]}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: perfectSize(35),
            color: 'white',
            marginLeft: 10,
            fontFamily: Fonts.Poppins_Regular,
            textAlign: isRTL ? 'right' : 'left',
            marginRight: isRTL ? perfectSize(80) : undefined,
          }}>
          {t(Translations.SHOW_LIVE_TOKEN)}
        </Text>
        <Text
          style={{
            fontSize: perfectSize(30),
            color: 'white',
            marginTop: perfectSize(10),
            marginLeft: 10,
            fontFamily: Fonts.Poppins_Regular,
            textAlign: isRTL ? 'right' : 'left',
            marginRight: isRTL ? perfectSize(80) : undefined,
          }}>
          {t(Translations.SHOW_LIVE_TOKEN_DESCRIPTION)}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: Colors.SECONDARY_COLOR,
          borderRadius: 8,
          marginTop: perfectSize(30),
        }}>
        <View
          style={{
            backgroundColor: Colors.SECONDARY_COLOR,
            width: perfectSize(200),
            height: 50,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            // disabled={allowSplitScreen ? false : true}
            style={{
              height: perfectSize(80),
              // margin: '5%',
              padding: '10%',
              // backgroundColor: 'red',
              transform: [{scaleX: isRTL ? -1 : 1}],
            }}
            onPress={() => {
              showLiveTokenButtonAction();
            }}>
            <View
              style={{
                flexDirection: 'row',
                // flex: 1,
                // justifyContent: 'center',
                alignItems: 'center',
                width: perfectSize(70),
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: perfectSize(80),
                  marginLeft: perfectSize(0),
                  borderRadius: perfectSize(15),
                  height: perfectSize(20),
                }}
              />
              <View
                style={{
                  backgroundColor: Colors.PRIMARY_COLOR,
                  width: perfectSize(45),
                  height: perfectSize(45),
                  borderRadius: perfectSize(45 / 2),
                  marginTop: perfectSize(50),
                  zIndex: 5,
                  position: 'absolute',
                  right:
                    showLiveTokensEnabled === true
                      ? perfectSize(-10)
                      : undefined,
                  left: showLiveTokensEnabled === true ? undefined : 0,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ShowLiveTokenOptionContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    width: perfectSize(1100),

    height: perfectSize(200),
    marginTop: 50,
    marginLeft: perfectSize(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
