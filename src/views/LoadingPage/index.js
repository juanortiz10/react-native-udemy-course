import React, { useEffect } from "react";
import { Spinner, Container, Content, Grid } from "native-base";

import { LOGIN, HOME, ACCESS_TOKEN } from "../../consts";
import { getItem } from "../../utils/storage";
import styles from "./style";

export default ({ navigation }) => {
  useEffect(() => {
    redirect();
  });

  const redirect = async () => {
    const token = await getItem(ACCESS_TOKEN);
    let route = LOGIN;

    if (token) {
      route = HOME;
    }

    navigation.navigate(route);
  };

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <Grid style={styles.grid}>
          <Spinner color="red" />
        </Grid>
      </Content>
    </Container>
  );
};
