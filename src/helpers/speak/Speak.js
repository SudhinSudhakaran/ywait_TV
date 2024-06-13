import Tts from 'react-native-tts';

// export const speak = async (text, language = 'en') => {
//   try {
//     Tts.setDefaultLanguage(language);

//     return new Promise((resolve, reject) => {
//       Tts.addEventListener('tts-finish', () => {
//         resolve(true);
//       });
//       Tts.speak(text)
//         .then(() => {
//           // The text has started speaking.
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

// export const speak = async (text, languages = ['en'], ) => {
//   try {
//     return new Promise((resolve, reject) => {
//       let index = 0;
//       const speakNextLanguage = () => {
//         if (index >= languages.length) {
//           resolve();
//           return;
//         }
//         Tts.setDefaultLanguage(languages[index].languageCode);
//         Tts.addEventListener('tts-finish', () => {

//           index++;
//           speakNextLanguage();
//         });
//         Tts.speak(text).catch(error => {
//           reject(error);
//         });
//       };
//       speakNextLanguage();
//     });
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

export const speak = async (text, languages) => {
  try {
    return new Promise((resolve, reject) => {
      let index = 0;
      const speakNextLanguage = () => {
        if (index >= languages.length) {
          resolve();
          return;
        }
        Tts.setDefaultLanguage(languages[index].languageCode);
        Tts.addEventListener('tts-finish', () => {
          index++;
          speakNextLanguage();
        });
        Tts.speak(text)
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            speakNextLanguage();
          });
      };
      speakNextLanguage();
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};
