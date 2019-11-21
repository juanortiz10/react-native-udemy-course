import { AsyncStorage } from "react-native";

export const saveItem = async (keyName, keyValue) => {
  try {
    await AsyncStorage.setItem(keyName, keyValue);
    return true;
  } catch (e) {
    return false;
  }
};

export const getItem = async keyName => {
  try {
    return await AsyncStorage.getItem(keyName);
  } catch (e) {
    return false;
  }
};

export const clearAll = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (e) {
    return false;
  }
};
