"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import {
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import { match, P } from "ts-pattern";

import Filters from "./Filters";
import { flattenNumberArrays } from "@/utils/geoJson";
import { getMap } from "@/utils/indexedDB";
import { loadMapSource } from "./utils";
import mapboxgl from "mapbox-gl";
import { useSearchParams } from "next/navigation";

type markersObject = { [id: string]: mapboxgl.Marker };

const updateMarkers = (map: mapboxgl.Map, markers: markersObject, markersOnScreen: markersObject) => {
  const newMarkers: markersObject = {};
  const features = map.querySourceFeatures("billboards");

  // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
  // and add it to the map if it's not there already
  for (const feature of features) {
    match(feature)
      .with({ geometry: { type: "Point" } }, (f) => {
        const coords = f.geometry.coordinates;
        const props = f.properties;

        if (!props || !props.cluster) return;

        const id = props.cluster_id as string;

        let marker = markers[id];
        if (!marker) {
          marker = markers[id] = new mapboxgl.Marker({
            color: "#E73936",
          }).setLngLat([coords[0], coords[1]]);
        }
        newMarkers[id] = marker;

        if (!markersOnScreen[id]) marker.addTo(map);
      });
  }
  // for every marker we've added previously, remove those that are no longer visible
  for (const id in markersOnScreen) {
    if (!newMarkers[id]) markersOnScreen[id].remove();
  }
  return newMarkers;
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY!;

const markerWrapper = document.createElement("div");
markerWrapper.innerHTML = `<div>
<svg
width="35px"
height="35px"
viewBox="0 0 24 24"
xmlns="http://www.w3.org/2000/svg"
fill="none"
>
<path
fill="#E73936"
fill-rule="evenodd"
d="M11.291 21.706 12 21l-.709.706zM12 21l.708.706a1 1 0 0 1-1.417 0l-.006-.007-.017-.017-.062-.063a47.708 47.708 0 0 1-1.04-1.106 49.562 49.562 0 0 1-2.456-2.908c-.892-1.15-1.804-2.45-2.497-3.734C4.535 12.612 4 11.248 4 10c0-4.539 3.592-8 8-8 4.408 0 8 3.461 8 8 0 1.248-.535 2.612-1.213 3.87-.693 1.286-1.604 2.585-2.497 3.735a49.583 49.583 0 0 1-3.496 4.014l-.062.063-.017.017-.006.006L12 21zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
clip-rule="evenodd"
/>
</svg>
</div>`;
const markerElement = markerWrapper.firstChild as HTMLElement;

const MapBox: FC = () => {
  const isMapInitialized = useRef(false);
  const [map, setMap] = useState<mapboxgl.Map>();

  const stateFromParams = useSearchParams().get("state");

  const initializeMap = (node: HTMLDivElement | null) => {

    if (node && !isMapInitialized.current) {
      isMapInitialized.current = true;
      const currentMap = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-98.219147, 19.045243],
        bounds: [
          [-117.111511, 32.512078], // Southwest coordinates
          [-88.371277, 14.623451], // Northeast coordinates
        ],
      });
      currentMap.addControl(new mapboxgl.NavigationControl());
      currentMap.on("load", async () => {
        currentMap.removeLayer("admin-1-boundary");
        await loadMapSource("mexican_states", currentMap);
        await loadMapSource("billboards", currentMap, { cluster: true });


        setMap(currentMap);
      });

      const markers: markersObject = {};
      let markersOnScreen: markersObject = {};

      currentMap.on("render", () => {
        try {

          if (!currentMap.isSourceLoaded("billboards")) return;

          const newMarkers = updateMarkers(currentMap, markers, markersOnScreen);
          markersOnScreen = newMarkers;
        } catch {
          // ignore
        }
      });
    };

  };

  useEffect(() => {
    match([map, stateFromParams])
      .with([P.nullish, P.any], () => { console.info("waiting for map"); })
      .with([P.not(P.nullish), P.string], async ([m, sfp]) => {
        if (m.getLayer("state-borders")) m.removeLayer("state-borders");

        m.addLayer({
          id: "state-borders",
          type: "fill",
          source: "mexican_states",
          layout: {},
          paint: {
            "fill-color": "#4596C4",
            "fill-opacity": 0.25,
          },
          // only if state_name is Puebla
          filter: ["==", "state_name", sfp],
        });

        m.addLayer({
          "id": "bili",
          "type": "circle",
          "source": "billboards",
          "filter": ["!=", "cluster", true],
          "paint": {
            "circle-color": "red",
            "circle-opacity": 0.6,
            "circle-radius": 12
          }
        });

        // based on the state, find boundaries and zoom to it
        let mexicoStates = await getMap("mexican_states");

        if (!mexicoStates) return;

        const selectedState = mexicoStates.features.find((feature) => feature.properties.state_name === sfp);

        match(selectedState?.geometry)
          .with({ type: P.union("Polygon", "MultiPolygon"), coordinates: P.select() }, (coordinates) => {
            const bounds = new mapboxgl.LngLatBounds();

            flattenNumberArrays(coordinates).forEach((coordinate) => {
              bounds.extend(coordinate);
            });

            m.fitBounds(bounds, { padding: 20 });
          });

      })
      .with([P.not(P.nullish), P.nullish], ([m]) => {
        if (m.getLayer("state-borders")) m.removeLayer("state-borders");
      })
      .exhaustive();

  }, [stateFromParams, map]);

  return (
    <div className="flex">
      <Filters
        initialState={stateFromParams || ""}
        initialMunicipality=""
        initialInterest=""
      />
      <div
        id="map"
        ref={initializeMap}
        className="w-screen h-screen"
      />
    </div>
  );
};

export default MapBox;