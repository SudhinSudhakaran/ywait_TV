import {View, Platform, FlatList, Text} from 'react-native';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {create} from 'react-native-pixel-perfect';
import {PixelRatio, Dimensions} from 'react-native';
import {Colors, Globals} from '../constants';

import SingleTokenStatusItem from './SingleTokenStatusItem';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import Tts from 'react-native-tts';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/core';
import {speak} from '../helpers/speak/Speak';
import Utils from '../helpers/utils/Utils';

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

const CarouselComponent = props => {
  const {isRTL} = useSelector(state => state?.AlignmentState);
  const {isSpeakDisabled} = useSelector(state => state?.VoiceLanguageState);
  const {selectedLanguageList} = useSelector(state => state?.LanguageState);

  const [isFirstTime, setIsFirstTime] = useState(true);

  const [index, setIndex] = useState(0);

  const mainCarouselRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        Tts.stop();
      };
    }, []),
  );
  useEffect(() => {
    return () => {};
  }, [index]);

  useFocusEffect(
    React.useCallback(() => {
      itemSpeak(0);

      return () => {
        // Tts.stop();
      };
    }, [isFirstTime]),
  );

  let servingUserList = [];
  //  console.log('newPageItems in carousel', props?.pageItems);
  if (props?.pageItems?.length > 0) {
    //  console.log('single screen---------- page Item ', props.pageItems);
    // console.log('single screen---------- room Item ', props.roomItems);
    props?.pageItems?.map((data, indx) => {
      //  console.log('Data->', data)
      let oldData = Globals.PREVIOUS_TOKENS_LIST?.[indx];
      let listData = {...data};

      if (data?.servingList?.length > 0) {
        let __servingList = [];
        data?.servingList?.map((item, index) => {
          // console.log('item---', item?.token, oldData[index]?.token);
          let _servingListItem = {};
          _servingListItem = {...item};
          if (oldData?.[index]?.token === item?.token) {
            _servingListItem.isNew = false;
          } else {
            _servingListItem.isNew = true;
          }

          __servingList.push(_servingListItem);
        });

        listData.servingList = __servingList || [];
      }
      servingUserList.push(listData);
    });

    if (isFirstTime === true) {
      // console.log('inside first time');
      setIsFirstTime(false);
    }
  }

  const itemSpeak = async _i => {
    // console.log('Item speak function called', _i);
    scrollToNext();
    // let __refresh;
    // if (props.pageItems.length > 1) {
    //   clearInterval(__refresh);
    //   let item = servingUserList?.[_i];
    //   let consultantName = '';
    //   let roomNo = '';
    //   let _servingList = item?.servingList || [];
    //   Globals.PREVIOUS_TOKENS_LIST[_i] = _servingList;
    //   consultantName = Utils.configConsultantName(item?.name || '   ');
    //   if (item.roomNumber) {
    //     roomNo = Utils.addSpace(item?.roomNumber);
    //   }
    //   let isNewData = _servingList.filter(d => d?.isNew === true);
    //   let tokenList = [];
    //   if (isNewData?.length > 0) {
    //     isNewData?.map(i => {
    //       const [letters, numbers] = i.token.match(/[A-Za-z]+|[0-9]+/g);
    //       const spacedLetters = letters.split('').join(' , '); // add spaces between letters
    //       let _t = `${spacedLetters},  ${numbers}`;
    //       tokenList.push(_t);
    //     });
    //   }

    //   if (tokenList?.length > 0) {
    //     let selectedValues = tokenList.map(val => val);
    //     let selectedValuesInString = selectedValues.join('  ,     ');

    //     var _speakText = '';
    //     if (Globals.SPEAK_CONSULTANT_NAME === true) {
    //       _speakText = `Token number ${selectedValuesInString} for  ${
    //         consultantName || 'doc'
    //       }`;
    //     } else {
    //       if (item.type === 'ROOM') {
    //         _speakText = `Token number ${selectedValuesInString} for room   ${item?.name}`;
    //       } else {
    //         _speakText = `Token number ${selectedValuesInString} for room number   ${roomNo}`;
    //       }
    //     }

    //     if (isSpeakDisabled === false) {
    //       if (Globals.PRACTO_BUILD === true) {
    //         Tts.stop();
    //         Tts.removeEventListener('tts-finish', event =>
    //           console.log('one finish', event),
    //         );
    //         Tts.speak(_speakText);
    //         Tts.addEventListener('tts-finish', () => {
    //           console.log('Speech completed');
    //           if (Globals.PRACTO_BUILD === true) {
    //             scrollToNext();
    //           }
    //         });
    //       } else {
    //         speak(_speakText, selectedLanguageList)
    //           .then(res => {
    //             if (servingUserList?.length > 0) {
    //               scrollToNext();
    //             }
    //           })
    //           .catch(error => {
    //             console.error(error);
    //           });
    //       }
    //     } else {
    //       if (servingUserList?.length > 0) {
    //         scrollToNext();
    //       }
    //     }
    //   } else {

    //     if (servingUserList?.length > 0) {
    //       scrollToNext();
    //     }
    //   }
    // } else {
    //   /**
    //    * Purpose: calling the scroll function
    //    * Created/Modified By: Sudhin Sudhakaran
    //    * Created/Modified Date:2 May 2023 }
    //    * Steps:
    //    * 1.   call the  scroll function  if props.pageItems length is 1
    //    * 2.
    //    * 3.
    //    */
    //   __refresh = setInterval(() => {
    //     console.log('Stucked');
    //     scrollToNext();
    //   }, 1000);
    // }
  };
  /**
   * Purpose: Scroll to the next item
   * Created/Modified By: Sudhin Sudhakaran
   * Created/Modified Date: 2 May 2023}
   * Steps:
   * 1.   Check the ref and current are not undefined
   * 2.   call snapToNext function after 10 second
   * 3.
   */
  const scrollToNext = () => {
    // console.log('Scroll func called');
    if (mainCarouselRef && mainCarouselRef.current) {
      setTimeout(() => {
        mainCarouselRef?.current?.snapToNext();
      }, 8000);
    } else {
      console.log('mainCarouselRef is undefined');
    }
  };

  const renderItem = ({item, index}) => {
    //  console.log(' render item =>', item);
    let arrivedList = props?.pageItems[index].arrivedList || [];
    return (
      <SingleTokenStatusItem
        item={item}
        index={index}
        arrivedList={arrivedList || []}
      />
    );
  };

  return (
    <>
      <View
        style={{
          marginTop: perfectSize(8),
          flex: 1,

          marginBottom: perfectSize(Platform.OS === 'windows' ? 16 : 0),
        }}>
        <Carousel
          ref={mainCarouselRef}
          style={{transform: [{translateY: 0}]}}
          // inverted={isRTL ? true : false}

          keyExtractor={(mainItem, mainItemIndex) => mainItemIndex.toString()}
          sliderWidth={perfectSize(1920)}
          itemWidth={perfectSize(1920)} //enableMomentum={true}
          scrollEnabled={false}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          // autoplay={false}
          // autoplayInterval={20000} //10 sec
          onSnapToItem={slideIndex => {
            //console.log('onSnapToItem: ', slideIndex);

            itemSpeak(slideIndex);
            setIndex(slideIndex);

            if (slideIndex === servingUserList?.length - 1) {
              setTimeout(() => {
                mainCarouselRef?.current?.snapToItem(0, true, true);
              }, 8000);
            }
          }}
          data={servingUserList || []}
          horizontal={true}
          renderItem={renderItem}
          //  useScrollView={true}
        />

        <Pagination
          dotsLength={servingUserList?.length}
          activeDotIndex={index}
          containerStyle={{
            position: 'absolute',
            bottom: perfectSize(-20),
            alignSelf: 'center',
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
          dotStyle={{
            width: perfectSize(20),
            height: perfectSize(20),
            borderRadius: perfectSize(10),
            marginHorizontal: perfectSize(5),
            backgroundColor: Colors.PRIMARY_COLOR,
          }}
          inactiveDotStyle={{
            backgroundColor: Colors.SECONDARY_COLOR,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </>
  );
};
export default CarouselComponent;
