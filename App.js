/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import Voice from 'react-native-voice';
import Voice from '@react-native-community/voice';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const onSpeechResults = (e) => {
  console.log('onSpeechResults: ', e);
};
const onSpeechStart = (e) => {
  console.log('onSpeechStart: ', e);
};

const onSpeechPartialResults = (e) => {
  console.log('onSpeechPartialResults:', e);
}

const onSpeechEnd = (e) => {
  console.log('onSpeechEnd: ', e);
};

const onSpeechError = (e) => {
  console.log('onSpeechError: ', e);
};
Voice.onSpeechStart = onSpeechStart;
Voice.onSpeechResults = onSpeechResults;
Voice.onSpeechEnd = onSpeechEnd;
Voice.onSpeechError = onSpeechError;
Voice.onSpeechResults = onSpeechResults;
Voice.onSpeechPartialResults = onSpeechPartialResults;



const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [pitch, setPitch] = React.useState('')
  const [recognizing, setRecognizing] = React.useState(false)
  const onSpeechVolumeChanged = (e) => {
    // console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value)
  };

  Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
  const startRecognizing = async () => {
    try {
      await Voice.start('en-IN');
      setRecognizing(true)
    } catch (e) {
      console.error(e);
    }
  };
  
  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      setRecognizing(false)
      console.log('stopped')
    } catch (e) {
      console.error(e);
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        <Text style={{ color: 'white' }}>Pitch {pitch}</Text>
        <View>
          <Text></Text>
        </View>
        <View style={styles.startContainerParent}>
          <View style={[styles.startContainer, { backgroundColor:'rgba(87, 78, 245, 0.2)', padding: pitch ? 1.5*pitch : 0 }]}>
            <View style={[styles.startContainer, { backgroundColor:'rgba(87, 78, 245, 0.5)', padding: pitch ? pitch : 0 }]}>
              <TouchableOpacity onPress={recognizing?stopRecognizing:startRecognizing} style={styles.startButton}>
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  startContainerParent: {
    alignItems: 'center',
    padding:10,
    backgroundColor: 'red',
    flex:1,
    justifyContent: 'center'
  },
  startContainer: {
    backgroundColor:'white',
    borderRadius: 50,
    // position:'absolute',
    // top: '50%',
    // left: '40%'
  },
  startText: {
    color: 'white',
    fontSize: 22,
  },
  startButton: {
    borderRadius: 30,
    backgroundColor: 'blue',
    paddingHorizontal: 8,
    paddingVertical: 15,
    width: 58,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
