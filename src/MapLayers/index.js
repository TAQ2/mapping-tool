import React from "react";
import VisitedPlaces from "./VisitedPlaces";

export default function CustomLayer({ selectedLayer }) {
  switch (selectedLayer) {
    case "Places Arjun has visited in the UK":
      return <VisitedPlaces />;
    default:
      return null;
  }
}
