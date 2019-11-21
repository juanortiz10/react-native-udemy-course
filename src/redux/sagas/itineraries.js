import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_LOCATIONS_START,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR,
  GET_ITINERARIES_START,
  GET_ITINERARIES_ERROR,
  GET_ITINERARIES_SUCCESS
} from "../../consts/actionTypes";

import apiCall from "../api";

const country = "MX";
const currency = "USD";
const locale = "en-US";

export function* getLocations({ payload }) {
  try {
    const url = `autosuggest/v1.0/${country}/${currency}/${locale}/?query=${
      payload.query
    }`;
    const method = "GET";

    const results = yield call(apiCall, url, method);
    yield put({ type: GET_LOCATIONS_SUCCESS, results: results.data.Places });
  } catch (error) {
    yield put({ type: GET_LOCATIONS_ERROR, error });
  }
}

export function* getItineraries({
  payload: {
    adults,
    children,
    destinationPlace,
    originPlace,
    inboundDate,
    outboundDate
  }
}) {
  try {
    const body = {
      adults,
      children,
      destinationPlace,
      originPlace,
      inboundDate,
      outboundDate,
      country,
      currency,
      locale
    };
    const headers = {
      "content-type": "application/x-www-form-urlencoded"
    };

    const sessionKeyResult = yield call(
      apiCall,
      "pricing/v1.0",
      "POST",
      new URLSearchParams(body),
      headers
    );

    const headerLocation = sessionKeyResult.headers.location;

    if (headerLocation) {
      const sessionToken = headerLocation.substring(
        headerLocation.lastIndexOf("/") + 1,
        headerLocation.length
      );

      const itineraries = yield call(
        apiCall,
        `pricing/uk2/v1.0/${sessionToken}?pageIndex=0&pageSize=20`,
        "GET"
      );

      if (!itineraries.data) {
        yield put({
          type: GET_ITINERARIES_ERROR,
          error: "No se encuentran resultados"
        });
      }
      yield put({
        type: GET_ITINERARIES_SUCCESS,
        itineraries: itineraries.data
      });
    }
  } catch (error) {
    console.log(20, error.response);
    yield put({ type: GET_ITINERARIES_ERROR, error });
  }
}

export default function* itineraries() {
  yield takeLatest(GET_LOCATIONS_START, getLocations);
  yield takeLatest(GET_ITINERARIES_START, getItineraries);
}
