import React from "react";
import { Image } from "react-native";
import * as Google from "expo-google-app-auth";
import { Container, Content, Text, Grid, Button } from "native-base";

import styles from "./style";
import genericStyles from "../../styles";
import environment from "../../../environment";
import { saveItem } from "../../utils/storage";
import {
  ACCESS_TOKEN,
  USER_INFO,
  GOOGLE_SUCCESS_MESSAGE,
  HOME
} from "../../consts";

const GOOGLE_IMAGE = require("../../../assets/google-icon.png");
const {
  iosClientId,
  androidClientId,
  iosStandaloneAppClientId,
  androidStandaloneAppClientId
} = environment();

export default function Login({ navigation }) {
  const handleLoginPress = async () => {
    try {
      const { user, accessToken, type } = await Google.logInAsync({
        iosClientId,
        androidClientId,
        iosStandaloneAppClientId,
        androidStandaloneAppClientId
      });

      if (type === GOOGLE_SUCCESS_MESSAGE) {
        const userResult = await saveItem(USER_INFO, JSON.stringify(user));
        const tokenResult = await saveItem(ACCESS_TOKEN, accessToken);

        if (userResult && tokenResult) {
          navigation.navigate(HOME);
        } else {
          alert("Error al iniciar sesion");
        }
      }
    } catch (e) {
      alert("Error: " + e);
    }
  };

  return (
    <Container>
      <Content
        contentContainerStyle={[genericStyles.centeredContent, styles.content]}
      >
        <Grid style={[genericStyles.centeredGrid, styles.grid]}>
          <Text style={styles.title}>Bienvenido!</Text>
          <Text style={styles.subtitle}>Inicia sesion para continuar</Text>
          <Button light style={styles.googleBtn} onPress={handleLoginPress}>
            <Image source={GOOGLE_IMAGE} style={styles.googleIcon} />
            <Text>Google</Text>
          </Button>
        </Grid>
      </Content>
    </Container>
  );
}
