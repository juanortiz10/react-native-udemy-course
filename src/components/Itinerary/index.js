import React, { Fragment } from "react";
import { Linking } from "react-native";
import { Card, CardItem, Text, Thumbnail } from "native-base";
import { Col, Grid } from "react-native-easy-grid";

import moment from "moment";

import styles from "./style";

export default function Itinerary({
  InboundLegId,
  OutboundLegId,
  PricingOptions,
  Carriers,
  Agents,
  Legs,
  itineraryNumber
}) {
  const handlePricingOptionPress = url => {
    Linking.openURL(url);
  };

  const renderLegs = () => {
    const outboundLeg = Legs.filter(leg => OutboundLegId === leg.Id)[0] || {};
    const inboundLeg = Legs.filter(leg => InboundLegId === leg.Id)[0] || {};

    return (
      <Fragment>
        <CardItem style={styles.legsCardItem}>
          <Text style={styles.legTitle}>Vuelo de Ida</Text>
          <Text style={styles.label}>
            Despegue:{" "}
            {moment(outboundLeg.Departure)
              .locale("de")
              .format("LLL")}
          </Text>
          <Text style={styles.label}>
            Aterrizaje: {moment(outboundLeg.Arrival).format("LLL")}
          </Text>
          <Text style={styles.label}>
            Duracion: {(outboundLeg.Duration / 60).toFixed(1)} horas
          </Text>
        </CardItem>
        <CardItem style={styles.legsCardItem}>
          <Text style={styles.legTitle}>Vuelo de Regreso</Text>
          <Text style={styles.label}>
            Despegue: {moment(inboundLeg.Departure).format("LLL")}
          </Text>
          <Text style={styles.label}>
            Aterrizaje: {moment(inboundLeg.Arrival).format("LLL")}
          </Text>
          <Text style={styles.label}>
            Duracion: {(inboundLeg.Duration / 60).toFixed(1)} horas
          </Text>
        </CardItem>
      </Fragment>
    );
  };

  const renderPricingOptions = () => {
    if (PricingOptions && PricingOptions.length) {
      return PricingOptions.map((pricingOption, index) => {
        const agent =
          Agents.filter(agent => agent.Id === pricingOption.Agents[0])[0] || {};

        return (
          <Grid
            key={index}
            style={styles.pricingOptionContainer}
            onPress={() => handlePricingOptionPress(pricingOption.DeeplinkUrl)}
          >
            <Col>
              <Thumbnail
                square
                source={{ uri: agent.ImageUrl }}
                style={styles.pricingOptionImage}
                resizeMode="cover"
              />
            </Col>
            <Col>
              <Text>{agent.Name}</Text>
              <Text>Precio: ${pricingOption.Price} USD</Text>
            </Col>
          </Grid>
        );
      });
    }
  };

  return (
    <Card>
      <CardItem header>
        <Text>Itinerario #{itineraryNumber}</Text>
      </CardItem>
      {renderLegs()}
      {renderPricingOptions()}
    </Card>
  );
}
