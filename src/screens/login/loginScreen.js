import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Keyboard,
  ImageBackground,
  Platform,
} from 'react-native';

import {Colors, Fonts, Globals, Images} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import Utils from '../../helpers/utils/Utils';
import APIConnection from '../../helpers/api/APIConnection';
import DataManager from '../../helpers/api/DataManager';
import StorageManager from '../../helpers/storage/StorageManager';
import LoadingIndicator from '../shared/loadingIndicator/LoadingIndicator';
import {BUILD_SOURCE} from '../../enums/Enums';
import LogoComponent from './LogoComponent';
import BusinessImageHolder from '../../componets/BusinessImageHolder';
import {
  MenuActions,
  TvPointActions,
  VoiceLanguageActions,
  LanguageActions,
} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);

const LoginScreen = () => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const [businessDetails, setBusinessDetails] = useState();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidate, setEmailValidate] = useState('');
  const [passwordValidate, setPasswordValidate] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [enableLoginButton, setEnableLoginButton] = useState(false);
  const {isRTL} = useSelector(state => state.AlignmentState);
  useEffect(() => {
    StorageManager.getSavedBusinessDetails().then(details => {
      setBusinessDetails(details);
    });
  }, []);

  const validateInputs = () => {
    Keyboard.dismiss();

    var isValidEmail = 0;
    var isValidPassword = 0;
    if (email.length === 0 || email === '' || email === null) {
      setEmailValidate(t(Translations.NEED_A_EMAIL));
      isValidEmail = 0;
    } else {
      if (Utils.isEmailValid(email) !== true) {
        setEmailValidate(t(Translations.ENTER_VALID_EMAIL));
        isValidEmail = 0;
      } else {
        setEmailValidate('');
        isValidEmail = 1;
      }
    }

    if (password === null || password === '' || password.length === 0) {
      setPasswordValidate(t(Translations.NEED_A_PASSWORD));
      isValidPassword = 0;
    } else if (password.includes(' ')) {
      setPasswordValidate(t(Translations.WHITE_SPACE_NOT_ALLOWED));
      isValidPassword = 0;
    } else {
      setPasswordValidate('');
      isValidPassword = 1;
    }
    if (isValidEmail === 1 && isValidPassword === 1) {
      // console.log('API Called..');
      performLogin();
    }
  };

  const loginButtonAction = () => {
    validateInputs();
  };

  const performLogin = () => {
    setIsLoading(true);
    let url = APIConnection.BASE_URL + APIConnection.ENDPOINTS.LOGIN;
    const body = {
      [APIConnection.KEYS.USERNAME]: email,
      [APIConnection.KEYS.PASSWORD]: password,
      [APIConnection.KEYS.BUSINESS_ID]: Globals.BUSINESS_ID,
    };
    DataManager.performLogin(url, body).then(([isSuccess, message, data]) => {
      if (isSuccess === true) {
        if (data !== undefined && data !== null) {
          Globals.USER_DETAILS = data.objects;
          StorageManager.saveUserDetails(data.objects);
          Globals.IS_AUTHORIZED = true;
          getAuthToken().then(token => {
            Globals.TOKEN = token;
            getUserDetails();
          });

          //Utils.showToast('Success!', message, 'success', 'bottom');
        } else {
          setIsLoading(false);
        }
      } else {
        Utils.showToast(t(Translations.FAILED), message, 'error', 'bottom');

        if (Platform.OS === 'windows') {
          setTimeout(() => {
            Utils.hideToast();
          }, 3000);
        }
        setIsLoading(false);
      }
    });
  };

  const getUserDetails = () => {
    let url =
      APIConnection.BASE_URL +
      APIConnection.ENDPOINTS.USER_DETAILS +
      Globals.USER_DETAILS._id;
    DataManager.getUserDetails(url).then(
      ([isSuccess, message, responseData]) => {
        if (isSuccess === true) {
          if (responseData !== undefined && responseData !== null) {
            setIsLoading(false);
            Globals.USER_DETAILS = responseData.objects;
            StorageManager.saveUserDetails(responseData.objects);
            Globals.IS_AUTHORIZED = true;

            if (
              responseData?.objects?.role_id?.isAdmin === true &&
              responseData?.objects?.role_id?.key === 'TV Admin'
            ) {
              if (Globals.IS_SINGLE_CONSULTANT_BUSINESS === true) {
                //Check single consultant business
                //Navigate to single TokenStatusScreen
                Globals.IS_SPLIT_TOKEN_SCREEN = false;
                Globals.IS_TV_POINT_SELECTED = false;
                dispatch(MenuActions.selectTvMenu(true));
                dispatch(MenuActions.selectTvOption(false));
                dispatch(MenuActions.selectSettingsOption(true));
                dispatch(MenuActions.selectTvPointOption(true));
                dispatch(MenuActions.selectLogoutMenu(false));
                dispatch(MenuActions.selectLogoutSettings(false));
                dispatch(TvPointActions.setIsTvItemSelected(false));
                dispatch(VoiceLanguageActions.disableSpeak(false));
                dispatch(VoiceLanguageActions.selectNoneOption(false));
                dispatch(
                  LanguageActions.setDummyLanguageList([
                    {
                      id: '123456',
                      title: 'English',
                      languageCode: 'en-US',
                      region: 'United States',
                    },
                  ]),
                );
                dispatch(
                  LanguageActions.setDummyLanguageList([
                    {
                      id: '123456',
                      title: 'English',
                      languageCode: 'en-US',
                      region: 'United States',
                    },
                  ]),
                );
                console.log(' <><><><><>single consultant');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                });
              } else {
                //Navigate to Settings page
                console.log('<><><><>not single consultant');
                Globals.IS_SPLIT_TOKEN_SCREEN = true;
                Globals.IS_TV_POINT_SELECTED = false;
                dispatch(MenuActions.selectTvMenu(true));
                dispatch(MenuActions.selectTvOption(false));
                dispatch(MenuActions.selectSettingsOption(true));
                dispatch(MenuActions.selectTvPointOption(true));
                dispatch(MenuActions.selectLogoutMenu(false));
                dispatch(MenuActions.selectLogoutSettings(false));
                dispatch(TvPointActions.setIsTvItemSelected(false));
                dispatch(VoiceLanguageActions.disableSpeak(false));
                dispatch(VoiceLanguageActions.selectNoneOption(false));
                dispatch(
                  LanguageActions.setDummyLanguageList([
                    {
                      id: '123456',
                      title: 'English',
                      languageCode: 'en-US',
                      region: 'United States',
                    },
                  ]),
                );
                dispatch(
                  LanguageActions.setDummyLanguageList([
                    {
                      id: '123456',
                      title: 'English',
                      languageCode: 'en-US',
                      region: 'United States',
                    },
                  ]),
                );
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Home',
                      params: {isFromLogin: true},
                    },
                  ],
                });
              }
            } else {
              Utils.showToast(
                t(Translations.FAILED),
                t(Translations.LOGIN_FAIL_MSG),
                'error',
                'bottom',
              );
              logout();
            }
          }
        } else {
          Utils.showToast(t(Translations.FAILED), message, 'error', 'bottom');
          if (Platform.OS === 'windows') {
            setTimeout(() => {
              Utils.hideToast();
            }, 3000);
          }
        }
      },
    );
  };

  const getAuthToken = async () => {
    return await StorageManager.getSavedToken();
  };

  const checkSpace = txt => {
    if (txt.includes(' ')) {
      if (Platform.OS === 'windows') {
        setPassword(txt);
        setEnableLoginButton(false);
        setPasswordValidate(t(Translations.WHITE_SPACE_NOT_ALLOWED));
      } else {
        setPassword(txt.trim());
        setEnableLoginButton(true);
      }
    } else {
      setPassword(txt);
      setPasswordValidate('');
      setEnableLoginButton(true);
    }
  };
  const logout = () => {
    StorageManager.ClearUserRelatedData();
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.BACKGROUND_COLOR,
        flexDirection: isRTL ? 'row-reverse' : 'row',
      }}>
      <LoadingIndicator
        visible={isLoading}
        textContent={'Please wait...'}
        textStyle={{
          fontFamily: Fonts.Poppins_Regular,
          fontSize: 14,
          color: '#000',
        }}
        color={Colors.PRIMARY_COLOR}
      />

      {Globals.CUSTOM_BUILD_SOURCE !== BUILD_SOURCE.YWAIT ? (
        <View
          style={{
            flex: 1,
            flexDirection: isRTL ? 'row-reverse' : 'row',
            backgroundColor: Colors.SECONDARY_COLOR,
          }}>
          <LogoComponent />
          <View style={styles.rightView}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <BusinessImageHolder businessDetails={businessDetails} />
              <Text
                style={[
                  styles.businessNameText,
                  {
                    color: businessDetails
                      ? businessDetails.secondaryColor || Colors.SECONDARY_COLOR
                      : Colors.SECONDARY_COLOR,
                  },
                ]}>
                {businessDetails ? businessDetails.name : ''}
              </Text>

              <TouchableOpacity
                onFocus={() => {
                  emailRef && emailRef.current.focus();
                }}>
                <TextInput
                  ref={emailRef}
                  spellCheck={false}
                  autoCorrect={false}
                  value={email}
                  style={[
                    styles.emailInput,
                    {borderWidth: perfectSize(isEmailFocused ? 3 : 1)},
                    {marginTop: perfectSize(40)},
                    {
                      borderColor: isEmailFocused
                        ? businessDetails?.primaryColor || Colors.PRIMARY_COLOR
                        : businessDetails?.secondaryColor ||
                          Colors.SECONDARY_COLOR,
                      textAlign: isRTL ? 'right' : 'left',
                      paddingRight: isRTL ? perfectSize(15) : undefined,
                    },
                  ]}
                  placeholderTextColor={Colors.PLACEHOLDER_COLOR}
                  placeholder={t(Translations.EMAIL)}
                  keyboardType={'email-address'}
                  onChangeText={text => setEmail(text.trim())}
                  onSubmitEditing={() => {
                    passwordRef.current.focus();
                  }}
                  onFocus={() => {
                    setIsEmailFocused(true);
                  }}
                  onBlur={() => {
                    setIsEmailFocused(false);
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.validationText}>{emailValidate}</Text>

              <TouchableOpacity
                onFocus={() => {
                  passwordRef && passwordRef.current.focus();
                }}>
                <TextInput
                  ref={passwordRef}
                  spellCheck={false}
                  autoCorrect={false}
                  value={password}
                  style={[
                    styles.emailInput,
                    {borderWidth: perfectSize(isPasswordFocused ? 3 : 1)},
                    {
                      borderColor: isPasswordFocused
                        ? businessDetails?.primaryColor || Colors.PRIMARY_COLOR
                        : businessDetails?.secondaryColor ||
                          Colors.SECONDARY_COLOR,
                      textAlign: isRTL ? 'right' : 'left',
                      paddingRight: isRTL ? perfectSize(15) : undefined,
                    },
                  ]}
                  placeholderTextColor={Colors.PLACEHOLDER_COLOR}
                  placeholder={t(Translations.PASSWORD)}
                  secureTextEntry={true}
                  onChangeText={text => checkSpace(text)}
                  onSubmitEditing={() => {
                    validateInputs();
                  }}
                  onFocus={() => {
                    setIsPasswordFocused(true);
                  }}
                  onBlur={() => {
                    setIsPasswordFocused(false);
                  }}
                />
              </TouchableOpacity>

              <Text style={styles.validationText}>{passwordValidate}</Text>
              <TouchableHighlight
                underlayColor={
                  businessDetails?.primaryColor || Colors.PRIMARY_COLOR
                }
                style={[
                  styles.loginButton,
                  {
                    backgroundColor:
                      enableLoginButton === false
                        ? 'gray'
                        : businessDetails?.secondaryColor ||
                          Colors.SECONDARY_COLOR,
                  },
                ]}
                onPress={() => loginButtonAction()}>
                <Text style={styles.loginButtonText}>
                  {t(Translations.LOGIN)}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      ) : (
        <ImageBackground
          source={Images.LOGIN_BACKGROUND_IMAGE}
          style={{flex: 1}}>
          <View style={styles.rightView}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <BusinessImageHolder businessDetails={businessDetails} />
              <Text
                style={[
                  styles.businessNameText,
                  {
                    color: businessDetails
                      ? businessDetails.secondaryColor || Colors.SECONDARY_COLOR
                      : Colors.SECONDARY_COLOR,
                  },
                ]}>
                {businessDetails ? businessDetails.name : ''}
              </Text>
              <TouchableOpacity
                onFocus={() => {
                  emailRef && emailRef.current.focus();
                }}>
                <TextInput
                  ref={emailRef}
                  spellCheck={false}
                  autoCorrect={false}
                  value={email}
                  style={[
                    styles.emailInput,
                    {borderWidth: perfectSize(isEmailFocused ? 3 : 1)},
                    {marginTop: perfectSize(40)},
                    {
                      borderColor: isEmailFocused
                        ? businessDetails?.primaryColor || Colors.PRIMARY_COLOR
                        : businessDetails?.secondaryColor ||
                          Colors.SECONDARY_COLOR,
                      textAlign: isRTL ? 'right' : 'left',
                      paddingRight: isRTL ? perfectSize(15) : undefined,
                    },
                  ]}
                  placeholderTextColor={Colors.PLACEHOLDER_COLOR}
                  placeholder={t(Translations.EMAIL)}
                  keyboardType={'email-address'}
                  onChangeText={text => setEmail(text.trim())}
                  onSubmitEditing={() => {
                    passwordRef.current.focus();
                  }}
                  onFocus={() => {
                    setIsEmailFocused(true);
                  }}
                  onBlur={() => {
                    setIsEmailFocused(false);
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.validationText}>{emailValidate}</Text>
              <TouchableOpacity
                onFocus={() => {
                  passwordRef && passwordRef.current.focus();
                }}>
                <TextInput
                  ref={passwordRef}
                  spellCheck={false}
                  autoCorrect={false}
                  value={password}
                  style={[
                    styles.emailInput,
                    {borderWidth: perfectSize(isPasswordFocused ? 3 : 1)},
                    {
                      borderColor: isPasswordFocused
                        ? businessDetails?.primaryColor || Colors.PRIMARY_COLOR
                        : businessDetails?.secondaryColor ||
                          Colors.SECONDARY_COLOR,
                      textAlign: isRTL ? 'right' : 'left',
                      paddingRight: isRTL ? perfectSize(15) : undefined,
                    },
                  ]}
                  placeholderTextColor={Colors.PLACEHOLDER_COLOR}
                  placeholder={t(Translations.PASSWORD)}
                  secureTextEntry={true}
                  onChangeText={text => checkSpace(text)}
                  onSubmitEditing={() => {
                    validateInputs();
                  }}
                  onFocus={() => {
                    setIsPasswordFocused(true);
                  }}
                  onBlur={() => {
                    setIsPasswordFocused(false);
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.validationText}>{passwordValidate}</Text>
              <TouchableHighlight
                underlayColor={
                  businessDetails?.primaryColor || Colors.PRIMARY_COLOR
                }
                style={[
                  styles.loginButton,
                  {
                    backgroundColor:
                      enableLoginButton === false
                        ? 'gray'
                        : businessDetails?.secondaryColor ||
                          Colors.SECONDARY_COLOR,
                  },
                ]}
                onPress={() => loginButtonAction()}>
                <Text style={styles.loginButtonText}>
                  {t(Translations.LOGIN)}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leftView: {
    flex: 0.7,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  rightView: {
    position: 'absolute',
    width: '33%',
    top: perfectSize(82),
    bottom: perfectSize(82),
    right: perfectSize(204),
    backgroundColor: Colors.WHITE_COLOR,
    borderColor: Colors.BORDER_COLOR,
    borderWidth: perfectSize(1),
    borderRadius: perfectSize(4),
    //Shadow props
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: perfectSize(1)},
    shadowOpacity: 0.8,
    shadowRadius: perfectSize(6),
    elevation: 6,
  },
  leftLogoImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    // resizeMode: 'contain',
  },

  businessNameText: {
    marginTop: perfectSize(20),
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: perfectSize(30),
    alignSelf: 'center',
  },
  emailInput: {
    color: Colors.BLACK_COLOR,
    padding: perfectSize(0),
    margin: perfectSize(10),
    paddingTop: perfectSize(Platform.OS === 'windows' ? 20 : 0),
    marginTop: perfectSize(Platform.OS === 'windows' ? 30 : 10),
    // paddingHorizontal: perfectSize(10),
    // paddingVertical: perfectSize(25),
    paddingLeft: perfectSize(16),

    // height: perfectSize(65),
    width: '70%',
    borderWidth: perfectSize(1),
    //borderColor: Colors.VIOLET_COLOR,
    borderRadius: perfectSize(4),
    fontFamily: Fonts.Poppins_Regular,
    fontSize: perfectSize(25),
    alignSelf: 'center',
    backgroundColor: Colors.WHITE_COLOR,
  },
  validationText: {
    marginTop: perfectSize(5),
    color: Colors.RED_COLOR,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: perfectSize(16),
    alignSelf: 'center',
  
  },
  loginButton: {
    marginTop: perfectSize(40),
    height: perfectSize(46),
    width: perfectSize(141),
    //backgroundColor: Colors.VIOLET_COLOR,
    borderRadius: perfectSize(0),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: Colors.WHITE_COLOR,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: perfectSize(16),
    alignSelf: 'center',
    textAlign: 'left',
  },
});

export default LoginScreen;
