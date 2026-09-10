"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  RESTAURANT_DIRECTIONS_URL,
  RESTAURANT_LATITUDE,
  RESTAURANT_LONGITUDE,
} from "@/lib/restaurant";

interface LocationMapProps {
  /** Layout classes for the map wrapper (heights/width). */
  className?: string;
}

const EXPAND_ICON = (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

const COLLAPSE_ICON = (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 9V3h-6M3 15v6h6M3 15l7-7M14 17l7 7" />
  </svg>
);

/**
 * Interactive OpenStreetMap (Leaflet) centred on Art of Dum with a
 * branded marker, popup and a fullscreen toggle. Uses the standard
 * OpenStreetMap tiles — the accurate, detailed road network this area
 * is known for (labels render in the local script; accepted by
 * design). Leaflet is imported inside the effect — it touches
 * `window` at load time, so it must never evaluate during prerender.
 * Gestures (wheel zoom, drag pan, pinch) are scoped to the map
 * container by Leaflet itself; the fullscreen toggle uses the native
 * Fullscreen API on the wrapper only. No global wheel/touch/zoom
 * handlers exist here, so the surrounding page always scrolls
 * normally.
 */
export default function LocationMap({ className = "" }: LocationMapProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | undefined>(undefined);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* Mount the map (browser only). */
  useEffect(() => {
    if (!wrapRef.current) return;

    let cancelled = false;

    void import("leaflet").then((L) => {
      const canvas = wrapRef.current?.querySelector<HTMLElement>(
        ".aod-map-canvas"
      );
      if (cancelled || !canvas) return;

      const center: L.LatLngExpression = [
        RESTAURANT_LATITUDE,
        RESTAURANT_LONGITUDE,
      ];

      const map = L.map(canvas, {
        center,
        zoom: 16,
        scrollWheelZoom: true,
        attributionControl: true,
        zoomControl: true,
      });
      mapRef.current = map;

      /* Standard OpenStreetMap tiles — detailed, accurate road
         network; keyless and reliable. Requires this attribution. */
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      }).addTo(map);

      /* Branded marker: charcoal dot with muted-gold ring + a cream
         label chip — small, elegant, clearly Art of Dum. */
      const markerIcon = L.divIcon({
        className: "aod-map-marker",
        html: `<span class="aod-map-marker__inner">
                <span class="aod-map-marker__dot"></span>
                <span class="aod-map-marker__label">Art of Dum</span>
              </span>`,
        iconSize: [120, 22],
        iconAnchor: [9, 11],
        popupAnchor: [0, -14],
      });

      const popup = L.popup({
        className: "aod-map-popup",
        closeButton: true,
      }).setContent(
        `<span class="aod-map-popup__title">Art of Dum</span>
         <span class="aod-map-popup__line">Reem Mall — 1st Floor</span>
         <span class="aod-map-popup__line">Al Reem Island, Abu Dhabi</span>
         <a class="aod-map-popup__directions" href="${RESTAURANT_DIRECTIONS_URL}" target="_blank" rel="noopener noreferrer">Get Directions ↗</a>`
      );

      L.marker(center, {
        icon: markerIcon,
        title: "Art of Dum — Reem Mall, 1st Floor",
        alt: "Art of Dum restaurant, Reem Mall 1st Floor, Al Reem Island, Abu Dhabi",
        keyboard: true,
      })
        .addTo(map)
        .bindPopup(popup);
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = undefined;
    };
  }, []);

  /* Fullscreen support + state sync. The passive fullscreenchange
     listener only mirrors document state; it never touches page
     scroll or zoom behaviour. */
  useEffect(() => {
    const syncState = () => {
      setCanFullscreen(Boolean(document.fullscreenEnabled));
      setIsFullscreen(document.fullscreenElement === wrapRef.current);
      mapRef.current?.invalidateSize();
    };

    syncState();
    document.addEventListener("fullscreenchange", syncState);
    return () => {
      document.removeEventListener("fullscreenchange", syncState);
    };
  }, []);

  const toggleFullscreen = () => {
    const wrapper = wrapRef.current;
    if (!wrapper) return;
    if (document.fullscreenElement === wrapper) {
      void document.exitFullscreen();
    } else {
      void wrapper.requestFullscreen?.();
    }
  };

  return (
    <div ref={wrapRef} className={`aod-map-wrapper relative ${className}`}>
      <div
        aria-label="Art of Dum restaurant location — interactive map"
        role="region"
        className="aod-map aod-map-canvas absolute inset-0"
      />
      {canFullscreen && (
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={
            isFullscreen
              ? "Exit map fullscreen"
              : "Show map in fullscreen"
          }
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          className="aod-map-fullscreen"
        >
          {isFullscreen ? COLLAPSE_ICON : EXPAND_ICON}
        </button>
      )}
    </div>
  );
}
