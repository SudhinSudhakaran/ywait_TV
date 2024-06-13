import React, {useEffect} from 'react';
import {LogBox, Platform} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import {Provider, useDispatch} from 'react-redux';
import store from './src/redux/store/store';
import i18next from 'i18next';
import './src/i18n/i18n';
import {Globals} from './src/constants';
import StorageManager from './src/helpers/storage/StorageManager';

import RootStack from './src/navigators/RootStack';
import {AlignmentActions} from './src/redux/actions';
import {AppRegistry} from 'react-native';
const App = () => {
  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  //Ignore all log notifications
  LogBox.ignoreAllLogs();

  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    KeepAwake.activate();
  }

  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
};

export default App;
