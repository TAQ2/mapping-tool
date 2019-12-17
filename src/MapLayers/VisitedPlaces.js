import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-map-gl";
import axios from "axios";
import { FaAsterisk } from "react-icons/fa";

import visitedPlaces from "./visitedPlaces.json";

function PopupMessage({ latitude, longitude }) {
  const [weather1, setWeather1] = useState();

  useEffect(() => {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&APPID=" +
          process.env.REACT_APP_WEATHER_API_TOKEN
      )
      .then(response => {
        setWeather1(response.data);
      });
  }, [latitude, longitude]);

  if (weather1 == null) {
    return <div>Loading</div>;
  }

  return <div>{weather1.main.temp}</div>;
}

export default function VisitedPlaces() {
  const [selectedMarker, setSelectedMarker] = useState();
  return (
    <>
      {visitedPlaces.map((location, i) => {
        const iconSize = 20;
        return (
          <Marker key={i} {...location} offsetLeft={-iconSize / 2}>
            <FaAsterisk
              size={iconSize}
              onClick={() => {
                setSelectedMarker(i);
              }}
              style={{
                cursor: "pointer",
                color: i === selectedMarker ? "purple" : null
              }}
            />
          </Marker>
        );
      })}
      {selectedMarker != null && (
        <Popup
          {...visitedPlaces[selectedMarker]}
          onClose={() => {
            setSelectedMarker();
          }}
        >
          <PopupMessage {...visitedPlaces[selectedMarker]} />
        </Popup>
      )}
    </>
  );
}
