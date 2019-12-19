import React, { useState, useRef } from "react";
import ReactMapGL from //, { MapController }
"react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import Geocoder from "react-map-gl-geocoder";

import MapLayers from "./MapLayers";

import WelcomeMessage from "./WelcomeMessage";
import Sidepanel from "./Sidepanel";

// class CustomMapController extends MapController {
//   _onPan(event) {
//     // ignore pan on geocoder input
//     if (this._isGeocoderInputNode(event.target)) {
//       return;
//     }
//
//     super._onPan(event);
//   }
//
//   _onDoubleTap(event) {
//     // ignore double taps on geocoder input
//     if (this._isGeocoderInputNode(event.target)) {
//       return;
//     }
//
//     super._onDoubleTap(event);
//   }
//
//   _isGeocoderInputNode(node) {
//     return node.classList.contains("mapboxgl-ctrl-geocoder--input");
//   }
// }

// const customMapController = new CustomMapController();

const layers = [
  "Places Arjun has visited in the UK",
  "UK General Election Results 2017",
  "Weather Map",
  "House Prices data from Zoopla"
  // "Fill in your visted places"
];

// const geojson = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       geometry: { type: "Point", coordinates: [-4.697303, 53.456371] }
//     }
//   ]
// };

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
        // controller={customMapController}
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
        {/* <Source id="my-data" type="geojson" data={geojson}>
          <Layer
            type="circle"
            paint={{
              "circle-radius": 10,
              "circle-color": "#007cbf"
            }}
          />
        </Source> */}
        <MapLayers selectedLayer={selectedLayer} />
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
