import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Switch,
  ScrollView,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors, Fonts, Globals, Images, Strings} from '../../constants';
import LoadingIndicator from '../shared/loadingIndicator/LoadingIndicator';
import StorageManager from '../../helpers/storage/StorageManager';
import TVPointItem from '../settings/TVPointItem';

import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import APIConnection from '../../helpers/api/APIConnection';
import DataManager from '../../helpers/api/DataManager';
import Utils from '../../helpers/utils/Utils';
let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
export default function SettingsScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [tvPointList, setTvPointList] = useState([]);

  useEffect(() => {
    StorageManager.getSavedIsSplitScreenEnabled().then(res => {
      console.log();
      if (res === true) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    });
    getTVPointsList();
    console.log('route?.params', route?.params);
  }, []);

  const isAnyPointSelected = () => {
    for (let i = 0; i < tvPointList.length; i++) {
      if (tvPointList[i].isSelectedItem === true) {
        return true;
      }
    }
    return false;
  };

  //Button actions
  const backAction = () => {
    if (Platform.OS === 'windows') {
      if (Globals.IS_SPLIT_TOKEN_SCREEN === true) {
        navigation.reset({
          index: 0,
          routes: [{name: 'TokenStatusDoubleScreen'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'TokenStatusScreen'}],
        });
      }
    } else {
      navigation.goBack();
    }
  };

  const cancelAction = () => {
    if (Platform.OS === 'windows') {
      if (Globals.IS_SPLIT_TOKEN_SCREEN === true) {
        navigation.reset({
          index: 0,
          routes: [{name: 'TokenStatusDoubleScreen'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'TokenStatusScreen'}],
        });
      }
    } else {
      navigation.goBack();
    }
  };

  const saveAction = () => {
    //Check is there any item selected
    if (isAnyPointSelected() === true) {
      for (let i = 0; i < tvPointList.length; i++) {
        if (tvPointList[i].isSelectedItem === true) {

      
          StorageManager.saveSelectedTVPoint(tvPointList[i]);
          StorageManager.saveIsSplitScreenEnabled(isEnabled);
          Globals.IS_SPLIT_TOKEN_SCREEN = isEnabled;
          Globals.SAVED_TV_POINT_DETAILS = tvPointList[i];

          //Navigate to token page
          if (isEnabled === true) {
            navigation.reset({
              index: 0,
              routes: [{name: 'TokenStatusDoubleScreen'}],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: 'TokenStatusScreen'}],
            });
          }
          return;
        }
      }
    } else {
      Utils.showToast(
        'Sorry!',
        Strings.PLEASE_SELECT_TV_POINT,
        'error',
        'bottom',
      );
      if (Platform.OS === 'windows') {
        setTimeout(() => {
          Utils.hideToast();
        }, 3000);
      }
    }
  };

  //API calls
  const getTVPointsList = () => {
    let url = APIConnection.BASE_URL + APIConnection.ENDPOINTS.TV_POINTS_LIST;
    setIsLoading(true);
    DataManager.getUserDetails(url).then(
      ([isSuccess, message, responseData]) => {
        console.log('getTVPointsList isSuccess: ', isSuccess);
        console.log('getTVPointsList MSG: ', message);
        console.log('getTVPointsList DATA: ', responseData);

        if (isSuccess === true) {
          if (responseData !== undefined && responseData !== null) {
            var responseTVPoints = responseData?.objects;
            //Check if already selected a point
            StorageManager.getSavedSelectedTVPoint().then(res => {
              console.log('getSavedSelectedTVPoint: ', res);
              if (
                res !== null &&
                res !== undefined &&
                responseTVPoints?.length > 0
              ) {
                for (let i = 0; i < responseTVPoints?.length; i++) {
                  if (responseTVPoints[i]._id === res?._id) {
                    console.log('responseTVPoints Saved: ', res?._id);
                    responseTVPoints[i].isSelectedItem = true;
                  }
                }
              }
              setTvPointList(responseTVPoints);
              setIsLoading(false);
            });
          }
        } else {
          Utils.showToast('Failed!', message, 'error', 'bottom');
          if (Platform.OS === 'windows') {
            setTimeout(() => {
              Utils.hideToast();
            }, 3000);
          }
          setIsLoading(false);
        }
      },
    );
  };

  //Child callback
  const didSelectedTVPoint = index => {
    console.log('didSelectedTVPoint: ', index);

    let newArr = [...tvPointList]; // copying the old tvPointList array
    for (let i = 0; i < newArr?.length; i++) {
      newArr[i].isSelectedItem = false;
    }
    newArr[index].isSelectedItem = true; // update new value
    setTvPointList(newArr);
  };

  return (
    <View style={styles.container}>
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

      {/* Top Bar */}
      <View style={styles.topBar}>
        {route?.params?.isFromLogin === false ? (
          <TouchableOpacity
            onPress={() => backAction()}
            style={styles.topBarBackView}>
            <Image
              style={[styles.topBarBackImage, {tintColor: Colors.WHITE_COLOR}]}
              source={Images.BACK_IMAGE}
            />
          </TouchableOpacity>
        ) : null}

        <Text style={styles.topBarTitle}>Settings</Text>
      </View>

      <View style={{flex: 1, backgroundColor: Colors.BACKGROUND_COLOR}}>
        <Text style={[styles.splitScreenTitle, {marginTop: perfectSize(40)}]}>
          Split Screen
        </Text>
        <Text style={[styles.splitScreenDescription]}>
          If it is enabled screen will be divided into two and show two
          consultants token status.
        </Text>
        <Switch
          style={{
            position: 'absolute',
            right: perfectSize(300),
            top: perfectSize(80),
          }}
          trackColor={{false: '#767577', true: Colors.SECONDARY_COLOR}}
          thumbColor={isEnabled ? Colors.PRIMARY_COLOR : '#f4f3f4'}
          ios_backgroundColor={
            Platform.OS === 'windows' ? 'transparent' : '#3e3e3e'
          }
          onValueChange={toggleSwitch}
          value={isEnabled}
        />

        <Text style={[styles.splitScreenTitle, {marginTop: perfectSize(20)}]}>
          Select TV Point
        </Text>

        <ScrollView horizontal style={styles.tvPointsRow}>
          {tvPointList.map((item, i) => (
            <TVPointItem
              key={i}
              itemIndex={i}
              isSelectedItem={item.isSelectedItem || false}
              title={item.name}
              consultants={item.consultants}
              hasTVPreferredFocus={i === 0}
              blockFocusRight={i === tvPointList.length - 1}
              onSelectTVPoint={didSelectedTVPoint}
            />
          ))}
        </ScrollView>

        <View
          style={{
            height: perfectSize(60),
            flexDirection: 'row',
            marginTop: perfectSize(40),
            marginBottom: perfectSize(40),
            alignSelf: 'center',
          }}>
          {route?.params?.isFromLogin === false ? (
            <TouchableHighlight
              underlayColor={Colors.BLACK_COLOR}
              style={[
                styles.saveButton,
                {backgroundColor: Colors.PRIMARY_COLOR},
              ]}
              onPress={() => cancelAction()}>
              <Text style={styles.saveButtonText}>Cancel</Text>
            </TouchableHighlight>
          ) : null}
          <TouchableHighlight
            underlayColor={Colors.BLACK_COLOR}
            style={[
              styles.saveButton,
              {marginLeft: perfectSize(40)},
              {backgroundColor: Colors.SECONDARY_COLOR},
            ]}
            onPress={() => saveAction()}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableHighlight>
        </View>
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarCopyLeftText}>Copyright 2021</Text>
        <View style={styles.bottomBarRightLogo}>
          <Text style={styles.bottomBarCopyRightText}>Powered by</Text>
          <Image
            style={styles.bottomBarRightLogoImage}
            source={Images.YWAIT_SMALL_LOGO}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  topBar: {
    flexDirection: 'row',
    marginLeft: perfectSize(0),
    marginRight: perfectSize(0),
    height: perfectSize(127),
    backgroundColor: '#000000',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //alignContent: 'center',
  },
  topBarBackView: {
    marginLeft: perfectSize(8),
    width: perfectSize(55),
    height: perfectSize(101),
    //backgroundColor: 'clear',
    justifyContent: 'center',
  },
  topBarBackImage: {
    marginTop: perfectSize(-8),
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  topBarTitle: {
    color: Colors.WHITE_COLOR,
    marginLeft: perfectSize(18),
    fontFamily: Fonts.Poppins_Medium,
    fontSize: perfectSize(40),
  },

  splitScreenTitle: {
    color: Colors.PRIMARY_TEXT_COLOR,
    marginLeft: perfectSize(130),
    fontFamily: Fonts.Poppins_Regular,
    fontSize: perfectSize(35),
  },
  splitScreenDescription: {
    color: Colors.PLACEHOLDER_COLOR,
    marginTop: perfectSize(8),
    marginLeft: perfectSize(130),
    fontFamily: Fonts.Poppins_Regular,
    fontSize: perfectSize(25),
  },
  bottomBar: {
    width: '100%',
    height: '5%',
    backgroundColor: '#000000',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
  },
  bottomBarCopyLeftText: {
    color: '#FFFFFF',
    marginLeft: perfectSize(64),
    fontFamily: Fonts.Poppins_Regular,
    fontSize: perfectSize(10),
  },
  bottomBarCopyRightText: {
    color: '#FFFFFF',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: perfectSize(10),
    alignSelf: 'center',
    marginTop: perfectSize(6),
  },
  bottomBarRightLogo: {
    position: 'absolute',
    right: perfectSize(30),
    height: '70%',
    width: '12%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bottomBarRightLogoImage: {
    marginLeft: perfectSize(5),
    width: perfectSize(40),
    height: '80%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  tvPointsRow: {
    marginTop: perfectSize(8),
    marginLeft: perfectSize(120),
    marginRight: perfectSize(120),
    marginBottom: perfectSize(20),
  },

  saveButton: {
    marginBottom: 30,
    height: perfectSize(80),
    width: perfectSize(300),
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: Colors.WHITE_COLOR,
    fontFamily: Fonts.Poppins_Regular,
    fontSize: perfectSize(24),
    alignSelf: 'center',
  },
});
