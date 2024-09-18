"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for marker icons not displaying correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const LiveMonitorMap = ({ devices }) => {
    // Check if devices is an array and has elements
    if (!Array.isArray(devices) || devices.length === 0) {
        return <div>No devices to display on the map.</div>;
    }

    return (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "40vh", width: "100%" }} className="border rounded-lg">
            <TileLayer url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png" />
            {devices.map((device) => (
                <Marker key={device.meterId} position={[device.lat, device.lon]} icon={L.divIcon({
                    className: 'custom-marker',
                    html: `<div class="w-4 h-4 rounded-full ${device.status === "online" ? "bg-green-400 border-2 border-green-800" : "bg-destructive border-2 border-red-800"}"></div>`,
                    iconSize: [20, 20],
                })}>
                    <Popup>
                        <strong>{device.lastChannelWatched}</strong><br />
                        Meter ID: {device.meterId}<br />
                        Household ID: {device.householdId}<br />
                        Status: {device.status}<br />
                        Household Status: {device.householdStatus}<br />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default LiveMonitorMap;