import React, { useState, useEffect } from "react";
import {
  Container,
  Content,
  Text,
  View,
  Spinner,
  Thumbnail,
  Button,
  Icon
} from "native-base";

import { USER_INFO, SECONDARY, LOGIN } from "../../consts";
import { getItem, clearAll } from "../../utils/storage";
import styles from "./style";

export default function Profile({ navigation }) {
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

  const handleLogoutPress = async () => {
    await clearAll();
    navigation.navigate(LOGIN);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (!userInfo) {
    return <Spinner color={SECONDARY} />;
  }
  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Button
            transparent
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Icon
              android="md-arrow-back"
              ios="ios-arrow-back"
              style={styles.backIcon}
            />
          </Button>
          <Thumbnail
            source={{ uri: userInfo.photoUrl }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text>{userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
          <Button style={styles.logoutBtn} onPress={handleLogoutPress}>
            <Text>Cerrar sesion</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
}
