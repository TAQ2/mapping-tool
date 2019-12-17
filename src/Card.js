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
import { useSpring, animated, useTransition } from "react-spring";
import useMeasure from "react-use-measure";
import styled from "styled-components";

import { FaGlobeAmericas } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import Sidepanel from "./Sidepanel";
import visitedPlaces from "./visitedPlaces.json";

export default function Card({ children, isRight }) {
  const [isClosed, setIsClosed] = useState(false);

  const [ref, bounds] = useMeasure();

  let animationConfig;
  if (isRight) {
    animationConfig = {
      right: "1%",
      opacity: isClosed ? 0 : 1,
      from: { right: "-10%", opacity: 0 },
      delay: !isClosed && 300
    };
  } else {
    animationConfig = {
      left: "1%",
      opacity: isClosed ? 0 : 1,
      from: { left: "-10%", opacity: 0 },
      delay: !isClosed && 300
    };
  }

  const animation = useSpring(animationConfig);

  return (
    <animated.div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        position: "fixed",
        top: "2%",
        right: "1%",
        cursor: "default",
        borderRadius: 5,
        width: "30%",
        ...animation
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
            setIsClosed(true);
          }}
        />
      </div>
      {children}
    </animated.div>
  );
}
