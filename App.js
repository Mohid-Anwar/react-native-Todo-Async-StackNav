import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [displayText, setDisplayText] = useState('');
  const [newInput, setNewInput] = useState('');

  useEffect(() => {
    const fetchStoredText = async () => {
      try {
        const storedText = await AsyncStorage.getItem('storedText');
        if (storedText != null) {
          setDisplayText(storedText);
        } else {
          setDisplayText('This is the Old Text');
        }
      } catch (error) {
        console.error('Error fetching stored text:', error);
      }
    };

    fetchStoredText();
  }, []);

  const showToast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const changeText = async () => {
    try {
      await AsyncStorage.setItem('storedText', newInput);
      setDisplayText(newInput);
      showToast('Value changed Successfully');
    } catch (error) {
      console.error('Error storing new text:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
      }}>
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
          textAlign: 'center',
          color: '#333',
        }}>
        {displayText}
      </Text>
      <TextInput
        style={{
          height: 40,
          width: '100%',
          borderColor: 'black',
          borderWidth: 1,
          padding: 10,
          fontSize: 18,
          marginBottom: 20,
          backgroundColor: '#fff',
          borderRadius: 8,
          color: 'black',
        }}
        placeholder="Enter new text"
        onChangeText={text => setNewInput(text)}
        value={newInput}
      />
      <Button
        title="Change Text"
        onPress={changeText}
        color="#007bff"
        accessibilityLabel="Change Text Button"
      />
    </View>
  );
};

export default App;
