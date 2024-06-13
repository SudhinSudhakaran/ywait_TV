/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, View, Platform, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {Globals, Colors, Fonts, Images} from '../constants';
import {PixelRatio, Dimensions} from 'react-native';
import {create} from 'react-native-pixel-perfect';
import {useFocusEffect} from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SingleServingUserFilledView from './SingleServingUserFilledView';
import Tts from 'react-native-tts';
import MultipleServingUserSplitView from './MultipleServingUserSplitView';
import {useSelector} from 'react-redux';
import Utils from '../helpers/utils/Utils';
import {speak} from '../helpers/speak/Speak';
import Translations from '../constants/Translations';
import {t} from 'i18next';
import {useEffect} from 'react';

let displayProps = {
  width: PixelRatio.roundToNearestPixel(
    Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
  ),
  height: PixelRatio.roundToNearestPixel(
    Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
  ),
};
let perfectSize = create(displayProps);
const {width: windowWidth} = Dimensions.get('window');
const SplitScreenCarousel = props => {
  const mainCarouselRef = useRef(null);
  const {isRTL} = useSelector(state => state.AlignmentState);
  const {isSpeakDisabled} = useSelector(state => state.VoiceLanguageState);
  const {selectedLanguageList} = useSelector(state => state?.LanguageState);

  const [index, setIndex] = useState(0);

  const [isFirstTime, setIsFirstTime] = useState(true);
  const [refresh, setRefresh] = useState(false);
  // const tokenSound =
  //   Platform.OS !== 'windows'
  //     ? require('../../assets/audios/tokenSound.mp3')
  //     : {uri: 'ms-appx:///Assets/tokenSound.mp3'};
  const tokenSound = require('../../assets/audios/tokenSound.mp3');
  // const sound = new Sound(
  //   require('../../assets/audios/tokenSound.mp3'),
  //   Sound.MAIN_BUNDLE,
  //   (error) => {
  //     if (error) {
  //       console.log('failed to load the sound', error);
  //     } else {
  //       console.log('loaded sound successfully');
  //     }
  //   }
  // );

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        Tts.stop();
      };
    }, []),
  );
  useEffect(() => {
    // Sound.setCategory('Ambient');

    return () => {};
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      itemSpeak(0);

      return () => {};
    }, [isFirstTime]),
  );
  useFocusEffect(
    React.useCallback(() => {
      // mainCarouselRef.current.triggerRenderingHack();
      setRefresh(!refresh);
      // if (
      //   Globals.PREVIOUS_SPLIT_SCREEN_DATA_LENGTH <= 1 &&
      //   props.pageItems.length > 1
      // ) {
      //   console.log(
      //     'Globals.PREVIOUS_SPLIT_SCREEN_DATA_LENGTH',
      //     Globals.PREVIOUS_SPLIT_SCREEN_DATA_LENGTH,
      //   );
      //   itemSpeak(1);
      // }
      return () => {};
    }, [props.pageItems]),
  );

  if (isFirstTime === true) {
    // console.log('inside first time');

    setIsFirstTime(false);
  }

  /**
   * Purpose: render the screen for each item
   * Created/Modified By: Sudhin Sudhakaran
   * Created/Modified Date:2 May 2023 }
   * Steps:
   * 1.   check  isOdd key and and render singleServingUserFilledView if it is true and item is last in the data
   * 2.
   * 3.
   */
  const renderMainCenterCarousel = ({item, index}) => {
    //  console.log('renderMainCenterCarousel=======<><><><>', item);

    /**
     * Purpose: render the screen for each item
     * Created/Modified By: Sudhin Sudhakaran
     * Created/Modified Date:2 May 2023 }
     * Steps:
     * 1.   check  isOdd key and and render singleServingUserFilledView if it is true and item is last in the data
     * 2.
     * 3.
     */
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: perfectSize(80),
        }}>
        {props.isOdd === true && index === props.pageItems.length - 1 ? (
          <SingleServingUserFilledView
            item={item}
            leftServingList={item?.leftServingList}
            leftArrivedCustomerListTop={
              item?.leftArrivedLis ? item?.leftArrivedList.slice(0, 8) : []
            }
            leftArrivedCustomerListBottom={
              item?.leftArrivedList ? item?.leftArrivedList.slice(8, 100) : []
            }
            subIndex={index}
            // arrivedList={[]}
          />
        ) : (
          <MultipleServingUserSplitView item={item} subIndex={index} />
        )}
      </View>
    );
  };

  /**
   * Purpose: Speak function
   * Created/Modified By: Sudhin Sudhakaran
   * Created/Modified Date: 02-05-2023
   * Steps:
   * 1.   Check the length of pageItems
   * 2.   Select the selected item by using passed index (_i)
   * 3.   Save right and left consultant name
   * 4.   Add space in each token number
   */
  const itemSpeak = _i => {
    // console.log('Item speak called- passed index is', _i);
    // Tts.setDefaultLanguage(selectedLanguageList[0].languageCode);

    let __refresh;
   
    // Step:1
    if (props.pageItems.length > 1) {
      //   clearInterval(__refresh);
      //   // Step:2
      let item = props?.pageItems?.[_i];
      //   // Step :3
      let leftConsultantName = Utils.configConsultantName(
        item?.leftServingUserDetails?.name || '   ',
      );
      let rightConsultantName = Utils.configConsultantName(
        item?.rightServingUserDetails?.name || '   ',
      );
      let leftRoomNo = '';
      if (
        item?.leftServingUserDetails?.roomNumber !== '' &&
        item?.leftServingUserDetails?.roomNumber !== undefined
      ) {
        leftRoomNo = Utils.addSpace(item?.leftServingUserDetails?.roomNumber);
      }
      let rightRoomNo = '';
      if (
        item?.rightServingUserDetails?.roomNumber !== undefined &&
        item?.rightServingUserDetails?.roomNumber != ''
      ) {
        rightRoomNo = Utils.addSpace(item?.rightServingUserDetails?.roomNumber);
      }

      let _leftServingList = item?.leftServingList || [];
      let _rightServingList = item?.rightServingList || [];

      Globals.PREVIOUS_SPLIT_SCREEN_TOKENS_LIST[_i].leftServingUserDetails =
        _leftServingList;
      Globals.PREVIOUS_SPLIT_SCREEN_TOKENS_LIST[_i].rightServingUserDetails =
        _rightServingList;
      let speakText = '';
      let isNewLeftData = _leftServingList.filter(d => d?.isNew === true);
      let isNewRightData = _rightServingList.filter(d => d?.isNew === true);
      // console.log('.................._i', _i, item);
      let leftTokenList = [];
      let rightTokenList = [];

      if (isNewLeftData?.length > 0) {
        isNewLeftData?.map(i => {
          const [letters, numbers] = i.token.match(/[A-Za-z]+|[0-9]+/g);
          const spacedLetters = letters.split('').join(' , '); // add spaces between letters
          let _t = `${spacedLetters},  ${numbers}`;

          // console.log('iiiiiiiiiiiii', i.token, _t);

          leftTokenList.push(_t);
        });
      }
      if (isNewRightData?.length > 0) {
        isNewRightData?.map(i => {
          const [letters, numbers] = i.token.match(/[A-Za-z]+|[0-9]+/g);
          const spacedLetters = letters.split('').join(' , '); // add spaces between letters
          let _t = `${spacedLetters},  ${numbers}`;

          // console.log('iiiiiiiiiiiii', i.token, _t);

          rightTokenList.push(_t);
        });
      }

      if (leftTokenList?.length > 0) {
        let leftSelectedValues = leftTokenList?.map(val => val);
        let leftSelectedValuesInString = leftSelectedValues.join('  ,     ');

        // console.log('selectedValuesInString', leftSelectedValuesInString);
        // var leftSpeakText = `Token number ${leftSelectedValuesInString} for ${
        //   leftConsultantName || 'doc'
        // }.`;
        var leftSpeakText = '';

        if (Globals.SPEAK_CONSULTANT_NAME === true) {
          leftSpeakText = `Token number ${leftSelectedValuesInString} for ${
            leftConsultantName || 'doc'
          }.`;
        } else {
          if (item?.leftServingUserDetails?.type === 'ROOM') {
            leftSpeakText = `Token number ${leftSelectedValuesInString} for room  ${item?.leftServingUserDetails?.name}.`;
          } else {
            leftSpeakText = `Token number ${leftSelectedValuesInString} for room number   ${leftRoomNo}.`;
          }
        }

        // console.log('speakText: ======> ', leftSpeakText);
      }

      if (rightTokenList?.length > 0) {
        let rightSelectedValues = rightTokenList?.map(val => val);
        let rightSelectedValuesInString = rightSelectedValues.join('  ,     ');

        // console.log('selectedValuesInString', rightSelectedValuesInString);
        // var rightSpeakText = `Token number ${rightSelectedValuesInString} for ${
        //   rightConsultantName || 'doc'
        // }.`;

        var rightSpeakText = '';
        if (Globals.SPEAK_CONSULTANT_NAME === true) {
          rightSpeakText = `Token number ${rightSelectedValuesInString} for ${
            rightConsultantName || 'doc'
          }.`;
        } else {
          if (item?.rightServingUserDetails.type === 'ROOM') {
            rightSpeakText = `Token number ${rightSelectedValuesInString} for  room  ${item?.rightServingUserDetails.name}.`;
          } else {
            rightSpeakText = `Token number ${rightSelectedValuesInString} for room number   ${rightRoomNo}.`;
          }
        }

        // console.log('speakText: ======> ', rightSpeakText);
      }

      // if (leftSpeakText !== undefined && rightSpeakText !== undefined) {
      //   speakText = `${leftSpeakText} '   and    ' ${rightSpeakText}`;
      //   _speak(speakText);
      // } else if (leftSpeakText !== undefined) {
      //   speakText = ` ${leftSpeakText}`;
      //   _speak(speakText);
      // } else if (rightSpeakText !== undefined) {
      //   speakText = `${rightSpeakText}`;
      //   _speak(speakText);
      // } else {
      //   if (props?.pageItems.length > 0) {
      //     if (Globals.PRACTO_BUILD === true) {
      //         scrollToNext();
      //     } else {
      //       scrollToNext();
      //     }
      //   }
      // }
      scrollToNext();
    } else {
      __refresh = setInterval(() => {
        console.log('Stucked');
        scrollToNext();
      }, 1000);
    }
  };

  /**
   * Purpose: function for tts
   * Created/Modified By: Sudhin Sudhakaran
   * Created/Modified Date: 2 May 2023}
   * Steps:
   * 1.   get the speck text
   * 2.   pass the text to tts.speak()
   * 3.   scroll to next after speak completed
   */
  async function _speak(_speakText) {
    if (isSpeakDisabled === false) {
      if (Globals.PRACTO_BUILD === true) {
        Tts.stop();
        // Load the sound file
        // sound.play((success) => {
        //   if (success) {
        //     console.log('audio file played successfully');
        //   } else {
        //     console.log('audio file playback failed');
        //   }
        // });
        Tts.removeEventListener('tts-finish', event =>
          console.log('one finish', event),
        );
        Tts.speak(_speakText);

        Tts.addEventListener('tts-finish', () => {
          console.log('Speech completed======================');
          if (Globals.PRACTO_BUILD === true) {
            scrollToNext();
          }
        });
      } else {
        speak(_speakText, selectedLanguageList)
          .then(res => {
            if (props?.pageItems.length > 0) {
              scrollToNext();
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    } else {
      if (props?.pageItems.length > 0) {
        scrollToNext();
      }
    }
  }

  const scrollToNext = () => {
    console.log('scroll function called');
    setTimeout(() => {
      if (mainCarouselRef && mainCarouselRef.current) {
        mainCarouselRef.current.snapToNext();
      } else {
        console.log('mainCarouselRef is undefined');
      }
    }, 8000);
  };

  Globals.PREVIOUS_SPLIT_SCREEN_DATA_LENGTH = props.pageItems.length;
  const EmptyComponent = () => {
    return (
      <View
        style={{
          marginLeft: perfectSize(800),
          alignItems: 'center',
          // alignContent: 'center',
          alignSelf: 'center',
          flex: 1,
        }}>
        <Image
          source={Images.NO_APPOINTMENT}
          style={{
            width: perfectSize(150),
            height: perfectSize(150),
            marginTop: perfectSize(100),
            tintColor: Colors.PRIMARY_COLOR,
            transform: [{scaleX: isRTL ? -1 : 1}],
          }}
        />
        <Text
          style={{
            alignSelf: 'center',
            color: Colors.SECONDARY_COLOR,
            fontFamily: Fonts.Poppins_SemiBold,
            textAlign: isRTL ? 'right' : 'left',
            fontSize: 20,
            // marginTop: perfectSize(-50),
          }}>
          {t(Translations.NO_APPOINMENT_TEXT)}
        </Text>
      </View>
    );
  };
  return (
    <>
      <View
        style={{
          // marginTop: perfectSize(8),
          flex: 1,

          marginBottom: perfectSize(Platform.OS === 'windows' ? 16 : 0),
          // backgroundColor:'red'
        }}>
        <Carousel
          ref={mainCarouselRef}
          // updateCellsBatchingPeriod={'100'}
          style={{transform: [{translateY: 0}]}}
          activeSlideOffset={2}
          enableMomentum={true}
          decelerationRate={0.9}
          shouldOptimizeUpdates={false}
          // inverted={isRTL ? true : false}
          // refreshControl={
          //   <RefreshControl refreshing={refresh} onRefresh={() => null} />
          // }
          listKey="Split_screen_carousel"
          keyExtractor={(mainItem, mainItemIndex) => mainItemIndex.toString()}
          sliderWidth={perfectSize(1920)}
          itemWidth={perfectSize(1920)} //enableMomentum={true}
          scrollEnabled={false}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          // autoplay={true}
          // autoplayInterval={20000} //10 sec
          onSnapToItem={slideIndex => {
            setIndex(slideIndex);
            console.log('onSnapToItem: ', slideIndex);
            itemSpeak(slideIndex);

            if (slideIndex === props?.pageItems?.length - 1) {
              setTimeout(() => {
                mainCarouselRef?.current?.snapToItem(0, true, true);
              }, 8000);
            }
          }}
          data={props?.pageItems || []}
          horizontal={true}
          renderItem={renderMainCenterCarousel}
          ListEmptyComponent={!props.isLoading ? EmptyComponent : null}
          // ListEmptyComponent={EmptyComponent()}
          // useScrollView={true}
        />

        <Pagination
          dotsLength={props?.pageItems.length}
          activeDotIndex={index}
          containerStyle={{
            position: 'absolute',
            bottom: perfectSize(-20),
            alignSelf: 'center',
            backgroundColor: 'transparent',
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
          dotStyle={{
            width: perfectSize(20),
            height: perfectSize(20),
            borderRadius: perfectSize(10),
            marginHorizontal: perfectSize(8),
            backgroundColor: Colors.PRIMARY_COLOR,
            // backgroundColor: 'red',
          }}
          inactiveDotStyle={{backgroundColor: Colors.SECONDARY_COLOR}}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </>
  );
};

export default SplitScreenCarousel;

const styles = StyleSheet.create({});
