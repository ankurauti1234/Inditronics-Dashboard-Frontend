"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Dummy data for Maharashtra locations
const locations = {
  Device1: [
    { name: "Mumbai", lat: 19.076, lon: 72.8777 },
    { name: "Pune", lat: 18.5204, lon: 73.8567 },
    { name: "Nagpur", lat: 21.1458, lon: 79.0882 },
  ],
  Device2: [
    { name: "Nashik", lat: 19.9975, lon: 73.7898 },
    { name: "Aurangabad", lat: 19.8762, lon: 75.3433 },
    { name: "Solapur", lat: 17.6599, lon: 75.9064 },
  ],
  Device3: [
    { name: "Kolhapur", lat: 16.705, lon: 74.2433 },
    { name: "Amravati", lat: 20.932, lon: 77.7523 },
    { name: "Nanded", lat: 19.1383, lon: 77.321 },
  ],
};

// Custom marker icons
const createCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid #fff;"></div>`,
    iconSize: [15, 15],
    iconAnchor: [7, 7],
  });
};

const icons = {
  Device1: createCustomIcon("hsl(var(--chart-1))"),
  Device2: createCustomIcon("hsl(var(--chart-2))"),
  Device3: createCustomIcon("hsl(var(--chart-3))"),
};

export default function APMLocations() {
  const [selectedAPM, setSelectedAPM] = useState("ALL");
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    setMapKey((prevKey) => prevKey + 1);
  }, [selectedAPM]);

  const getLocations = () => {
    if (selectedAPM === "ALL") {
      return Object.entries(locations).flatMap(([apm, locs]) =>
        locs.map((loc) => ({ ...loc, apm }))
      );
    }
    return (
      locations[selectedAPM]?.map((loc) => ({ ...loc, apm: selectedAPM })) || []
    );
  };

  const currentLocations = getLocations();
  const center =
    currentLocations.length > 0
      ? [currentLocations[0].lat, currentLocations[0].lon]
      : [19.7515, 75.7139]; // Center of Maharashtra

  return (
    <Card className="w-full h-fit bg-transparent bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 border  rounded-lg">
      <CardHeader className="px-4 py-2 border-b">
        <CardTitle className="text-lg">Device Locations</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex justify-between pb-2">
          <Select value={selectedAPM} onValueChange={setSelectedAPM}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select APM" />
            </SelectTrigger>
            <SelectContent className="z-[9999]">
              <SelectItem value="ALL">All Devices</SelectItem>
              <SelectItem value="Device1">Device1</SelectItem>
              <SelectItem value="Device2">Device2</SelectItem>
              <SelectItem value="Device3">Device3</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex justify-center space-x-4 border px-2 rounded-lg">
            {Object.entries(icons).map(([apm, icon]) => (
              <div key={apm} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{
                    backgroundColor: icon.options.html.match(
                      /background-color: (.+?);/
                    )[1],
                  }}
                ></div>
                <span className="text-sm">{apm}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[400px] w-full rounded-lg overflow-hidden">
          <MapContainer
            key={mapKey}
            center={center}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {currentLocations.map((location, index) => (
              <Marker
                key={index}
                position={[location.lat, location.lon]}
                icon={icons[location.apm]}
              >
                <Popup>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{location.name}</h3>
                    <p className="text-sm text-gray-600">{location.apm}</p>
                    <p className="text-xs text-gray-500">
                      Lat: {location.lat.toFixed(4)}, Lon:{" "}
                      {location.lon.toFixed(4)}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
