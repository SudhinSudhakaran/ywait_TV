



import React, { useEffect, useRef, useState, useCallback } from 'react';
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
import { FlatGrid } from 'react-native-super-grid';
import Utils from '../../helpers/utils/Utils';
import { Colors, Fonts, Globals, Images, Strings } from '../../constants';
import { PixelRatio, Dimensions } from 'react-native';
import { create } from 'react-native-pixel-perfect';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import Translations from '../../constants/Translations';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
let displayProps = {
    width: PixelRatio.roundToNearestPixel(
        Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
    ),
    height: PixelRatio.roundToNearestPixel(
        Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
    ),
};
let perfectSize = create(displayProps);
const RoomsList = ({ item, subIndex, type, _name }) => {


    const { tvPointList } = useSelector(state => state.TvPointState);
    const { isRTL } = useSelector(state => state.AlignmentState);
    console.log('Room list item =>', item, type);
    var imageUri = '';

        const { display_name: fullName, image } = item ?? {};
        const [firstName = '', lastName = ''] = fullName?.split(' ') ?? [];

        imageUri = Utils.isValidUrl(image)
            ? image
            : Utils.getDefaultAvatarImageURL(firstName + '+' + lastName);



    



    return (
        <View
            style={{
                borderColor: Colors.GREY_COLOR,
                borderWidth: 1,
                width: perfectSize(273),
                height: perfectSize(153),
                marginLeft: isRTL ? undefined : perfectSize(47),
                marginTop: perfectSize(17),
                backgroundColor: Colors.SECONDARY_COLOR,
            }}>
            <Image
                style={{
                    width: perfectSize(60),
                    height: perfectSize(60),
                    borderRadius: perfectSize(60) / 2,
                    overflow: 'hidden',
                    marginLeft: isRTL ? perfectSize(47) : perfectSize(22),
                    marginTop: perfectSize(17),
                    borderWidth: perfectSize(1),
                    borderColor: Colors.GREY_COLOR,
                    resizeMode: 'cover',
                }}
                source={{
                    uri:imageUri,
                }}
            />
            <Text
                style={{
                    // fontFamily: Fonts.Poppins_Medium,
                    fontSize: perfectSize(20),
                    color: Colors.WHITE_COLOR,
                    //textAlign: 'center',
                    marginLeft: perfectSize(22),
                    marginRight: perfectSize(22),
                    fontFamily: Fonts.Poppins_Regular,
                }}
                numberOfLines={1}>
                {item.display_name}
            </Text>

            <Text
                style={{
                    fontFamily: Fonts.Poppins_Regular,
                    fontSize: perfectSize(16),
                    color: Colors.WHITE_COLOR,
                    // textAlign: 'center',
                    marginLeft: perfectSize(22),
                    marginRight: perfectSize(22),
                }}
                numberOfLines={1}>
                {item?.role_id?.label || ''}
            </Text>
        </View>
    );
};

export default RoomsList

const styles = StyleSheet.create({})




