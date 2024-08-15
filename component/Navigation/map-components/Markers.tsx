import React, { useEffect, useState } from "react";
import {
  StartMarkerIcon,
  EndMarkerIcon,
  StepIcon,
} from "@/utils/exports/app-icons";
import Image from "next/image";
import LocationPin from "@/assets/location-pin.gif"
import { Marker, Popup, useMap } from "react-map-gl";
import { useAppContext } from "@/lib/context/AppContext";;

const Markers = () => {
  const { current: mymap } = useMap();
  const { startMarker, endMarker, currentLocation, setCurrentLocation, setEndMarker, setStartMarker, setSelectedStep, selectedStep, routeInfo } =
    useAppContext();


  useEffect(() => {
    if(startMarker){
      setCurrentLocation(null)
      if(!mymap) return
      mymap.flyTo({
        center: [startMarker.longitude, startMarker.latitude],
        zoom: 14,
      });
    }
  },[mymap, setCurrentLocation, startMarker])
  return (
    <div>
       {endMarker && (
        <Marker
          draggable={true}
          onDragEnd={(e) => {
            setEndMarker({
              longitude: e.lngLat.lng,
              latitude: e.lngLat.lat,
            });
          }}
          longitude={endMarker.longitude}
          latitude={endMarker.latitude}
          anchor="bottom"
          onClick={() => {
            if (!mymap) return;
            mymap.flyTo({
              center: [endMarker.longitude, endMarker.latitude],
              zoom: 14,
            });
          }}
        >
          <EndMarkerIcon className="cursor-pointer" />
        </Marker>
      )}
      {currentLocation && (
        <Marker
          longitude={currentLocation.longitude}
          latitude={currentLocation.latitude}
          anchor="bottom"
          onClick={() => setSelectedStep({
            location: [currentLocation.longitude, currentLocation.latitude],
            instruction: "Your current location"
          })} // Set the selected step on click
        >

          <Image src={LocationPin} alt="current location" />
        </Marker>
      )}
      {startMarker && (
        <Marker
          longitude={startMarker.longitude}
          latitude={startMarker.latitude}
          anchor="bottom"
          draggable={true}
          rotationAlignment="auto"
          onDragEnd={(e) => {
            setStartMarker({
              longitude: e.lngLat.lng,
              latitude: e.lngLat.lat,
            });
          }}
          onClick={() => {
            if (!mymap) return;
            mymap.flyTo({
              center: [startMarker.longitude, startMarker.latitude],
              zoom: 14,
            });
          }}
        >
          <StartMarkerIcon className="cursor-pointer" />
        </Marker>
      )}
      {routeInfo &&
        routeInfo[0]?.legs[0]?.steps.map((step, index) => {
          return (
            <Marker
              key={index}
              longitude={step.maneuver.location[0]}
              latitude={step.maneuver.location[1]}
              anchor="bottom"
              onClick={() => setSelectedStep(step.maneuver)} // Set the selected step on click
            >
              <StepIcon className="text-white shawdow-icon h-2 w-2 cursor-pointer" />
            </Marker>
          );
        })}

      {selectedStep && (
        <Popup
          longitude={selectedStep.location[0]}
          latitude={selectedStep.location[1]}
          anchor="bottom"
          closeOnClick={false}
          onClose={() => setSelectedStep(null)} // Close the popup when clicked outside
        >
          <div>
            <h3>Step Information</h3>
            <p>{selectedStep.instruction}</p>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Markers;
