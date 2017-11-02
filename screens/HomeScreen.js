import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import authenticateWithGithubAsync from '../api/authenticateWithGithubAsync';
import authenticateWithRedditAsync from '../api/authenticateWithRedditAsync';

export default class HomeScreen extends React.Component {
  state = {
    githubToken: null,
    redditToken: null,
    error: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <TouchableOpacity style={styles.button} onPress={this._authenticateWithGithubAsync}>
            <Text>Authenticate with Github</Text>
            </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this._authenticateWithRedditAsync}>
            <Text>Authenticate with Reddit</Text>
          </TouchableOpacity>

          <View style={styles.result}>
            {this.state.githubToken && <MonoText>Github token: {this.state.githubToken}</MonoText>}
            {this.state.redditToken && <MonoText>Reddit token: {this.state.redditToken}</MonoText>}
            {this.state.error && <MonoText>Error: {this.state.error}</MonoText>}
          </View>

        </ScrollView>
      </View>
    );
  }

  _authenticateWithGithubAsync = async () => {
    try {
      let result = await authenticateWithGithubAsync();
      this.setState({githubToken: result});
    } catch(e) {
      this.setState({error: JSON.stringify(e)});
    }
  }

  _authenticateWithRedditAsync = async () => {
    try {
      let result = await authenticateWithRedditAsync();
      this.setState({redditToken: result});
    } catch(e) {
      this.setState({error: JSON.stringify(e)});
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 30,
  },
  button: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#eee',
  },
  result: {
    marginTop: 20,
  },
});
