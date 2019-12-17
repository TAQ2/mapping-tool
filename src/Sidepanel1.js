import React, { useState, useEffect } from "react";
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
import Geocoder from "react-map-gl-geocoder";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdClose
} from "react-icons/md";
import { useSpring, animated } from "react-spring";

import visitedPlaces from "./visitedPlaces.json";

export default function SidePanel({ layers, setSelectedLayer, selectedLayer }) {
  const [isHidden, setIsHidden] = useState(false);

  let header = "Choose A Data Layer";

  if (isHidden) {
    if (selectedLayer == null) {
      header = "Not Viewing Any Layers";
    } else {
      header = "Viewing '" + selectedLayer + "'";
    }
  }

  const animation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1200,
    config: { duration: 800 }
  });

  return (
    <animated.div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        position: "fixed",
        top: "2%",
        left: "1%",
        // width: "30%",
        cursor: "default",
        borderRadius: "4px 0px 4px 4px",
        borderRadius: 4,
        padding: 20
        // ...animation
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 5,
          top: 5,
          cursor: "pointer"
        }}
      >
        <MdClose
          onClick={() => {
            // setIsClosed(true);
          }}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <strong style={{ fontSize: 28 }}>{header}</strong>
        {/* <span onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? <MdKeyboardArrowUp /> : "!^"}
        </span> */}
      </div>

      {!isHidden &&
        layers.map(layer => (
          <div
            key={layer}
            style={{
              cursor: "pointer",
              marginBottom: 20,
              display: "flex"
              // backgroundColor: layer === selectedLayer ? "red" : null
            }}
            onClick={() => {
              setSelectedLayer(layer);
            }}
          >
            <input
              type="checkbox"
              checked={layer === selectedLayer}
              style={{ marginRight: 10 }}
              onChange={() => {}} // @Incomplete - this is to stop the warning in console from react about readonly field
            />
            {layer}
          </div>
        ))}

      <div
        style={{
          position: "absolute",
          right: -32,
          top: 0,
          backgroundColor: "inherit",
          backgroundColor: "rgba(255, 255, 255, 1)",

          borderRadius: "0px 4px 4px 0px",
          borderRadius: 4,
          display: "flex"
        }}
      >
        <MdKeyboardArrowRight size={30} color="gray" />
      </div>
    </animated.div>
  );
}
