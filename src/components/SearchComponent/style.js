import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

import { SECONDARY } from "../../consts";

export default StyleSheet.create({
  form: {
    width,
    paddingLeft: width / 14,
    paddingRight: width / 14
  },
  datesContainer: {
    marginTop: 12,
    justifyContent: "space-between"
  },
  input: {
    marginTop: 12,
    marginBottom: 4
  },
  pickersContainer: {
    marginTop: 14,
    marginBottom: 14
  },
  searchBtn: {
    marginTop: 14,
    backgroundColor: SECONDARY,
    alignItems: "center",
    justifyContent: "center"
  },
  searchBtnText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  searchIcon: {
    marginRight: -5
  }
});
