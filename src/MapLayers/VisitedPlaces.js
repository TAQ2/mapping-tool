import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-map-gl";
import axios from "axios";
import { FaAsterisk } from "react-icons/fa";

import visitedPlaces from "./visitedPlaces.json";

function convertKelvinToCelsius(k) {
  return k - 273.15;
}

function PopupMessage({
  name,
  latitude,
  longitude,
  setSelectedMarker,
  selectedMarker
}) {
  const [weather, setWeather] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // component is not unmounted when user selects a marker and then another
    // so restart on loading on update instead
    setIsLoading(true);
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&APPID=" +
          process.env.REACT_APP_WEATHER_API_TOKEN
      )
      .then(({ data }) => {
        const temperature = convertKelvinToCelsius(data.main.temp).toFixed(2);
        console.log(data);
        const iconSrc =
          "http://openweathermap.org/img/wn/" +
          data.weather[0].icon +
          "@2x.png";

        setWeather({
          temperature,
          iconSrc,
          id: data.id,
          iconName: data.weather[0].main
        });
        setIsLoading(false);
      });
  }, [latitude, longitude]);

  if (isLoading) {
    return null;
  }

  return (
    <Popup
      {...visitedPlaces[selectedMarker]}
      closeOnClick={false}
      onClose={() => {
        setSelectedMarker(null);
      }}
    >
      <div style={{ cursor: "default", width: "295px" }}>
        <div style={{ fontSize: 32 }}>{name}</div>
        <div style={{ width: "30%" }}>
          <img
            src={weather.iconSrc}
            alt="weather-icon"
            style={{
              width: "100%",
              filter: weather.iconName === "Clouds" ? "contrast(0.5)" : null
            }}
          />
          <div style={{ textAlign: "center" }}>
            {weather.temperature} &#8451;
          </div>
        </div>
        <a
          href={"https://openweathermap.org/city/" + weather.id}
          target="_blank"
          rel="noopener noreferrer"
        >
          Find out more
        </a>
      </div>
    </Popup>
  );
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
        <PopupMessage
          {...visitedPlaces[selectedMarker]}
          setSelectedMarker={setSelectedMarker}
          selectedMarker={selectedMarker}
        />
      )}
    </>
  );
}
