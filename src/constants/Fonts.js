import { Platform } from 'react-native';

export default {

    Poppins_Regular: Platform.OS === 'windows' ? 'Assets/Poppins-Regular.ttf#Poppins' : 'Poppins-Regular',
    Poppins_Italic: Platform.OS === 'windows' ? 'Assets/Poppins-Italic.ttf#Poppins' : 'Poppins-Italic',
    Poppins_Medium: Platform.OS === 'windows' ? 'Assets/Poppins-Medium.ttf#Poppins' : 'Poppins-Medium',
    Poppins_MediumItalic: Platform.OS === 'windows' ? 'Assets/Poppins-MediumItalic.ttf#Poppins' : 'Poppins-MediumItalic',
    Poppins_SemiBold: Platform.OS === 'windows' ? 'Assets/Poppins-SemiBold.ttf#Poppins' : 'Poppins-SemiBold',
    Poppins_SemiBoldItalic: Platform.OS === 'windows' ? 'Assets/Poppins-SemiBoldItalic.ttf#Poppins' : 'Poppins-SemiBoldItalic',
    Poppins_Bold: Platform.OS === 'windows' ? 'Assets/Poppins-Bold.ttf#Poppins' : 'Poppins-Bold',
    Poppins_BoldItalic: Platform.OS === 'windows' ? 'Assets/Poppins-BoldItalic.ttf#Poppins' : 'Poppins-BoldItalic',

};
