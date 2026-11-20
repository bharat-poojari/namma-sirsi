"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import { PLACES } from "@/data/content";
import { useUI } from "@/lib/store";
import { useT } from "@/lib/useT";

function icon(town: boolean, active: boolean) {
  return L.divIcon({
    className: "",
    html: `<div class="map-pin" data-town="${town ? 1 : 0}" style="${active ? "transform:scale(1.4)" : ""}"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function Fit({ pts }: { pts: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (pts.length) map.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 11 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
  return null;
}

export default function MapView() {
  const { t } = useT();
  const select = useUI((s) => s.select);
  const selected = useUI((s) => s.selected);
  const pinned = useMemo(() => PLACES.filter((p) => p.coords), []);
  const pts = pinned.map((p) => p.coords!) as [number, number][];

  return (
    <MapContainer
      center={[14.62, 74.84]}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      aria-label="Map of Sirsi and surrounding destinations"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={17}
      />
      <Fit pts={pts} />
      {pinned.map((p) => (
        <Marker
          key={p.id}
          position={p.coords!}
          icon={icon(p.id === "marikamba", selected === p.id)}
          eventHandlers={{ click: () => select(p.id) }}
          keyboard
          title={t(p.name)}
        >
          <Tooltip direction="top" offset={[0, -8]}>
            {t(p.name)}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
