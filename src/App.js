import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, {
  Marker,
  MapController,
  Popup,
  Source,
  Layer
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";
// import Geocoder from "react-map-gl-geocoder";

import WelcomeMessage from "./WelcomeMessage";
import Sidepanel from "./Sidepanel";
import visitedPlaces from "./visitedPlaces.json";

class CustomMapController extends MapController {
  _onPan(event) {
    // ignore pan on geocoder input
    if (this._isGeocoderInputNode(event.target)) {
      return;
    }

    super._onPan(event);
  }

  _onDoubleTap(event) {
    // ignore double taps on geocoder input
    if (this._isGeocoderInputNode(event.target)) {
      return;
    }

    super._onDoubleTap(event);
  }

  _isGeocoderInputNode(node) {
    return node.classList.contains("mapboxgl-ctrl-geocoder--input");
  }
}

const customMapController = new CustomMapController();

const layers = [
  "Places Arjun has visited in the UK",
  "UK General Election Results 2017",
  "Weather Map",
  "House Prices data from Zoopla"
  // "Fill in your visted places"
];

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-4.697303, 53.456371] }
    }
  ]
};

function PopupMessage(props) {
  const [weather1, setWeather1] = useState();

  useEffect(() => {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
          props.latitude +
          "&lon=" +
          props.longitude +
          "&APPID=" +
          process.env.REACT_APP_WEATHER_API_TOKEN
      )
      .then(response => {
        setWeather1(response.data);
      });
  }, [props.latitude, props.longitude]);

  if (weather1 == null) {
    return <div>Loading</div>;
  }

  return <div>{weather1.main.temp}</div>;
}

function CustomLayer({ selectedLayer }) {
  const [selectedMarker, setSelectedMarker] = useState();
  switch (selectedLayer) {
    case "Places Arjun has visited in the UK":
      return (
        <>
          {visitedPlaces.map((location, i) => (
            <Marker key={i} {...location}>
              <strong
                onClick={() => {
                  setSelectedMarker(i);
                }}
                style={{
                  fontSize: i === selectedMarker ? 40 : 30,
                  cursor: "pointer",
                  color: i === selectedMarker ? "purple" : null
                }}
              >
                *
              </strong>
            </Marker>
          ))}
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
    default:
      return null;
  }
}

function App() {
  const [viewport, setViewport] = useState({
    latitude: 53.456371,
    longitude: -4.697303,
    width: "100vw",
    height: "100vh",
    zoom: 5
  });

  const [selectedLayer, setSelectedLayer] = useState();
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const mapRef = useRef();

  return (
    <>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        controller={customMapController}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onLoad={() => {
          setIsMapLoaded(true);
        }}
      >
        {/* <Geocoder
          mapRef={mapRef}
          placeholder={"Where should Arjun go next..."}
          // onResults={console.log}
          position="top-left"
          style={{ width: 600 }}
          // the following is called when the user clicks
          onViewportChange={viewport => {
            setViewport(viewport);
            setVisitedLocations([
              ...visitedLocations,
              {
                latitude: viewport.latitude,
                longitude: viewport.longitude
              }
            ]);
          }}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        /> */}
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer
            type="circle"
            paint={{
              "circle-radius": 10,
              "circle-color": "#007cbf"
            }}
          />
        </Source>
        <CustomLayer selectedLayer={selectedLayer} />

        {isMapLoaded && (
          <Sidepanel
            layers={layers}
            selectedLayer={selectedLayer}
            setSelectedLayer={setSelectedLayer}
          />
        )}

        {isMapLoaded && <WelcomeMessage />}
      </ReactMapGL>
    </>
  );
}

export default App;

// make ui components not draggable via map controller
// to do add more places I've been to
// use deck.gl
// add testing?
// add redux?
// add how long would it take to travel to all these places starting from london
// add more data views
// https://www.freecodecamp.org/news/create-your-own-santa-tracker-with-gatsby-and-react-leaflet/

// STEPS
// Clean up the code
// Figure out what to write in the info message
