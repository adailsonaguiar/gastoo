import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData(props: {key: string; value: string}) {
  try {
    await AsyncStorage.setItem(props.key, props.value);
  } catch (e) {
    console.log(e);
  }
}

export async function getData(key: string) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
}
