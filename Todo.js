import React, {useState, useEffect, useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(128, 0, 128)',
    background: 'rgb(230, 230, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    placeholderText: 'rgb(128, 0, 128)',
  },
};

const MyDarkTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 0, 0)',
    background: 'rgb(44, 44, 46)',
    card: 'rgb(84, 84, 88)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(84, 84, 88)',
    notification: 'rgb(255, 69, 58)',
    placeholderText: 'rgb(255, 0, 0)',
  },
};

const App = () => {
  const theme = useColorScheme();

  const {colors} = theme === 'dark' ? MyDarkTheme : MyTheme;

  const [item, setItem] = useState('');
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(0);

  useEffect(() => {
    loadList();
  }, []);

  const saveList = async () => {
    try {
      await AsyncStorage.setItem('toDoList', JSON.stringify(list));
    } catch (error) {
      console.error('Error saving to-do list: ', error);
    }
  };

  const loadList = async () => {
    try {
      const storedList = await AsyncStorage.getItem('toDoList');
      if (storedList !== null) {
        setList(JSON.parse(storedList));
      }
    } catch (error) {
      console.error('Error loading to-do list: ', error);
    }
  };

  const addItem = () => {
    const newItem = {key: Math.random().toString(), data: item};
    setList([...list, newItem]);
    setItem('');
    Keyboard.dismiss();
    saveList();
    ToastAndroid.show('Item added successfully!', ToastAndroid.SHORT);
  };

  const updateItem = element => {
    setItem(element.data);
    setEdit(element.key);
  };

  const updateList = () => {
    setList(prevList =>
      prevList.map(element =>
        element.key === edit ? {key: element.key, data: item} : element,
      ),
    );
    setEdit(0);
    setItem('');
    Keyboard.dismiss();
    saveList();
  };

  const deleteItem = key => {
    setList(prevList => prevList.filter(element => key !== element.key));
    setItem('');
    setEdit(0);
    saveList();
  };

  return (
    <NavigationContainer theme={theme}>
      <View style={[style.container, {backgroundColor: colors.background}]}>
        <StatusBar backgroundColor={colors.primary} />
        <View style={style.mainHeader}>
          <Text style={[style.headerText, {color: colors.text}]}>
            TO DO LIST
          </Text>
        </View>

        <View style={style.inputRow}>
          <TextInput
            style={[
              style.input,
              {
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Enter the task"
            placeholderTextColor={colors.placeholderText} // Set the placeholder text color here
            onChangeText={setItem}
            value={item}
          />

          <TouchableOpacity
            onPress={edit === 0 ? addItem : updateList}
            style={[style.addBtn, {backgroundColor: colors.primary}]}>
            <Text style={[style.buttonText, {color: colors.text}]}>
              {edit === 0 ? 'ADD' : 'UPDATE'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={style.listViewContainer}>
          {list.map((element, index) => (
            <TouchableOpacity
              key={element.key}
              onPress={() => updateItem(element)}
              style={[style.listView, {borderColor: colors.border}]}>
              <Text style={[style.listItemText, {color: colors.text}]}>
                {index + 1}- {element.data}
              </Text>

              <TouchableOpacity onPress={() => deleteItem(element.key)}>
                <Text
                  style={[style.deleteBtn, {backgroundColor: colors.primary}]}>
                  X
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </NavigationContainer>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainHeader: {
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 18,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
    padding: 8,
  },
  addBtn: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  themeBtn: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  listViewContainer: {
    alignSelf: 'center',
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  listView: {
    borderWidth: 1,
    padding: 15,
    width: '100%',
    marginTop: 10,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 20,
    marginLeft: 5,
  },
  deleteBtn: {
    fontSize: 20,
    marginRight: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default App;
