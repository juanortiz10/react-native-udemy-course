import React, { useState, useEffect } from "react";
import {
  Header,
  Left,
  Body,
  Right,
  Thumbnail,
  Icon,
  Button
} from "native-base";
import { withNavigation } from "react-navigation";

import { PRIMARY_DARK, USER_INFO, PROFILE } from "../../consts";
import { getItem } from "../../utils/storage";
import styles from "./style";

export function MyHeader({ imageUri, showBack, navigation }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(
    () => {
      if (!userInfo) {
        loadUserInfo();
      }
    },
    [userInfo]
  );

  const loadUserInfo = async () => {
    let userInfo = await getItem(USER_INFO);
    userInfo = JSON.parse(userInfo);
    setUserInfo(userInfo);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleProfileImagePress = () => {
    navigation.navigate(PROFILE);
  };

  return (
    <Header style={styles.header} androidStatusBarColor={PRIMARY_DARK}>
      <Left>
        {showBack && (
          <Icon
            android="md-arrow-back"
            ios="ios-arrow-back"
            style={styles.backIcon}
            onPress={handleBackPress}
          />
        )}
      </Left>
      <Body />
      <Right>
        <Button onPress={handleProfileImagePress} transparent>
          <Thumbnail source={{ uri: userInfo && userInfo.photoUrl }} small />
        </Button>
      </Right>
    </Header>
  );
}

export default withNavigation(MyHeader);
