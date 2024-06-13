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
import {Colors, Fonts, Globals, Images, Strings} from '../../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';

let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const LeftViewComponent = props => (
  <View
    style={{
      flex: 0.25,
      backgroundColor: Colors.BLACK_COLOR,
    }}>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginBottom: perfectSize(50),
      }}>
      <TouchableHighlight
        onFocus={() => props.onFocusTVPointMenuAction()}
        onBlur={() => props.onBlurTVPointMenuAction()}
        onPress={() => props.onFocusTVPointMenuAction()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ImageBackground
            style={{
              width: perfectSize(550),
              height: perfectSize(170),
              resizeMode: 'contain',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            source={
              props.isMenuTVPointFocused
                ? Images.SETTINGS_SELECTED_BG_IMAGE
                : Images.TRANSPARENT_IMAGE
            }>
            <Image
              style={{
                width: perfectSize(props.isMenuTVPointFocused ? 32 : 30),
                height: perfectSize(props.isMenuTVPointFocused ? 32 : 30),
                resizeMode: 'contain',
                marginLeft: perfectSize(41),
                tintColor: props.isMenuTVPointFocused
                  ? Colors.PRIMARY_COLOR
                  : Colors.SETTINGS_INACTIVE_ICON_COLOR,
              }}
              source={Images.TV_POINT_ICON}
            />
            <View
              style={{
                marginLeft: perfectSize(41),
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Regular,
                  fontSize: perfectSize(props.isMenuTVPointFocused ? 29 : 24),
                  color: Colors.SETTINGS_ACTIVE_TEXT_COLOR,
                }}>
                {Strings.SELECT_TV_POINT}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Regular,
                  fontSize: perfectSize(props.isMenuTVPointFocused ? 18 : 16),
                  color: Colors.SETTINGS_ACTIVE_TEXT_COLOR,
                }}>
                {Strings.SELECT_TV_POINT_DESCRIPTION}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onFocus={() => props.onFocusSplitMenuAction()}
        onBlur={() => props.onBlurSplitMenuAction()}
        onPress={() => props.onFocusSplitMenuAction()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ImageBackground
            style={[
              {
                width: perfectSize(550),
                height: perfectSize(170),
                resizeMode: 'contain',
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}
            source={
              props.isMenuSplitFocused
                ? Images.SETTINGS_SELECTED_BG_IMAGE
                : Images.TRANSPARENT_IMAGE
            }>
            <Image
              style={{
                width: perfectSize(props.isMenuSplitFocused ? 32 : 30),
                height: perfectSize(props.isMenuSplitFocused ? 32 : 30),
                resizeMode: 'contain',
                marginLeft: perfectSize(41),
                tintColor: props.isMenuSplitFocused
                  ? Colors.PRIMARY_COLOR
                  : Colors.SETTINGS_INACTIVE_ICON_COLOR,
              }}
              source={Images.SPLIT_SCREEN_ICON}
            />
            <View
              style={{
                marginLeft: perfectSize(41),
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Regular,
                  fontSize: perfectSize(props.isMenuSplitFocused ? 29 : 24),
                  color: Colors.SETTINGS_ACTIVE_TEXT_COLOR,
                }}>
                {Strings.ENABLE_SPLIT_SCREEN}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Regular,
                  fontSize: perfectSize(props.isMenuSplitFocused ? 18 : 16),
                  color: Colors.SETTINGS_ACTIVE_TEXT_COLOR,
                }}>
                {Strings.SPLIT_SCREEN_DESCRIPTION}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableHighlight>
      {/* Language selection button */}
      <TouchableHighlight
        onFocus={() => props.onFocusLanguageMenuAction()}
        onBlur={() => props.onBlurSplitMenuAction()}
        onPress={() => props.onFocusLanguageMenuAction()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ImageBackground
            style={[
              {
                width: perfectSize(550),
                height: perfectSize(170),
                resizeMode: 'contain',
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}
            source={
              props.isMenuLanguageFocused
                ? Images.SETTINGS_SELECTED_BG_IMAGE
                : Images.TRANSPARENT_IMAGE
            }>
            <Image
              style={{
                width: perfectSize(props.isMenuLanguageFocused ? 32 : 30),
                height: perfectSize(props.isMenuLanguageFocused ? 32 : 30),
                resizeMode: 'contain',
                marginLeft: perfectSize(41),
                tintColor: props.isMenuLanguageFocused
                  ? Colors.PRIMARY_COLOR
                  : Colors.SETTINGS_INACTIVE_ICON_COLOR,
              }}
              source={Images.LANGUAGE_ICON}
            />
            <View
              style={{
                marginLeft: perfectSize(41),
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Regular,
                  fontSize: perfectSize(props.isMenuLanguageFocused ? 29 : 24),
                  color: Colors.SETTINGS_ACTIVE_TEXT_COLOR,
                }}>
                {Strings.SELECT_LANGUAGE}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Regular,
                  fontSize: perfectSize(props.isMenuLanguageFocused ? 18 : 16),
                  color: Colors.SETTINGS_ACTIVE_TEXT_COLOR,
                }}>
                {Strings.SELECT_LANGUAGE_DESCRIPTION}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onFocus={() => props.onFocusLogoutMenuAction()}
        onBlur={() => props.onBlurLogoutMenuAction()}
        onPress={() => props.onFocusLogoutMenuAction()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ImageBackground
            style={{
              width: perfectSize(550),
              height: perfectSize(170),
              resizeMode: 'contain',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            source={
              props.isMenuLogoutFocused
                ? Images.SETTINGS_SELECTED_BG_IMAGE
                : Images.TRANSPARENT_IMAGE
            }>
            <Image
              style={{
                width: perfectSize(props.isMenuLogoutFocused ? 32 : 30),
                height: perfectSize(props.isMenuLogoutFocused ? 32 : 30),
                resizeMode: 'contain',
                marginLeft: perfectSize(41),
                tintColor: props.isMenuLogoutFocused
                  ? Colors.PRIMARY_COLOR
                  : Colors.SETTINGS_INACTIVE_ICON_COLOR,
              }}
              source={Images.LOGOUT_ICON}
            />
            <View
              style={{
                marginLeft: perfectSize(41),
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Regular,
                  fontSize: perfectSize(props.isMenuLogoutFocused ? 29 : 24),
                  color: Colors.SETTINGS_ACTIVE_TEXT_COLOR,
                }}>
                {Strings.LOGOUT}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Regular,
                  fontSize: perfectSize(props.isMenuLogoutFocused ? 18 : 16),
                  color: Colors.SETTINGS_ACTIVE_TEXT_COLOR,
                }}>
                {Strings.LOGOUT_DESCRIPTION}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableHighlight>
    
    </View>
  </View>
);

export default LeftViewComponent;

const styles = StyleSheet.create({});
