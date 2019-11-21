import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Item,
  Label,
  Icon,
  DatePicker,
  Picker,
  Button,
  Text
} from "native-base";
import moment from "moment";

import styles from "./style";
import FixedList from "../FixedList";
import { getLocations } from "../../redux/actions/itineraries";
import { RESULTS } from "../../consts";

export default function SearchComponent({ navigation }) {
  const dispatch = useDispatch();
  const places = useSelector(state => state.itineraries.places);

  const [originPlace, setOriginPlace] = useState({ PlaceName: "" });
  const [destinationPlace, setDestinationPlace] = useState({ PlaceName: "" });

  const [outboundDate, setOutboundDate] = useState();
  const [inboundDate, setInboundDate] = useState();

  const [adults, setAdults] = useState("0");
  const [children, setChildren] = useState("0");

  const [showOriginPlaceList, setShowOriginPlaceList] = useState(false);
  const [showDestinationPlaceList, setShowDestinationPlaceList] = useState(
    false
  );

  const handleOriginPlaceChange = text => setOriginPlace({ PlaceName: text });

  const handleDestinationPlaceChange = text =>
    setDestinationPlace({ PlaceName: text });

  const handleOutboundDateChange = date => setOutboundDate(date);
  const handleInboundDateChange = date => setInboundDate(date);

  const handleAdultsChange = adults => setAdults(adults);
  const handleChildrenChange = children => setChildren(children);

  const searchButtonDisabled = () => {
    if (!originPlace || !destinationPlace || !outboundDate || !adults) {
      return true;
    }

    return false;
  };

  const handleSearchButtonClick = () => {
    navigation.navigate(RESULTS, {
      originPlace: originPlace.PlaceId,
      destinationPlace: destinationPlace.PlaceId,
      outboundDate: moment(outboundDate).format("YYYY-MM-DD"),
      inboundDate: moment(inboundDate).format("YYYY-MM-DD"),
      adults,
      children
    });
  };

  const handleOriginKeyPress = ({ nativeEvent }) => {
    if (originPlace.PlaceName.length > 2) {
      dispatch(getLocations({ query: originPlace.PlaceName }));
      setShowOriginPlaceList(true);
    }
  };

  const handleDestinationPlaceKeyPress = ({ nativeEvent }) => {
    if (destinationPlace.PlaceName.length > 2) {
      dispatch(getLocations({ query: destinationPlace.PlaceName }));
      setShowDestinationPlaceList(true);
    }
  };

  const handleOriginPlaceItemPress = placeSelected => {
    setOriginPlace(placeSelected);
    setShowOriginPlaceList(false);
  };

  const handleDestinationPlaceItemPress = placeSelected => {
    setDestinationPlace(placeSelected);
    setShowDestinationPlaceList(false);
  };

  return (
    <Form style={styles.form}>
      <Item>
        <Icon name="ios-home" />
        <Input
          placeholder="Origen"
          style={styles.input}
          value={originPlace.PlaceName}
          onChangeText={handleOriginPlaceChange}
          onKeyPress={handleOriginKeyPress}
        />
      </Item>
      {showOriginPlaceList && (
        <FixedList
          places={places}
          containerStyle={{ top: 50 }}
          onItemPress={handleOriginPlaceItemPress}
        />
      )}
      <Item>
        <Icon name="ios-airplane" />
        <Input
          placeholder="Destino"
          style={styles.input}
          value={destinationPlace.PlaceName}
          onChangeText={handleDestinationPlaceChange}
          onKeyPress={handleDestinationPlaceKeyPress}
        />
      </Item>
      {showDestinationPlaceList && (
        <FixedList
          places={places}
          containerStyle={{ top: 120 }}
          onItemPress={handleDestinationPlaceItemPress}
        />
      )}
      <Item style={styles.datesContainer}>
        <Icon ios="ios-calendar" android="md-calendar" />
        <DatePicker
          placeHolderText="Ida"
          onDateChange={handleOutboundDateChange}
          minimumDate={new Date()}
        />

        <Icon ios="ios-calendar" android="md-calendar" />
        <DatePicker
          placeHolderText="Regreso (opcional)"
          onDateChange={handleInboundDateChange}
          minimumDate={outboundDate}
        />
      </Item>
      <Item style={styles.pickersContainer}>
        <Icon name="person" />
        <Picker selectedValue={adults} onValueChange={handleAdultsChange}>
          <Picker.Item label="Adultos" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
        </Picker>

        <Icon name="person" />
        <Picker selectedValue={children} onValueChange={handleChildrenChange}>
          <Picker.Item label="Ninos" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
        </Picker>
      </Item>

      <Button
        style={styles.searchBtn}
        disabled={searchButtonDisabled()}
        onPress={handleSearchButtonClick}
      >
        <Icon name="search" style={styles.searchIcon} />
        <Text style={styles.searchBtnText}>Buscar</Text>
      </Button>
    </Form>
  );
}
