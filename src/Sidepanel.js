import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import useMeasure from "react-use-measure";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown
} from "react-icons/md";

const StyledThing = styled(animated.div)`
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  cursor: default;
  top: 10px;
  padding: 15px 25px;

  @media (min-width: 401px) {
    border-radius: 5px;
    left: 10px;
  }

  @media (max-width: 400px) {
    top: 0%;
    left: 0%;
    width: 100%;
  }
`;

const StyledMinimiser = styled.div`
  position: absolute;
  background-color: rgba(230, 230, 230, 0.5);
  display: flex;
  cursor: pointer;
  border-radius: 4px;

  @media (min-width: 401px) {
    right: -32px;
    top: 0;
  }

  @media (max-width: 400px) {
    bottom: -32px;
    left: 0;
  }
`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions(fn) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      fn(); // @incomplete - this is weird behaviour that invokes the side panel to be untoggled when there is a resize
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fn]);

  return windowDimensions;
}

export default function SidePanel({ layers, setSelectedLayer, selectedLayer }) {
  const [isHidden, setIsHidden] = useState(false);
  const { width } = useWindowDimensions(() => {
    if (isHidden) {
      setIsHidden(false);
    }
  });

  const [ref, bounds] = useMeasure();

  const animation = useSpring({
    transform: `translateX(${
      isHidden ? "-" + (bounds.width + 10) + "px" : "0px"
    })`, // @Cleanup - horrible way of contructing a string, // 10 is for the left assignment
    opacity: 1
  });

  const animation2 = useSpring({
    transform: `translateY(${isHidden ? "-" + bounds.height + "px" : "0px"})`, // @Cleanup - horrible way of contructing a string,
    opacity: 1
  });

  let ArrowIcon = MdKeyboardArrowLeft;

  if (isHidden) {
    ArrowIcon = MdKeyboardArrowRight;
  }

  if (width < 400) {
    ArrowIcon = MdKeyboardArrowUp;
    if (isHidden) {
      ArrowIcon = MdKeyboardArrowDown;
    }
  }

  return (
    <StyledThing style={width < 400 ? animation2 : animation} ref={ref}>
      <StyledMinimiser onClick={() => setIsHidden(!isHidden)}>
        <ArrowIcon size={30} color="gray" />
      </StyledMinimiser>
      <div style={{ marginBottom: 20 }}>
        <strong style={{ fontSize: 28 }}>Choose A Data Layer</strong>
      </div>

      {layers.map((layer, i) => (
        <div
          key={layer}
          style={{
            cursor: "pointer",
            marginBottom: i === layers.length - 1 ? 0 : 20,
            display: "flex"
          }}
          onClick={() => {
            if (layer === selectedLayer) {
              setSelectedLayer();
            } else {
              setSelectedLayer(layer);
            }
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
    </StyledThing>
  );
}
