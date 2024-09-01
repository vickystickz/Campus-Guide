import React, { useEffect, useState } from "react";
import {
  StartMarkerIcon,
  EndMarkerIcon,
  StepIcon,
  FlatStartMarkerIcon,
  MyLocationIcon,
  SchoolIcon,
} from "@/utils/exports/app-icons";
import { CAMPUS_DATA } from "@/utils/campus-data";
import { Marker, Popup, useMap } from "react-map-gl";
import { useAppContext } from "@/lib/context/AppContext";
import { TABS_ID } from "@/constant/enum";

const Markers = () => {
  const { current: mymap } = useMap();
  const {
    startMarker,
    endMarker,
    currentLocation,
    setCurrentLocation,
    setEndMarker,
    setStartMarker,
    setSelectedStep,
    selectedStep,
    routeInfo,
    selectedCampus,
    setMaxBounds,
    setActiveTab,
    handleActiveTab,
  } = useAppContext();

  const calculateMaxBounds = (
    coordinates: number[][],
    bufferPercentage = 0.1
  ) => {
    let minLng = Infinity;
    let minLat = Infinity;
    let maxLng = -Infinity;
    let maxLat = -Infinity;

    coordinates.forEach(([lng, lat]) => {
      minLng = Math.min(minLng, lng);
      minLat = Math.min(minLat, lat);
      maxLng = Math.max(maxLng, lng);
      maxLat = Math.max(maxLat, lat);
    });

    // Calculate the range of latitude and longitude
    const lngRange = maxLng - minLng;
    const latRange = maxLat - minLat;

    // Apply the buffer
    const lngBuffer = lngRange * bufferPercentage;
    const latBuffer = latRange * bufferPercentage;

    return [
      [minLng - lngBuffer, minLat - latBuffer], // Southwest corner with buffer
      [maxLng + lngBuffer, maxLat + latBuffer], // Northeast corner with buffer
    ];
  };

  useEffect(() => {
    if (startMarker) {
      setCurrentLocation(null);
      if (!mymap) return;
      mymap.flyTo({
        center: [startMarker.longitude, startMarker.latitude],
        zoom: 14,
      });
      handleActiveTab(TABS_ID.DIRECTION);
    }
    if (selectedCampus) {
      if (!mymap) return;
      mymap.flyTo({
        center: [selectedCampus.longitude, selectedCampus.latitude],
        zoom: 12,
      });
      const Bounds: any = calculateMaxBounds(
        selectedCampus.layer.features[0].geometry.coordinates[0],
        0.09
      );
      setMaxBounds(Bounds);
      setActiveTab(TABS_ID.DIRECTION);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mymap,
    setCurrentLocation,
    startMarker,
    selectedCampus,
    setMaxBounds,
    setActiveTab,
  ]);
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
          onClick={() =>
            setSelectedStep({
              location: [currentLocation.longitude, currentLocation.latitude],
              instruction: "Your current location",
            })
          } // Set the selected step on click
        >
          <MyLocationIcon />
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
          {routeInfo && routeInfo[0] ? (
            <FlatStartMarkerIcon className="cursor-pointer" />
          ) : (
            <StartMarkerIcon className="cursor-pointer" />
          )}
        </Marker>
      )}
      {/* {routeInfo &&
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
        })} */}

      {CAMPUS_DATA.map((campus) => {
        return (
          <Marker
            key={campus.id}
            longitude={campus.longitude}
            latitude={campus.latitude}
            anchor="bottom"
            onClick={() => {}} // Set the selected step on click
          >
            <SchoolIcon className="cursor-pointer" />
          </Marker>
        );
      })}

      {selectedStep && (
        <Popup
          longitude={selectedStep.location[0]}
          latitude={selectedStep.location[1]}
          anchor="bottom-left"
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
