import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
import Translations from '../constants/Translations';
const resources = {
  en: {
    translation: {
      [Translations.TOKEN_STATUS]: 'Token Status',
      [Translations.POWERED_BY]: 'Powered By',
      [Translations.SELECT_TV_POINT]: 'Select Tv Point',
      [Translations.PLEASE_SELECT_TV_POINT]: 'Please select Tv point',
      [Translations.ASSIGN]: 'Assign',
      [Translations.ASSIGNED]: 'Assigned',
      //split screen
      [Translations.SPLIT_SCREEN]: 'Split Screen',
      [Translations.SPLIT_SCREEN_ENABLE_DISABLE]:
        'Allow you to enable or disable the split screen',
      // language Switching screen
      [Translations.DISPLAY_LANGUAGE]: 'Display Language',
      [Translations.VOICE_LANGUAGE]: 'Voice Language',
      [Translations.ARABIC]: 'Arabic',
      [Translations.ENGLISH]: 'English',
      [Translations.FRENCH]: 'French',
      [Translations.APPLY]: 'Apply',
      [Translations.APPLIED]: 'Applied',
      [Translations.LOG_OUT]: 'Logout',
      [Translations.CONFIRM]: 'Confirm',
      [Translations.CANCEL]: 'Cancel',
      [Translations.YES]: 'Yes',
      [Translations.LOG_OUT_MSG]: 'Are you sure want to logout',
      [Translations.EXIT]: 'Are you sure you want to exit from the Application',
      [Translations.NO_APPOINMENT_TEXT]: 'No appointments scheduled',
      [Translations.NO_CUSTOMER_AVAILABLE]: 'No customer available',
      [Translations.CONSULTANT_NOT_AVAILABLE]: 'Consultant not available',
      [Translations.NO_INTERNET_CONNECTION]: 'No Internet Connection',
      [Translations.SERVING_PERSON]: 'Serving Person',
      [Translations.SERVING_NOW]: 'Serving Now',
      [Translations.SERVING_ROOM]: 'Serving Room',
      [Translations.TOKEN_NUMBER]: 'Token Number',
      [Translations.NEXT]: 'Next',
      [Translations.ENABLE]: 'Enable',
      [Translations.DISABLE]: 'Disable',
      [Translations.FAILED]: 'Failed',
      [Translations.FAILED_VOICE_MSG]: 'You must select at least one language',
      //Login
      [Translations.LOGIN]: 'Login',
      [Translations.LOGIN_FAIL_MSG]: 'You are not a authorized user',
      [Translations.WHITE_SPACE_NOT_ALLOWED]: 'White space not allowed',
      [Translations.NEED_A_PASSWORD]: 'We need a password to log you in',
      [Translations.ENTER_VALID_EMAIL]: 'Please enter a valid email',
      [Translations.NEED_A_EMAIL]: 'We need an email address to log you in',
      [Translations.SORRY]: 'Sorry',
      [Translations.PLEASE_SELECT_TV_POINT_TO_PROCEED]:
        'Please select Tv point to proceed',
      [Translations.NONE]: 'None',
      [Translations.PASSWORD]: 'Password',
      [Translations.EMAIL]: 'Email',
      [Translations.LANGUAGE_NOT_SUPPORTED]:
        'The selected audio language is not supported in this device',
      [Translations.SHOW_LIVE_TOKEN]: 'Show Live Tokens',
      [Translations.SHOW_LIVE_TOKEN_DESCRIPTION]:
        'Allow you to show live tokens',
      [Translations.SCREEN_SETTINGS]: 'Screen Settings',
      [Translations.PLEASE_DISABLE_LIVE_TOKEN]: 'Please to disable show live tokens'
    },
  },
  ar: {
    translation: {
      [Translations.TOKEN_STATUS]: 'حالة الرمز',
      [Translations.POWERED_BY]: 'مشغل بواسطة',
      [Translations.SELECT_TV_POINT]: 'حدد نقطة التلفزيون',
      [Translations.PLEASE_SELECT_TV_POINT]: 'الرجاء تحديد نقطة التلفزيون',
      [Translations.ASSIGN]: 'تعيين',
      [Translations.ASSIGNED]: 'مُكَلَّف',
      //split screen
      [Translations.SPLIT_SCREEN]: 'تقسيم الشاشة',
      [Translations.SPLIT_SCREEN_ENABLE_DISABLE]:
        'تسمح لك بتمكين أو تعطيل تقسيم الشاشة',
      // language Switching screen
      [Translations.DISPLAY_LANGUAGE]: 'عرض اللغة',
      [Translations.VOICE_LANGUAGE]: 'لغة الصوت',
      [Translations.ARABIC]: 'عربي',
      [Translations.ENGLISH]: 'إنجليزي',
      [Translations.FRENCH]: 'فرنسي',
      [Translations.APPLY]: 'يتقدم',
      [Translations.APPLIED]: 'مُطبَّق',
      [Translations.LOG_OUT]: 'تسجيل خروج',
      [Translations.CONFIRM]: 'يتأكد',
      [Translations.CANCEL]: 'يلغي',
      [Translations.YES]: 'نعم',
      [Translations.LOG_OUT_MSG]: 'هل أنت متأكد من أنك تريد تسجيل الخروج',
      [Translations.EXIT]: 'هل أنت متأكد أنك تريد الخروج من التطبيق',
      [Translations.NO_APPOINMENT_TEXT]: 'لا توجد مواعيد مجدولة',
      [Translations.NO_CUSTOMER_AVAILABLE]: 'لا يوجد زبون متاح',
      [Translations.CONSULTANT_NOT_AVAILABLE]: 'استشاري غير متوفر',
      [Translations.NO_INTERNET_CONNECTION]: 'لا يوجد اتصال بالإنترنت',
      [Translations.SERVING_PERSON]: 'الشخص الذي يخدم',
      [Translations.SERVING_NOW]: 'يخدم الآن',
      [Translations.SERVING_ROOM]: 'غرفة التقديم',
      [Translations.TOKEN_NUMBER]: 'رقم الرمز',
      [Translations.NEXT]: 'التالي',
      [Translations.ENABLE]: 'يُمكَِن',
      [Translations.DISABLE]: 'إبطال',
      [Translations.FAILED]: 'فشل',
      [Translations.FAILED_VOICE_MSG]: 'يجب عليك اختيار لغة واحدة على الأقل',
      //Login
      [Translations.LOGIN]: 'تسجيل الدخول',
      [Translations.LOGIN_FAIL_MSG]: 'أنت لست مستخدمًا مصرحًا له',
      [Translations.WHITE_SPACE_NOT_ALLOWED]: 'المساحة البيضاء غير مسموح بها',
      [Translations.NEED_A_PASSWORD]: 'نحتاج إلى كلمة مرور لتسجيل الدخول',
      [Translations.ENTER_VALID_EMAIL]: 'يرجى إدخال البريد الإلكتروني الصحيح',
      [Translations.NEED_A_EMAIL]: 'نحتاج إلى عنوان بريد إلكتروني لتسجيل دخولك',
      [Translations.SORRY]: 'آسف',
      [Translations.PLEASE_SELECT_TV_POINT_TO_PROCEED]:
        'الرجاء تحديد نقطة التلفزيون للمتابعة',
      [Translations.PASSWORD]: 'كلمة المرور',
      [Translations.EMAIL]: 'بريد إلكتروني',
      [Translations.LANGUAGE_NOT_SUPPORTED]:
        'لغة الصوت المحددة غير مدعومة في هذا الجهاز',
      [Translations.SHOW_LIVE_TOKEN]: 'إظهار الرموز الحية',
      [Translations.SHOW_LIVE_TOKEN_DESCRIPTION]: 'تسمح لك بإظهار الرموز الحية',
      [Translations.SCREEN_SETTINGS]: 'إعدادات الشاشة',
      [Translations.PLEASE_DISABLE_LIVE_TOKEN]: 'تحتاج إلى تعطيل إظهار الرموز الحية',
    },
  },
  fr: {
    translation: {
      [Translations.TOKEN_STATUS]: 'État du jeton',
      [Translations.POWERED_BY]: 'Alimenté par',
      [Translations.SELECT_TV_POINT]: 'Sélectionnez Point TV',
      [Translations.PLEASE_SELECT_TV_POINT]:
        'Veuillez sélectionner le point TV',
      [Translations.ASSIGN]: 'Attribuer',
      [Translations.ASSIGNED]: 'Attribué',
      //split screen
      [Translations.SPLIT_SCREEN]: 'Écran divisé',
      [Translations.SPLIT_SCREEN_ENABLE_DISABLE]: `Permet d'activer ou de désactiver l'écran partagé`,
      // language Switching screen
      [Translations.DISPLAY_LANGUAGE]: `Langue d'affichage`,
      [Translations.VOICE_LANGUAGE]: 'Langue vocale',
      [Translations.ARABIC]: 'arabe',
      [Translations.ENGLISH]: 'Anglais',
      [Translations.FRENCH]: 'Français',
      [Translations.APPLY]: 'Appliquer',
      [Translations.APPLIED]: 'Appliqué',
      [Translations.LOG_OUT]: 'Se déconnecter',
      [Translations.CONFIRM]: 'Confirmer',
      [Translations.CANCEL]: 'Annuler',
      [Translations.YES]: 'Oui',
      [Translations.LOG_OUT_MSG]: 'Êtes-vous sûr de vouloir vous déconnecter',
      [Translations.EXIT]: `Êtes-vous sûr de vouloir quitter l'application`,
      [Translations.NO_APPOINMENT_TEXT]: 'Aucun rendez-vous prévu',
      [Translations.NO_CUSTOMER_AVAILABLE]: 'Aucun client disponible',
      [Translations.CONSULTANT_NOT_AVAILABLE]: 'Conseiller non disponible',
      [Translations.NO_INTERNET_CONNECTION]: 'Pas de connexion Internet',
      [Translations.SERVING_PERSON]: 'Personne servante',
      [Translations.SERVING_NOW]: 'Servir maintenant',
      [Translations.SERVING_ROOM]: 'Salle de service',
      [Translations.TOKEN_NUMBER]: 'Numéro de jeton',
      [Translations.NEXT]: 'Suivant',
      [Translations.ENABLE]: 'Activer',
      [Translations.DISABLE]: 'Désactiver',
      [Translations.FAILED]: 'Échoué',
      [Translations.FAILED_VOICE_MSG]:
        'Vous devez sélectionner au moins une langue',
      //Login
      [Translations.LOGIN]: 'Connexion',
      [Translations.LOGIN_FAIL_MSG]: `Vous n'êtes pas un utilisateur autorisé`,
      [Translations.WHITE_SPACE_NOT_ALLOWED]: 'Espace blanc non autorisé',
      [Translations.NEED_A_PASSWORD]: `Nous avons besoin d'un mot de passe pour vous connecter`,
      [Translations.ENTER_VALID_EMAIL]: 'Veuillez entrer un email valide',
      [Translations.NEED_A_EMAIL]: `Nous avons besoin d'une adresse e-mail pour vous connecter`,
      [Translations.SORRY]: 'Désolé',
      [Translations.PLEASE_SELECT_TV_POINT_TO_PROCEED]:
        'Veuillez sélectionner le point TV pour continuer',
      [Translations.PASSWORD]: 'Mot de passe',
      [Translations.EMAIL]: 'E-mail',
      [Translations.LANGUAGE_NOT_SUPPORTED]: `La langue audio sélectionnée n'est pas prise en charge sur cet appareil`,
      [Translations.SHOW_LIVE_TOKEN]: 'Afficher les jetons en direct',
      [Translations.SHOW_LIVE_TOKEN_DESCRIPTION]: `Vous permettre d'afficher des jetons en direct`,
      [Translations.SCREEN_SETTINGS]: `Paramètres de l'écran`,
      [Translations.PLEASE_DISABLE_LIVE_TOKEN]: `Besoin de désactiver l'affichage des jetons en direct`
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    compatibilityJSON: 'v3',
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
