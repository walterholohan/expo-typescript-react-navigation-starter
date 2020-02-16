import 'react-native-gesture-handler';
import { Asset } from 'expo-asset';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './src/navigation/AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([require('./assets/images/robot-dev.png'), require('./assets/images/robot-prod.png')]),
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      // eslint-disable-next-line @typescript-eslint/camelcase
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    }),
  ]);
}

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    loadResourcesAsync();
    // SplashScreen.hide();
    setLoadingComplete(true);
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}
