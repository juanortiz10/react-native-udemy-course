import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import { PRIMARY, WHITE } from "../../consts";

export default StyleSheet.create({
  header: {
    backgroundColor: PRIMARY,
    marginTop: Constants.platform.android ? Constants.statusBarHeight : 0
  },
  backIcon: {
    color: WHITE,
    marginLeft: 12
  }
});
