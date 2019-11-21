import React, { useEffect } from "react";
import { Container, Text, Content, Grid } from "native-base";
import { BackHandler } from "react-native";

import MyHeader from "../../components/Header";
import SearchComponent from "../../components/SearchComponent";
import styles from "./style";
import genericStyles from "../../styles";

export default function Home({ navigation }) {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleHardwareBackPress);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleHardwareBackPress
      );
    };
  });

  const handleHardwareBackPress = () => {
    alert(10);
    return true;
  };

  return (
    <Container style={styles.container}>
      <MyHeader />
      <Content contentContainerStyle={genericStyles.centeredContent}>
        <Grid style={genericStyles.centeredGrid}>
          <SearchComponent navigation={navigation} />
        </Grid>
      </Content>
    </Container>
  );
}
