import { AppLoading, Font } from 'expo';

import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';

export default class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  };

  _loadAssetsAsync = () => {
    return Font.loadAsync({
      ...FontAwesome.font,
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    });
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <View style={styles.container}>
          <HomeScreen />

          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && (
            <View style={styles.statusBarUnderlay} />
          )}
        </View>
      );
    } else {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => {
            this.setState({ appIsReady: true });
          }}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
