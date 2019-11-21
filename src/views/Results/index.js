import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Content, Spinner, Text, Grid } from "native-base";

import { getItineraries } from "../../redux/actions/itineraries";
import Itinerary from "../../components/Itinerary";
import MyHeader from "../../components/Header";
import { SECONDARY } from "../../consts";
import genericStyles from "../../styles";
import styles from "./style";

export default function Results({ navigation }) {
  const dispatch = useDispatch();

  const [hasFetched, setHasFetched] = useState(false);
  const itineraries = useSelector(state => state.itineraries.itineraries);
  const error = useSelector(state => state.itineraries.error);
  const {
    state: {
      params: {
        adults,
        children,
        originPlace,
        destinationPlace,
        inboundDate,
        outboundDate
      }
    }
  } = navigation;

  useEffect(() => {
    if (!hasFetched) {
      dispatch(
        getItineraries({
          adults,
          children,
          originPlace,
          destinationPlace,
          inboundDate,
          outboundDate
        })
      );
      setHasFetched(true);
    }
  });

  const renderItineraries = () => {
    if (itineraries && itineraries.Itineraries) {
      return itineraries.Itineraries.map((itinerary, index) => (
        <Itinerary
          key={index}
          {...itinerary}
          Legs={itineraries.Legs}
          Agents={itineraries.Agents}
          Carries={itineraries.Carriers}
          itineraryNumber={index + 1}
        />
      ));
    }
  };

  const renderContent = () => {
    let messageContent;

    if (itineraries && !itineraries.Itineraries.length) {
      messageContent = <Text>:( No se encontraron resultados</Text>;
    } else if (!itineraries && !error) {
      messageContent = (
        <Fragment>
          <Spinner color={SECONDARY} />
          <Text>Buscando Resultados...</Text>
        </Fragment>
      );
    } else if (error) {
      messageContent = <Text>Ops!, algo ha salido mal, intenta de nuevo</Text>;
    }

    if (!messageContent) {
      return <Content>{renderItineraries()}</Content>;
    }

    return (
      <Content contentContainerStyle={genericStyles.centeredContent}>
        <Grid style={[genericStyles.centeredGrid, styles.grid]}>
          {messageContent}
        </Grid>
      </Content>
    );
  };

  return (
    <Container>
      <MyHeader showBack />
      {renderContent()}
    </Container>
  );
}
