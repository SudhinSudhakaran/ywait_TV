import { PixelRatio, Dimensions } from 'react-native';
import { create } from 'react-native-pixel-perfect';
let displayProps = {
    width: PixelRatio.roundToNearestPixel(
        Math.max(1920, Dimensions.get('window').width * PixelRatio.get()),
    ),
    height: PixelRatio.roundToNearestPixel(
        Math.max(1080, Dimensions.get('window').height * PixelRatio.get()),
    ),
};
let perfectSize = create(displayProps);

const tokenOnefontSizer = (characterlen) => {
  

    if (characterlen <= 5) {
        return perfectSize(110);
    } else if (characterlen === 6) {
        return perfectSize(100);
    } else if (characterlen > 6) {
        return perfectSize(50);
    }
    else {
        return perfectSize(40);
    }
}
const tokenTwofontSizer = (characterlen) => {
   
    // console.log('Character length', characterlen)
    if (characterlen <= 4) {
        return perfectSize(70);
    }
    else if (characterlen === 5) {
        return perfectSize(50);

    } else if (characterlen === 6) {
        return 10
    }

    else if (characterlen > 6) {
        return perfectSize(30);
    }
    else {
        return perfectSize(40);
    }}
    const tokenThreefontSizer = (characterlen) => {
   
        // console.log('Character length', characterlen)
        if (characterlen <= 4) {
            return perfectSize(70);
        }
        else if (characterlen === 5) {
            return perfectSize(50);
    
        } else if (characterlen === 6) {
            return 10
        }
    
        else if (characterlen > 6) {
            return perfectSize(30);
        }
        else {
            return perfectSize(40);
        }
}


export default { tokenOnefontSizer, tokenTwofontSizer,tokenThreefontSizer }