import { StyleSheet, Text, View, Image } from 'react-native'
import { PixelRatio, Dimensions } from 'react-native';
import React from 'react'
import { Globals, Images } from '../../constants'
import { create } from 'react-native-pixel-perfect';
import { BUILD_SOURCE } from '../../enums/Enums';
let displayProps = {
    width: PixelRatio.roundToNearestPixel(
        Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
    ),
    height: PixelRatio.roundToNearestPixel(
        Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
    ),
};
let perfectSize = create(displayProps);
const LogoComponent = () => {


    let _image = Images.ASTER_LOGO;

    if (
        Globals.CUSTOM_BUILD_SOURCE === BUILD_SOURCE.ALNOOR
    ) {
        _image = Images.ALNOOR_LOGO;
    } else if (Globals.CUSTOM_BUILD_SOURCE === BUILD_SOURCE.INSTA) {
        _image = Images.INSTA_LOGO;
    }

    else {
        _image = Images.ASTER_LOGO;
    }

    return (
        <View
            style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: perfectSize(280),
                left: perfectSize(300),
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 8,
                },
                shadowOpacity: 0.46,
                shadowRadius: 11.14,

                elevation: 17,
            }}>
            <Image
                source={_image}
                style={{
                    width: perfectSize(500),
                    height: perfectSize(400),
                }}
            />
        </View>
    )
}

export default LogoComponent

const styles = StyleSheet.create({})