import React from "react";
import { Container, Content, List, ListItem, Text, Spinner } from "native-base";

import { PRIMARY } from "../../consts";
import styles from "./style";

export default function FixedList({ places, containerStyle, onItemPress }) {
  if (!places || !places.length) {
    return <Spinner color={PRIMARY} />;
  }

  return (
    <Container style={[styles.container, containerStyle]}>
      <Content>
        <List>
          {places &&
            places.map((place, index) => (
              <ListItem key={index} onPress={() => onItemPress(place)}>
                <Text>{place.PlaceName}</Text>
              </ListItem>
            ))}
        </List>
      </Content>
    </Container>
  );
}
